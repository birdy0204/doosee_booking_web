"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Globe,
  MessageCircle,
  LogOut,
} from "lucide-react";

const navItems = [
  { title: "儀表盤", href: "/dashboard", icon: LayoutDashboard },
  { title: "表單資料", href: "/forms", icon: ClipboardList },
  { title: "員工", href: "/staff", icon: Users },
  { title: "前端網站", href: "/", icon: Globe, external: true },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[220px] shrink-0 p-4 pr-0">
      <div className="flex w-full flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm">
        {/* Logo */}
        <div className="px-1 pt-1">
          <Link href="/dashboard" className="relative block h-24 w-full">
            <Image
              src="/doosee-logo.png"
              alt="Doosee"
              fill
              className="rounded-xl object-contain"
            />
          </Link>
        </div>

        {/* 導航選單 */}
        <nav>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    {...("external" in item && item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 中間留白 + 插圖 */}
        <div className="flex flex-1 items-end justify-center">
          <svg
            viewBox="0 0 160 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-32"
          >
            <rect x="45" y="50" width="70" height="45" rx="4" fill="#FCD34D" />
            <rect x="50" y="55" width="60" height="32" rx="2" fill="#FEF3C7" />
            <rect x="35" y="95" width="90" height="5" rx="2" fill="#E5E7EB" />
            <circle cx="80" cy="25" r="10" fill="#1E293B" />
            <path d="M65 45 Q80 60 95 45 L90 80 H70 Z" fill="#607CFF" />
            <rect x="68" y="80" width="6" height="20" rx="2" fill="#1E293B" />
            <rect x="86" y="80" width="6" height="20" rx="2" fill="#1E293B" />
          </svg>
        </div>

        {/* 在線支持 */}
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-600">
          <MessageCircle size={16} />
          在線支持
        </button>

        {/* 退出登錄 */}
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:text-gray-600">
          <LogOut size={18} />
          退出登錄
        </button>
      </div>
    </aside>
  );
}
