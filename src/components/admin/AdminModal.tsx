"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminModalProps {
  /** 是否顯示 */
  open: boolean;
  /** 關閉時的回呼 */
  onClose: () => void;
  /** Modal 標題 */
  title?: string;
  /** 內容 */
  children: React.ReactNode;
  /** 自訂 className */
  className?: string;
}

function AdminModal({
  open,
  onClose,
  title,
  children,
  className,
}: AdminModalProps) {
  // ESC 鍵關閉
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // 鎖定背景滾動
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal 本體 */}
      <div
        className={cn(
          "relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl",
          className
        )}
      >
        {/* 標題列 */}
        {title && (
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* 無標題時的關閉按鈕 */}
        {!title && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}

        {children}
      </div>
    </div>,
    document.body
  );
}

export { AdminModal };
export type { AdminModalProps };
