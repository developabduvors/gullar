"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn, formatPrice } from "@/lib/utils";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label?: string;
  className?: string;
  formatLabel?: boolean;
}

export function PriceRangeSlider({
  min,
  max,
  step = 10000,
  value,
  onChange,
  label,
  className,
  formatLabel = true,
}: PriceRangeSliderProps) {
  const [localValue, setLocalValue] = useState(value);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const minPercent = ((localValue[0] - min) / (max - min)) * 100;
  const maxPercent = ((localValue[1] - min) / (max - min)) * 100;

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Math.min(Number(e.target.value), localValue[1] - step);
      const newValue: [number, number] = [newMin, localValue[1]];
      setLocalValue(newValue);
      onChange(newValue);
    },
    [localValue, step, onChange]
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Math.max(Number(e.target.value), localValue[0] + step);
      const newValue: [number, number] = [localValue[0], newMax];
      setLocalValue(newValue);
      onChange(newValue);
    },
    [localValue, step, onChange]
  );

  const displayValue = (val: number) =>
    formatLabel ? formatPrice(val) : `${val}`;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-xs text-muted mb-3 font-medium">
          {label}
        </label>
      )}

      {/* Price display */}
      <div className="flex items-center justify-between mb-3">
        <div className="glass rounded-lg px-3 py-1.5 text-xs text-foreground font-medium">
          {displayValue(localValue[0])}
        </div>
        <span className="text-muted/40 text-xs">—</span>
        <div className="glass rounded-lg px-3 py-1.5 text-xs text-foreground font-medium">
          {displayValue(localValue[1])}
        </div>
      </div>

      {/* Slider track with glassmorphism */}
      <div className="relative h-8 flex items-center" ref={trackRef}>
        {/* Background track - glass */}
        <div className="absolute left-0 right-0 h-1.5 rounded-full bg-white/5 border border-white/5" />

        {/* Active track - gold gradient */}
        <div
          className="absolute h-1.5 rounded-full bg-gradient-to-r from-gold/40 to-gold shadow-gold"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={handleMinChange}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          style={{ pointerEvents: "auto" }}
          aria-label="Minimal narx"
        />
        {/* Visual min thumb - glass gold */}
        <div
          className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-gold to-gold-dark border-2 border-dark shadow-lg shadow-gold/40 transition-all duration-200 hover:scale-125 hover:shadow-gold-lg cursor-grab active:cursor-grabbing"
          style={{
            left: `calc(${minPercent}% - 12px)`,
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={handleMaxChange}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          aria-label="Maksimal narx"
        />
        {/* Visual max thumb - glass gold */}
        <div
          className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-gold to-gold-dark border-2 border-dark shadow-lg shadow-gold/40 transition-all duration-200 hover:scale-125 hover:shadow-gold-lg cursor-grab active:cursor-grabbing"
          style={{
            left: `calc(${maxPercent}% - 12px)`,
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-muted/40">{displayValue(min)}</span>
        <span className="text-[10px] text-muted/40">{displayValue(max)}</span>
      </div>
    </div>
  );
}
