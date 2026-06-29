import { API } from "./constants";
import type { ApiResponse } from "@/types";

/* ── Custom error class ── */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/* ── Token management ── */
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }
}

function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }
}

export { getToken, setToken, removeToken };

/* ── Base fetch wrapper ── */
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API.TIMEOUT);

  try {
    const response = await fetch(`${API.BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(
        response.status,
        errorData?.message || `Request failed with status ${response.status}`,
        errorData
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) throw error;

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError(408, "Request timeout");
    }

    throw new ApiError(0, "Network error. Please check your connection.");
  }
}

/* ── HTTP method helpers ── */
export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),

  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),

  upload: <T>(endpoint: string, formData: FormData) => {
    const token = getToken();
    const headers: HeadersInit = {};
    if (token) {
      (headers as Record<string, string>)["Authorization"] =
        `Bearer ${token}`;
    }
    return request<T>(endpoint, {
      method: "POST",
      body: formData,
      headers,
    });
  },
};

/* ── Auth API helpers ── */
export const authApi = {
  sendOTP: (phone: string) =>
    api.post<ApiResponse<{ expiresIn: number }>>(API.ENDPOINTS.AUTH.SEND_OTP, {
      phone,
    }),

  verifyOTP: (phone: string, code: string) =>
    api.post<ApiResponse<{ token: string; user: unknown }>>(
      API.ENDPOINTS.AUTH.VERIFY_OTP,
      { phone, code }
    ),

  getProfile: () =>
    api.get<ApiResponse<unknown>>(API.ENDPOINTS.AUTH.ME),
};
