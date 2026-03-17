"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AdminHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 px-6">
      {/* 搜尋欄 */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          placeholder="搜索"
          className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-blue-500"
        />
      </div>

      {/* 右側操作區 */}
      <div className="ml-auto flex items-center gap-4">
        {/* 通知 */}
        <button className="relative text-gray-400 hover:text-gray-600 transition-colors">
          <Bell size={20} />
        </button>

        {/* 使用者資訊 */}
        <div className="flex items-center gap-2.5">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-blue-50 text-blue-500 font-semibold text-sm">
              森
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700">森森</span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}
