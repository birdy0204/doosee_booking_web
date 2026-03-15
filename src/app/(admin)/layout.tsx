"use client";

import Link from "next/link";
import { LayoutDashboard, Users } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* 側邊欄 */}
      <aside className="w-64 bg-card border-r border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-8">Doosee CMS</h2>
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            儀表板
          </Link>
          <Link
            href="/customers"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <Users className="w-5 h-5" />
            顧客管理
          </Link>
        </nav>
      </aside>

      {/* 主內容 */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
