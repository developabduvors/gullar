"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  initialMinutes?: number;
  className?: string;
  onExpire?: () => void;
}

export function CountdownTimer({
  initialMinutes = 15,
  className,
  onExpire,
}: CountdownTimerProps) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isUrgent, setIsUrgent] = useState(false);

  const tick = useCallback(() => {
    setSeconds((prev) => {
      if (prev === 0) {
        setMinutes((m) => {
          if (m === 0) {
            onExpire?.();
            return 0;
          }
          return m - 1;
        });
        return 59;
      }
      return prev - 1;
    });
  }, [onExpire]);

  useEffect(() => {
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [tick]);

  useEffect(() => {
    setIsUrgent(minutes < 3);
  }, [minutes]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className={cn("flex items-center gap-1.5 font-mono font-bold", className)}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl px-3.5 py-2",
          "backdrop-blur-md border transition-all duration-500",
          isUrgent
            ? "bg-rose/15 border-rose/30 text-rose animate-gold-pulse"
            : "bg-gold/10 border-gold/20 text-gold"
        )}
      >
        <Clock size={16} />
        <span className={cn("tabular-nums text-lg", isUrgent && "text-rose")}>
          {formatNumber(minutes)}:{formatNumber(seconds)}
        </span>
      </div>
    </div>
  );
}
