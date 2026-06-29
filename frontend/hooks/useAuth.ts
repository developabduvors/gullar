"use client";

import { useState, useEffect, useCallback } from "react";
import { getToken, removeToken, authApi } from "@/lib/api";
import type { User, AuthState } from "@/types";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

export function useAuth() {
  const [state, setState] = useState<AuthState>(initialState);

  const checkAuth = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setState({ ...initialState, isLoading: false });
      return;
    }

    try {
      const response = await authApi.getProfile();
      const user = response.data as User;
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      removeToken();
      setState({ ...initialState, isLoading: false });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const logout = useCallback(() => {
    removeToken();
    setState({ ...initialState, isLoading: false });
  }, []);

  return {
    ...state,
    checkAuth,
    logout,
  };
}
