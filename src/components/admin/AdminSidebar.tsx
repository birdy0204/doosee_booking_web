"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  FileText,
  Globe,
  Settings,
  CircleHelp,
  Search,
  MoreVertical,
  UserCircle,
  CreditCard,
  Bell,
  LogOut,
} from "lucide-react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { title: "儀表盤", href: "/dashboard", icon: LayoutDashboard },
  { title: "表單資料", href: "/forms", icon: ClipboardList },
  { title: "員工", href: "/staff", icon: Users },
  { title: "內容管理", href: "/content", icon: FileText },
  { title: "前端網站", href: "/", icon: Globe, external: true },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const displayName = user?.userName ?? "使用者";
  const displayEmail = user?.email ?? "";
  const displayInitial = displayName.charAt(0);

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

        {/* 中間留白 */}
        <div className="flex-1" />

        {/* 底部功能選單 */}
        <div className="space-y-1 border-t border-gray-100 pt-3">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900">
            <Settings size={18} />
            設定
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900">
            <CircleHelp size={18} />
            取得協助
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900">
            <Search size={18} />
            搜尋
          </button>
        </div>

        {/* 用戶資訊 + Dropdown */}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2">
            <Avatar name={displayInitial} size="sm" classNames={{ base: "bg-blue-50 shrink-0", name: "text-blue-500 font-semibold" }} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
              <p className="text-xs text-gray-400 truncate">{displayEmail}</p>
            </div>

            <Dropdown placement="right-end">
              <DropdownTrigger>
                <button className="shrink-0 text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="用戶選單"
                classNames={{
                  base: "min-w-[200px]",
                }}
              >
                <DropdownSection showDivider>
                  <DropdownItem key="profile" isReadOnly className="opacity-100">
                    <div className="flex items-center gap-3">
                      <Avatar name={displayInitial} size="sm" classNames={{ base: "bg-blue-50 shrink-0", name: "text-blue-500 font-semibold" }} />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                        <p className="text-xs text-gray-400">{displayEmail}</p>
                      </div>
                    </div>
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
                  <DropdownItem key="account" startContent={<UserCircle size={16} className="text-gray-500" />}>
                    帳戶設定
                  </DropdownItem>
                  <DropdownItem key="billing" startContent={<CreditCard size={16} className="text-gray-500" />}>
                    帳單管理
                  </DropdownItem>
                  <DropdownItem key="notifications" startContent={<Bell size={16} className="text-gray-500" />}>
                    通知設定
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection>
                  <DropdownItem key="logout" startContent={<LogOut size={16} className="text-gray-500" />} className="text-danger" color="danger" onPress={logout}>
                    登出
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </aside>
  );
}
