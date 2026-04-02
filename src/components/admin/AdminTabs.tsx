"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AdminTabsProps {
  /** Tab 選項列表 */
  items: string[];
  /** 目前選中的索引 */
  value?: number;
  /** 切換時的回呼 */
  onChange?: (index: number) => void;
  className?: string;
}

function AdminTabs({ items, value = 0, onChange, className }: AdminTabsProps) {
  return (
    <div className={cn("inline-flex rounded-full bg-gray-100 p-1", className)}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => onChange?.(index)}
          className={cn(
            "rounded-full px-6 py-1.5 text-sm font-medium transition-colors",
            index === value
              ? "bg-blue-500 text-white"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export { AdminTabs };
export type { AdminTabsProps };
