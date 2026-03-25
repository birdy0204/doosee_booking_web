"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, Eye, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { Tabs, Tab } from "@heroui/tabs";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { Select, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// ==================== 統計卡片資料 ====================

const statsCards = [
  {
    title: "總諮詢量",
    value: "1,250",
    badge: "+12.5%",
    badgeType: "up" as const,
    trend: "持續成長中",
    trendIcon: "up" as const,
    description: "近 6 個月統計",
  },
  {
    title: "新增客戶",
    value: "234",
    badge: "-8%",
    badgeType: "down" as const,
    trend: "本期下降 8%",
    trendIcon: "down" as const,
    description: "需加強推廣力道",
  },
  {
    title: "已預約數",
    value: "45,678",
    badge: "+12.5%",
    badgeType: "up" as const,
    trend: "客戶回訪率高",
    trendIcon: "up" as const,
    description: "超越預期目標",
  },
  {
    title: "轉換率",
    value: "4.5%",
    badge: "+4.5%",
    badgeType: "up" as const,
    trend: "穩定提升中",
    trendIcon: "up" as const,
    description: "符合成長預測",
  },
];

// ==================== 圖表資料 ====================

const chartData = [
  { date: "6/24", visitors: 180, sessions: 120 },
  { date: "6/25", visitors: 250, sessions: 180 },
  { date: "6/26", visitors: 380, sessions: 280 },
  { date: "6/27", visitors: 320, sessions: 250 },
  { date: "6/28", visitors: 220, sessions: 160 },
  { date: "6/29", visitors: 350, sessions: 260 },
  { date: "6/30", visitors: 280, sessions: 200 },
];

// ==================== 表單資料 ====================

const formData = [
  { id: 1, name: "林小美", phone: "0912-345-678", email: "mei@example.com", service: "美甲護理", source: "官網表單", status: "未處理", createdAt: "2026-03-15 14:30" },
  { id: 2, name: "陳怡君", phone: "0923-456-789", email: "yijun@example.com", service: "臉部護理", source: "官網表單", status: "已聯繫", createdAt: "2026-03-15 10:15" },
  { id: 3, name: "王雅婷", phone: "0934-567-890", email: "yating@example.com", service: "美髮造型", source: "LINE", status: "已預約", createdAt: "2026-03-14 16:45" },
  { id: 4, name: "張家瑜", phone: "0945-678-901", email: "jiayu@example.com", service: "身體舒壓", source: "官網表單", status: "未處理", createdAt: "2026-03-14 09:20" },
  { id: 5, name: "李佳蓉", phone: "0956-789-012", email: "jiarong@example.com", service: "美睫嫁接", source: "Instagram", status: "已聯繫", createdAt: "2026-03-13 11:00" },
  { id: 6, name: "黃心怡", phone: "0967-890-123", email: "xinyi@example.com", service: "美甲護理", source: "官網表單", status: "已預約", createdAt: "2026-03-13 08:30" },
];

const statusColorMap: Record<string, "warning" | "primary" | "success"> = {
  未處理: "warning",
  已聯繫: "primary",
  已預約: "success",
};

const columns = [
  { key: "name", label: "姓名" },
  { key: "phone", label: "電話" },
  { key: "email", label: "Email" },
  { key: "service", label: "諮詢服務" },
  { key: "source", label: "來源" },
  { key: "status", label: "狀態" },
  { key: "createdAt", label: "提交時間" },
  { key: "actions", label: "操作" },
];

const tabItems = ["全部", "未處理", "已聯繫", "已預約"];
const rowsPerPageOptions = [
  { key: "5", label: "5" },
  { key: "10", label: "10" },
  { key: "15", label: "15" },
];

// ==================== 統計卡片元件 ====================

function StatCard({ card }: { card: typeof statsCards[0] }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{card.title}</span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
            card.badgeType === "up"
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {card.badgeType === "up" ? (
            <TrendingUp size={12} />
          ) : (
            <TrendingDown size={12} />
          )}
          {card.badge}
        </span>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-3">{card.value}</p>
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-gray-700 font-medium">{card.trend}</span>
        {card.trendIcon === "up" ? (
          <TrendingUp size={14} className="text-green-500" />
        ) : (
          <TrendingDown size={14} className="text-red-400" />
        )}
      </div>
      <p className="text-xs text-gray-400 mt-0.5">{card.description}</p>
    </div>
  );
}

// ==================== 主元件 ====================

export default function FormsPage() {
  const [tab, setTab] = useState("0");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedKeys, setSelectedKeys] = useState<Set<string> | "all">(new Set());
  const [chartPeriod, setChartPeriod] = useState("7days");

  const tabIndex = Number(tab);

  const filtered = useMemo(() => {
    return formData.filter(
      (item) =>
        (tabIndex === 0 ||
          (tabIndex === 1 && item.status === "未處理") ||
          (tabIndex === 2 && item.status === "已聯繫") ||
          (tabIndex === 3 && item.status === "已預約")) &&
        (search === "" ||
          item.name.includes(search) ||
          item.phone.includes(search) ||
          item.email.includes(search))
    );
  }, [tabIndex, search]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const onRowsPerPageChange = useCallback((keys: Set<string> | "all") => {
    if (keys === "all") return;
    const value = Array.from(keys)[0];
    if (value) {
      setRowsPerPage(Number(value));
      setPage(1);
    }
  }, []);

  const renderCell = useCallback((item: typeof formData[0], columnKey: string) => {
    switch (columnKey) {
      case "status":
        return (
          <Chip size="sm" variant="flat" color={statusColorMap[item.status]}>
            {item.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
              <Eye size={16} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        );
      default:
        return item[columnKey as keyof typeof item];
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* ==================== 統計卡片 ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card) => (
          <StatCard key={card.title} card={card} />
        ))}
      </div>

      {/* ==================== 訪客圖表 ==================== */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">訪客總覽</h2>
            <p className="text-sm text-gray-400 mt-0.5">近期訪客流量統計</p>
          </div>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {[
              { key: "3months", label: "近 3 個月" },
              { key: "30days", label: "近 30 天" },
              { key: "7days", label: "近 7 天" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setChartPeriod(item.key)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  chartPeriod === item.key
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#9ca3af" }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: "#9ca3af" }} />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Area type="monotone" dataKey="visitors" stroke="#7c3aed" strokeWidth={2.5} fill="url(#colorVisitors)" />
            <Area type="monotone" dataKey="sessions" stroke="#a78bfa" strokeWidth={2} fill="url(#colorSessions)" strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ==================== 表單資料表格 ==================== */}
      <div className="flex items-center gap-4">
        <div className="flex-1 flex">
          <Tabs
            selectedKey={tab}
            onSelectionChange={(key) => { setTab(String(key)); setPage(1); }}
            variant="light"
            radius="full"
            classNames={{
              tabList: "bg-gray-100 p-1 rounded-full",
              tab: "px-6 py-1.5 text-sm font-medium",
              cursor: "bg-blue-500 rounded-full",
            }}
          >
            {tabItems.map((item, index) => (
              <Tab key={String(index)} title={item} />
            ))}
          </Tabs>
        </div>

        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="搜尋姓名、電話、Email"
            className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-blue-500"
          />
        </div>
      </div>

      <Table
        aria-label="表單資料"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys as Set<string> | "all")}
        classNames={{
          wrapper: "rounded-2xl shadow-sm",
          th: "text-xs text-gray-400 font-medium bg-white",
          td: "text-sm",
        }}
        bottomContent={
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-gray-500">
              {selectedKeys === "all"
                ? `已選取全部 ${filtered.length} 筆`
                : `已選取 ${selectedKeys.size} / ${filtered.length} 筆資料`
              }
            </span>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">每頁顯示</span>
                <Select
                  size="sm"
                  selectedKeys={new Set([String(rowsPerPage)])}
                  onSelectionChange={onRowsPerPageChange}
                  className="w-20"
                  classNames={{ trigger: "h-8 min-h-8 rounded-lg" }}
                  aria-label="每頁筆數"
                >
                  {rowsPerPageOptions.map((opt) => (
                    <SelectItem key={opt.key}>{opt.label}</SelectItem>
                  ))}
                </Select>
              </div>

              <span className="text-sm text-gray-500 whitespace-nowrap">
                第 {page} 頁，共 {totalPages} 頁
              </span>

              <Pagination
                total={totalPages}
                page={page}
                onChange={setPage}
                showControls
                size="sm"
                classNames={{
                  cursor: "bg-blue-500 text-white",
                }}
              />
            </div>
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={paginatedData} emptyContent="沒有符合條件的資料">
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, String(columnKey))}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
