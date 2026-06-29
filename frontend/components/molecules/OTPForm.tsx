"use client";

import { useState, useRef, type FormEvent } from "react";
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { UI } from "@/lib/constants";
import { cn, formatPhone } from "@/lib/utils";

interface OTPFormProps {
  onSendOTP: (phone: string) => Promise<void>;
  onVerifyOTP: (phone: string, code: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export function OTPForm({
  onSendOTP,
  onVerifyOTP,
  isLoading = false,
  error,
}: OTPFormProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState<string[]>(
    Array(UI.OTP_LENGTH).fill("")
  );
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePhoneSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 10) {
      setLocalError("Введите корректный номер телефона");
      return;
    }

    try {
      await onSendOTP(cleaned);
      setStep("otp");
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch {
      setLocalError("Ошибка отправки кода. Попробуйте снова.");
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < UI.OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const fullCode = newCode.join("");
    if (fullCode.length === UI.OTP_LENGTH) {
      handleVerify(phone, fullCode);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (p: string, c: string) => {
    try {
      await onVerifyOTP(p, c);
    } catch {
      setLocalError("Неверный код. Попробуйте снова.");
      setCode(Array(UI.OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  const displayError = error || localError;

  return (
    <div className="w-full max-w-sm mx-auto">
      {step === "phone" ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-5">
          <div className="text-center space-y-2">
            <h1 className="heading-serif text-2xl text-foreground">Вход</h1>
            <p className="text-sm text-muted">
              Введите номер телефона для входа
            </p>
          </div>

          <Input
            type="tel"
            label="Номер телефона"
            placeholder="+998 (__) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={displayError || undefined}
            icon={<Phone size={16} />}
          />

          <Button type="submit" fullWidth isLoading={isLoading} size="lg">
            Получить код
          </Button>
        </form>
      ) : (
        <div className="space-y-5">
          <div className="text-center space-y-2">
            <h1 className="heading-serif text-2xl text-foreground">
              Подтверждение
            </h1>
            <p className="text-sm text-muted">
              Код отправлен на {formatPhone(phone)}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={cn(
                  "w-12 h-14 text-center text-xl font-bold rounded-xl border",
                  "bg-card text-foreground",
                  "transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold",
                  digit ? "border-gold" : "border-border"
                )}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          {displayError && (
            <p className="text-center text-sm text-rose animate-fade-in">
              {displayError}
            </p>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setStep("phone");
                setCode(Array(UI.OTP_LENGTH).fill(""));
                setLocalError(null);
              }}
              className="text-sm text-muted hover:text-gold transition-colors cursor-pointer"
            >
              Изменить номер
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
