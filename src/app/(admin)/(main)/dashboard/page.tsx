"use client";

import { CalendarDays, ArrowUp, ArrowDown, Clock, ChevronRight, Bookmark, Paperclip } from "lucide-react";
import { AdminButton } from "@/components/admin/AdminButton";

// 團隊成員資料
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

// 最近事件資料
const recentEvents = [
  {
    title: "新部門介紹，標題文字示例，最多兩行折行顯示",
    date: "今天 | 下午5:00",
    duration: "2h",
    trend: "up" as const,
  },
  {
    title: "王安娜的生日",
    date: "今天 | 下午6:00",
    duration: "1h 30m",
    trend: "down" as const,
  },
  {
    title: "雷彭凱的生日",
    date: "明天 | 下午2:00",
    duration: "1.5h",
    trend: "down" as const,
  },
];

// 專案資料
const projects = [
  {
    code: "PN0001265",
    name: "醫療應用（iOS 原生）",
    icon: "🩺",
    createdAt: "創建於 2020年9月12日",
    priority: "high" as const,
    totalTasks: 34,
    currentTasks: 13,
    members: ["A", "B", "C"],
  },
  {
    code: "PN0001221",
    name: "送餐服務",
    icon: "🍔",
    createdAt: "創建於 2020年9月10日",
    priority: "high" as const,
    totalTasks: 50,
    currentTasks: 24,
    members: ["D", "E", "F"],
  },
  {
    code: "PN0001290",
    name: "送餐服務",
    icon: "🍔",
    createdAt: "創建於 2021年5月28日",
    priority: "low" as const,
    totalTasks: 23,
    currentTasks: 20,
    members: ["G", "H", "I"],
  },
];

// 專案日誌資料
const activityLogs = [
  {
    name: "段欣怡",
    role: "用戶界面/UI設計師",
    actions: [
      { icon: "bookmark", text: "將思維導圖任務的狀態更新為進行中" },
      { icon: "paperclip", text: "附加到任務的文件" },
    ],
  },
  {
    name: "段米莉",
    role: "文案",
    actions: [
      { icon: "bookmark", text: "將思維導圖任務的狀態更新為進行中" },
    ],
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
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

      {/* 上半部：工作量 + 最近事件 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        {/* 工作量 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">工作量</h2>
            <AdminButton variant="link" size="sm">
              查看全部 <ChevronRight size={16} />
            </AdminButton>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-lg font-semibold text-blue-500">
                  {member.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-900">{member.name}</span>
                <span className="text-xs text-gray-500 text-center leading-tight">{member.role}</span>
                <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${member.levelColor}`}>
                  {member.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 最近事件 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">最近事件</h2>
            <AdminButton variant="link" size="sm">
              查看全部 <ChevronRight size={16} />
            </AdminButton>
          </div>
          <div className="space-y-4">
            {recentEvents.map((event, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
                    {event.title}
                  </p>
                  {event.trend === "up" ? (
                    <ArrowUp size={16} className="shrink-0 text-orange-500" />
                  ) : (
                    <ArrowDown size={16} className="shrink-0 text-green-500" />
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{event.date}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-500">
                    <Clock size={12} />
                    {event.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 下半部：專案 + 專案日誌 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        {/* 專案列表 */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">項目</h2>
            <AdminButton variant="link" size="sm">
              查看全部 <ChevronRight size={16} />
            </AdminButton>
          </div>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex items-center gap-6 rounded-2xl border border-gray-100 bg-white p-5"
              >
                {/* 專案資訊 */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{project.icon}</span>
                    <div>
                      <p className="text-xs text-gray-400">{project.code}</p>
                      <p className="font-medium text-gray-900">{project.name}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                    <CalendarDays size={12} />
                    {project.createdAt}
                    <span className="ml-2 flex items-center gap-1">
                      {project.priority === "high" ? (
                        <>
                          <ArrowUp size={12} className="text-orange-500" />
                          <span className="font-medium text-orange-500">高</span>
                        </>
                      ) : (
                        <>
                          <ArrowDown size={12} className="text-blue-500" />
                          <span className="font-medium text-blue-500">低</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* 分隔線 */}
                <div className="h-12 w-px bg-gray-100" />

                {/* 專案數據 */}
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">項目數據</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">所有任務</p>
                    <p className="text-lg font-semibold text-gray-900">{project.totalTasks}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">當前任務</p>
                    <p className="text-lg font-semibold text-gray-900">{project.currentTasks}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">執行人</p>
                    <div className="mt-1 flex -space-x-2">
                      {project.members.map((m, i) => (
                        <div
                          key={i}
                          className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-50 text-xs font-medium text-blue-500"
                        >
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 專案日誌 */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="mb-6 text-lg font-semibold">項目日誌</h2>
          <div className="space-y-5">
            {activityLogs.map((log, logIndex) => (
              <div key={logIndex} className="space-y-3">
                {/* 使用者資訊 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-500">
                    {log.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{log.name}</p>
                    <p className="text-xs text-gray-400">{log.role}</p>
                  </div>
                </div>
                {/* 操作記錄 */}
                {log.actions.map((action, actionIndex) => (
                  <div
                    key={actionIndex}
                    className="flex items-start gap-2 rounded-lg bg-gray-50 px-3 py-2.5"
                  >
                    {action.icon === "bookmark" ? (
                      <Bookmark size={14} className="mt-0.5 shrink-0 text-blue-500" />
                    ) : (
                      <Paperclip size={14} className="mt-0.5 shrink-0 text-blue-500" />
                    )}
                    <span className="text-sm text-gray-600">{action.text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-5 text-center">
            <AdminButton variant="link" size="sm">
              查看更多 <ChevronRight size={14} />
            </AdminButton>
          </div>
        </div>
      </div>
    </div>
  );
}
