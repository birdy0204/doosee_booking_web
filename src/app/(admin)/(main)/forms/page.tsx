"use client";

import { useState } from "react";
import { Search, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { AdminTabs } from "@/components/admin/AdminTabs";

// 模擬表單資料
const formData = [
  { id: 1, name: "林小美", phone: "0912-345-678", email: "mei@example.com", service: "美甲護理", source: "官網表單", status: "未處理", createdAt: "2026-03-15 14:30" },
  { id: 2, name: "陳怡君", phone: "0923-456-789", email: "yijun@example.com", service: "臉部護理", source: "官網表單", status: "已聯繫", createdAt: "2026-03-15 10:15" },
  { id: 3, name: "王雅婷", phone: "0934-567-890", email: "yating@example.com", service: "美髮造型", source: "LINE", status: "已預約", createdAt: "2026-03-14 16:45" },
  { id: 4, name: "張家瑜", phone: "0945-678-901", email: "jiayu@example.com", service: "身體舒壓", source: "官網表單", status: "未處理", createdAt: "2026-03-14 09:20" },
  { id: 5, name: "李佳蓉", phone: "0956-789-012", email: "jiarong@example.com", service: "美睫嫁接", source: "Instagram", status: "已聯繫", createdAt: "2026-03-13 11:00" },
  { id: 6, name: "黃心怡", phone: "0967-890-123", email: "xinyi@example.com", service: "美甲護理", source: "官網表單", status: "已預約", createdAt: "2026-03-13 08:30" },
];

const statusColor: Record<string, string> = {
  未處理: "bg-amber-50 text-amber-600",
  已聯繫: "bg-blue-50 text-blue-500",
  已預約: "bg-green-50 text-green-600",
};

export default function FormsPage() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = formData.filter(
    (item) =>
      (tab === 0 ||
        (tab === 1 && item.status === "未處理") ||
        (tab === 2 && item.status === "已聯繫") ||
        (tab === 3 && item.status === "已預約")) &&
      (search === "" ||
        item.name.includes(search) ||
        item.phone.includes(search) ||
        item.email.includes(search))
  );

  return (
    <div className="space-y-6">
      {/* 標題列 */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">表單資料 ({formData.length})</h1>
        <div className="flex-1 flex justify-center">
          <AdminTabs
            items={["全部", "未處理", "已聯繫", "已預約"]}
            value={tab}
            onChange={setTab}
          />
        </div>
      </div>

      {/* 搜尋欄 */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜尋姓名、電話、Email"
          className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-blue-500"
        />
      </div>

      {/* 表格 */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400">
              <th className="px-6 py-4 font-medium">姓名</th>
              <th className="px-6 py-4 font-medium">電話</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">諮詢服務</th>
              <th className="px-6 py-4 font-medium">來源</th>
              <th className="px-6 py-4 font-medium">狀態</th>
              <th className="px-6 py-4 font-medium">提交時間</th>
              <th className="px-6 py-4 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-50 transition-colors hover:bg-gray-50/50"
              >
                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-gray-600">{item.phone}</td>
                <td className="px-6 py-4 text-gray-600">{item.email}</td>
                <td className="px-6 py-4 text-gray-600">{item.service}</td>
                <td className="px-6 py-4 text-gray-600">{item.source}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[item.status]}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{item.createdAt}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                      <Eye size={16} />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                  沒有符合條件的資料
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 分頁 */}
      <div className="flex items-center justify-end gap-4">
        <span className="text-sm text-gray-500">1-{filtered.length} of {filtered.length}</span>
        <div className="flex items-center gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <ChevronLeft size={18} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
