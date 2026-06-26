"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  error?: string;
}

const sizes = {
  sm: "py-1.5 px-3 text-xs",
  md: "py-2.5 px-4 text-sm",
  lg: "py-3 px-5 text-base",
};

export function Select({
  options,
  value,
  onChange,
  placeholder = "Tanlang...",
  label,
  className,
  size = "md",
  fullWidth = false,
  error,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = useCallback(
    (optionValue: string) => {
      onChange?.(optionValue);
      setIsOpen(false);
    },
    [onChange]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={cn("relative", fullWidth && "w-full", className)}
    >
      {label && (
        <label className="block text-xs text-muted mb-1.5 font-medium">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between gap-2",
          "rounded-xl border transition-all duration-200",
          "bg-card text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold",
          error
            ? "border-rose ring-1 ring-rose/30"
            : "border-border hover:border-gold/40",
          sizes[size],
          !selectedOption && "text-muted/50"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={cn("truncate", selectedOption && "text-foreground")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "text-muted shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full min-w-[180px] animate-slide-down">
          <div className="glass-dark rounded-xl border border-white/10 overflow-hidden shadow-xl">
            <ul
              className="py-1 max-h-60 overflow-y-auto"
              role="listbox"
              tabIndex={-1}
            >
              {options.length === 0 ? (
                <li className="px-4 py-3 text-sm text-muted/50 text-center">
                  Нет опций
                </li>
              ) : (
                options.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        "px-4 py-2.5 text-sm cursor-pointer transition-all duration-150",
                        "flex items-center justify-between",
                        isSelected
                          ? "text-gold bg-gold/10"
                          : "text-foreground/80 hover:text-gold hover:bg-gold/5"
                      )}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-rose animate-slide-down" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
