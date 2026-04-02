"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AdminRadioOption {
  label: string;
  value: string;
}

interface AdminRadioProps {
  /** 選項列表 */
  options: AdminRadioOption[];
  /** 目前選中的值 */
  value?: string;
  /** 變更時的回呼 */
  onChange?: (value: string) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 排列方向 */
  direction?: "horizontal" | "vertical";
  className?: string;
}

function AdminRadio({
  options,
  value,
  onChange,
  disabled = false,
  direction = "vertical",
  className,
}: AdminRadioProps) {
  return (
    <div
      className={cn(
        "flex gap-3",
        direction === "vertical" ? "flex-col" : "flex-row items-center",
        disabled && "opacity-50",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <label
            key={option.value}
            className={cn(
              "inline-flex cursor-pointer items-center gap-2.5",
              disabled && "cursor-not-allowed"
            )}
          >
            <button
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onChange?.(option.value)}
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                isSelected ? "border-blue-500" : "border-gray-300"
              )}
            >
              {isSelected && (
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              )}
            </button>
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

export { AdminRadio };
export type { AdminRadioProps, AdminRadioOption };
