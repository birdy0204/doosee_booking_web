"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminDrawerProps {
  /** 是否顯示 */
  open: boolean;
  /** 關閉時的回呼 */
  onClose: () => void;
  /** 標題 */
  title?: string;
  /** 內容 */
  children: React.ReactNode;
  /** 底部操作列 */
  footer?: React.ReactNode;
  className?: string;
}

function AdminDrawer({
  open,
  onClose,
  title,
  children,
  footer,
  className,
}: AdminDrawerProps) {
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
    <>
      {/* 遮罩 - 獨立層 */}
      <div
        className="fixed inset-0 z-50 bg-black/40"
        onClick={onClose}
      />

      {/* 抽屜本體 - 獨立層，z-index 比遮罩高 */}
      <div className="fixed inset-y-4 right-4 z-[51] w-full max-w-sm">
        <div
          className={cn(
            "flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_0_40px_rgba(0,0,0,0.15)]",
            className
          )}
        >
          {/* 標題列 */}
          {title && (
            <div className="flex shrink-0 items-center justify-between px-6 pt-6 pb-4">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* 可滾動內容 */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>

          {/* 底部操作列 */}
          {footer && (
            <div className="shrink-0 border-t border-gray-100 px-6 py-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}

export { AdminDrawer };
export type { AdminDrawerProps };
