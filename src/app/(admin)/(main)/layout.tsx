"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen" style={{ backgroundColor: "#F4F9FD" }}>
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
