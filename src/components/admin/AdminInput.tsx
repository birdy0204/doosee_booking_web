"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AdminInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 輸入框上方的標籤文字 */
  label?: string;
  /** 錯誤訊息，有值時顯示錯誤狀態 */
  error?: string;
}

const AdminInput = React.forwardRef<HTMLInputElement, AdminInputProps>(
  ({ className, label, error, disabled, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium",
              error ? "text-red-500" : "text-gray-500",
              disabled && "text-gray-300"
            )}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          className={cn(
            "h-12 w-full rounded-xl border bg-white px-4 text-base text-gray-900",
            "placeholder:text-gray-400",
            "outline-none transition-colors",
            // 預設狀態
            "border-gray-200",
            // 聚焦狀態
            "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            // 禁用狀態
            "disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:placeholder:text-gray-300",
            // 錯誤狀態
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-sm text-red-500">{error}</span>
        )}
      </div>
    );
  }
);

AdminInput.displayName = "AdminInput";

export { AdminInput };
export type { AdminInputProps };
