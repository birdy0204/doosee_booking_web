"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AdminSwitchProps {
  /** 是否開啟 */
  checked?: boolean;
  /** 變更時的回呼 */
  onChange?: (checked: boolean) => void;
  /** 標籤文字 */
  label?: string;
  /** 是否禁用 */
  disabled?: boolean;
  className?: string;
}

function AdminSwitch({
  checked = false,
  onChange,
  label,
  disabled = false,
  className,
}: AdminSwitchProps) {
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
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-blue-500" : "bg-gray-300"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
            "absolute top-0.5",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </button>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}

export { AdminSwitch };
export type { AdminSwitchProps };
