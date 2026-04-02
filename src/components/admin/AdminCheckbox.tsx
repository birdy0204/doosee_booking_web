"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminCheckboxProps {
  /** 是否勾選 */
  checked?: boolean;
  /** 變更時的回呼 */
  onChange?: (checked: boolean) => void;
  /** 標籤文字 */
  label?: string;
  /** 是否禁用 */
  disabled?: boolean;
  className?: string;
}

function AdminCheckbox({
  checked = false,
  onChange,
  label,
  disabled = false,
  className,
}: AdminCheckboxProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
          checked
            ? "border-blue-500 bg-blue-500 text-white"
            : "border-gray-300 bg-white"
        )}
      >
        {checked && <Check size={14} strokeWidth={3} />}
      </button>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}

export { AdminCheckbox };
export type { AdminCheckboxProps };
