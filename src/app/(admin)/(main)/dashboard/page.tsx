"use client";

import { useState } from "react";
import { CalendarDays, TrendingUp, TrendingDown } from "lucide-react";
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

function StatCard({ card }: { card: typeof statsCards[0] }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{card.title}</span>
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${card.badgeType === "up" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
          {card.badgeType === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {card.badge}
        </span>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-3">{card.value}</p>
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-gray-700 font-medium">{card.trend}</span>
        {card.trendIcon === "up" ? <TrendingUp size={14} className="text-green-500" /> : <TrendingDown size={14} className="text-red-400" />}
      </div>
      <p className="text-xs text-gray-400 mt-0.5">{card.description}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [chartPeriod, setChartPeriod] = useState("7days");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-500">歡迎回來，森森！</p>
          <h1 className="text-2xl font-bold">儀表盤</h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
          <CalendarDays size={16} />
          2021年11月16日 - 2021年12月16日
        </button>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card) => (
          <StatCard key={card.title} card={card} />
        ))}
      </div>

      {/* 訪客圖表 */}
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
                className={`px-4 py-2 text-sm font-medium transition-colors ${chartPeriod === item.key ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-50"}`}
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
            <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
            <Area type="monotone" dataKey="visitors" stroke="#7c3aed" strokeWidth={2.5} fill="url(#colorVisitors)" />
            <Area type="monotone" dataKey="sessions" stroke="#a78bfa" strokeWidth={2} fill="url(#colorSessions)" strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
