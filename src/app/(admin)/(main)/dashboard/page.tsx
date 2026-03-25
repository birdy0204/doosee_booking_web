"use client";

import { useState } from "react";
import { CalendarDays, ArrowUp, ArrowDown, Clock, ChevronRight, Bookmark, Paperclip, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
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

const teamMembers = [
  { name: "張偉成", role: "用戶界面/交互設計師", level: "中級", levelColor: "bg-blue-50 text-blue-500" },
  { name: "王怡悅", role: "用戶界面/交互設計師", level: "初級", levelColor: "bg-blue-100 text-blue-600" },
  { name: "李鶴軒", role: "文案", level: "中級", levelColor: "bg-blue-50 text-blue-500" },
  { name: "甄博超", role: "文案", level: "高級", levelColor: "bg-amber-100 text-amber-600" },
  { name: "于偉旗", role: "iOS開發人員", level: "高級", levelColor: "bg-amber-100 text-amber-600" },
  { name: "段欣怡", role: "用戶界面/UI設計師", level: "中級", levelColor: "bg-blue-50 text-blue-500" },
  { name: "嚴瑞元", role: "文案", level: "前端", levelColor: "bg-teal-100 text-teal-600" },
  { name: "段康宇", role: "用戶界面/UI設計師", level: "中級", levelColor: "bg-blue-50 text-blue-500" },
];

const recentEvents = [
  { title: "新部門介紹，標題文字示例，最多兩行折行顯示", date: "今天 | 下午5:00", duration: "2h", trend: "up" as const },
  { title: "王安娜的生日", date: "今天 | 下午6:00", duration: "1h 30m", trend: "down" as const },
  { title: "雷彭凱的生日", date: "明天 | 下午2:00", duration: "1.5h", trend: "down" as const },
];

const projects = [
  { code: "PN0001265", name: "醫療應用（iOS 原生）", icon: "🩺", createdAt: "創建於 2020年9月12日", priority: "high" as const, totalTasks: 34, currentTasks: 13, members: ["A", "B", "C"] },
  { code: "PN0001221", name: "送餐服務", icon: "🍔", createdAt: "創建於 2020年9月10日", priority: "high" as const, totalTasks: 50, currentTasks: 24, members: ["D", "E", "F"] },
  { code: "PN0001290", name: "送餐服務", icon: "🍔", createdAt: "創建於 2021年5月28日", priority: "low" as const, totalTasks: 23, currentTasks: 20, members: ["G", "H", "I"] },
];

const activityLogs = [
  { name: "段欣怡", role: "用戶界面/UI設計師", actions: [{ icon: "bookmark", text: "將思維導圖任務的狀態更新為進行中" }, { icon: "paperclip", text: "附加到任務的文件" }] },
  { name: "段米莉", role: "文案", actions: [{ icon: "bookmark", text: "將思維導圖任務的狀態更新為進行中" }] },
];

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">工作量</h2>
            <Button variant="light" size="sm" className="text-blue-500 hover:text-blue-600">
              查看全部 <ChevronRight size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center gap-2">
                <Avatar name={member.name.charAt(0)} size="lg" classNames={{ base: "bg-blue-50 h-16 w-16", name: "text-blue-500 font-semibold text-lg" }} />
                <span className="text-sm font-medium text-gray-900">{member.name}</span>
                <span className="text-xs text-gray-500 text-center leading-tight">{member.role}</span>
                <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${member.levelColor}`}>{member.level}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">最近事件</h2>
            <Button variant="light" size="sm" className="text-blue-500 hover:text-blue-600">
              查看全部 <ChevronRight size={16} />
            </Button>
          </div>
          <div className="space-y-4">
            {recentEvents.map((event, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">{event.title}</p>
                  {event.trend === "up" ? <ArrowUp size={16} className="shrink-0 text-orange-500" /> : <ArrowDown size={16} className="shrink-0 text-green-500" />}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{event.date}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-500">
                    <Clock size={12} />{event.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">項目</h2>
            <Button variant="light" size="sm" className="text-blue-500 hover:text-blue-600">
              查看全部 <ChevronRight size={16} />
            </Button>
          </div>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="flex items-center gap-6 rounded-2xl border border-gray-100 bg-white p-5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{project.icon}</span>
                    <div>
                      <p className="text-xs text-gray-400">{project.code}</p>
                      <p className="font-medium text-gray-900">{project.name}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                    <CalendarDays size={12} />{project.createdAt}
                    <span className="ml-2 flex items-center gap-1">
                      {project.priority === "high" ? (<><ArrowUp size={12} className="text-orange-500" /><span className="font-medium text-orange-500">高</span></>) : (<><ArrowDown size={12} className="text-blue-500" /><span className="font-medium text-blue-500">低</span></>)}
                    </span>
                  </div>
                </div>
                <div className="h-12 w-px bg-gray-100" />
                <div className="flex items-center gap-8">
                  <div className="text-center"><p className="text-xs text-gray-400">項目數據</p></div>
                  <div className="text-center"><p className="text-xs text-gray-400">所有任務</p><p className="text-lg font-semibold text-gray-900">{project.totalTasks}</p></div>
                  <div className="text-center"><p className="text-xs text-gray-400">當前任務</p><p className="text-lg font-semibold text-gray-900">{project.currentTasks}</p></div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">執行人</p>
                    <div className="mt-1 flex -space-x-2">
                      {project.members.map((m, i) => (
                        <Avatar key={i} name={m} size="sm" classNames={{ base: "bg-blue-50 h-7 w-7 border-2 border-white", name: "text-blue-500 font-medium text-xs" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="mb-6 text-lg font-semibold">項目日誌</h2>
          <div className="space-y-5">
            {activityLogs.map((log, logIndex) => (
              <div key={logIndex} className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar name={log.name.charAt(0)} size="sm" classNames={{ base: "bg-blue-50", name: "text-blue-500 font-semibold" }} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{log.name}</p>
                    <p className="text-xs text-gray-400">{log.role}</p>
                  </div>
                </div>
                {log.actions.map((action, actionIndex) => (
                  <div key={actionIndex} className="flex items-start gap-2 rounded-lg bg-gray-50 px-3 py-2.5">
                    {action.icon === "bookmark" ? <Bookmark size={14} className="mt-0.5 shrink-0 text-blue-500" /> : <Paperclip size={14} className="mt-0.5 shrink-0 text-blue-500" />}
                    <span className="text-sm text-gray-600">{action.text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-5 text-center">
            <Button variant="light" size="sm" className="text-blue-500 hover:text-blue-600">
              查看更多 <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
