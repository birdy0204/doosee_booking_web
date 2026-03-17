"use client";

import { useState } from "react";
import { Plus, Filter, MoreVertical, ChevronLeft, ChevronRight, CalendarDays, Clock, Search, X, ChevronDown, Info } from "lucide-react";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminTabs } from "@/components/admin/AdminTabs";
import { AdminModal } from "@/components/admin/AdminModal";
import { AdminInput } from "@/components/admin/AdminInput";
import { AdminDrawer } from "@/components/admin/AdminDrawer";
import { AdminCheckbox } from "@/components/admin/AdminCheckbox";

// 員工資料
const staffData = [
  { name: "森森", email: "youliaosucai@hmail.com", gender: "女", birthday: "1995-05-12", age: 28, position: "UI/UX 設計師", level: "中級", levelColor: "bg-blue-50 text-blue-500" },
  { name: "張偉成", email: "youliaosucai@hmail.com", gender: "男", birthday: "1995-05-12", age: 28, position: "UI/UX 設計師", level: "中級", levelColor: "bg-blue-50 text-blue-500" },
  { name: "王一月", email: "youliaosucai@hmail.com", gender: "女", birthday: "1995-05-12", age: 28, position: "文案", level: "初級", levelColor: "bg-blue-100 text-blue-600" },
  { name: "李鶴軒", email: "youliaosucai@hmail.com", gender: "女", birthday: "1995-05-12", age: 28, position: "文案", level: "中級", levelColor: "bg-blue-50 text-blue-500" },
  { name: "甄博超", email: "youliaosucai@hmail.com", gender: "男", birthday: "1995-05-12", age: 28, position: "iOS開發", level: "高級", levelColor: "bg-amber-100 text-amber-600" },
  { name: "段欣怡", email: "youliaosucai@hmail.com", gender: "女", birthday: "1995-05-12", age: 28, position: "UI界面設計師", level: "高級", levelColor: "bg-amber-100 text-amber-600" },
  { name: "嚴瑞元", email: "youliaosucai@hmail.com", gender: "男", birthday: "1995-05-12", age: 28, position: "Android開發", level: "高級", levelColor: "bg-amber-100 text-amber-600" },
  { name: "王小祥", email: "youliaosucai@hmail.com", gender: "女", birthday: "1995-05-12", age: 28, position: "UE交互設計師", level: "高級", levelColor: "bg-amber-100 text-amber-600" },
];


export default function StaffPage() {
  const [viewMode, setViewMode] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  // 篩選狀態
  const [filterGroups, setFilterGroups] = useState<Record<string, boolean>>({
    設計組: true,
    研發組: false,
    測試組: false,
    營銷組: false,
    項目管理組: false,
  });
  const [filterReporters, setFilterReporters] = useState<Record<string, boolean>>({
    張偉成: true,
    王一月: false,
    李鶴軒: false,
    甄博超: false,
    段欣怡: false,
  });
  const [selectedExecutors, setSelectedExecutors] = useState([
    "于偉旗", "于偉旗", "有料", "森森", "嚴瑞元",
  ]);
  const [priority, setPriority] = useState("中");

  const filterCount = Object.values(filterGroups).filter(Boolean).length
    + Object.values(filterReporters).filter(Boolean).length
    + (priority ? 1 : 0);

  const totalStaff = 28;

  return (
    <div className="space-y-6">
      {/* 標題列 */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">員工 ({totalStaff})</h1>

        {/* 列表/狀態切換 - 置中 */}
        <div className="flex-1 flex justify-center">
          <AdminTabs
            items={["列表", "狀態"]}
            value={viewMode}
            onChange={setViewMode}
          />
        </div>

        {/* 篩選 */}
        <button
          onClick={() => setShowFilter(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
        >
          <Filter size={18} />
        </button>

        {/* 添加員工 */}
        <AdminButton onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          添加員工
        </AdminButton>
      </div>

      {/* 員工列表 */}
      <div className="space-y-3">
        {staffData.map((staff, index) => (
          <div
            key={index}
            className="flex items-center rounded-2xl bg-white px-6 py-4 shadow-sm"
          >
            {/* 頭像 + 姓名 */}
            <div className="flex flex-[2] items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-500">
                {staff.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{staff.name}</p>
                <p className="text-xs text-gray-400">{staff.email}</p>
              </div>
            </div>

            {/* 性別 */}
            <div className="flex-1">
              <p className="text-xs text-gray-400">性別</p>
              <p className="text-sm font-medium text-gray-900">{staff.gender}</p>
            </div>

            {/* 生日 */}
            <div className="flex-1">
              <p className="text-xs text-gray-400">生日</p>
              <p className="text-sm font-medium text-gray-900">{staff.birthday}</p>
            </div>

            {/* 年齡 */}
            <div className="flex-1">
              <p className="text-xs text-gray-400">年齡</p>
              <p className="text-sm font-medium text-gray-900">{staff.age}</p>
            </div>

            {/* 職位 */}
            <div className="flex flex-1 items-center gap-2">
              <div>
                <p className="text-xs text-gray-400">職位</p>
                <p className="text-sm font-medium text-gray-900">{staff.position}</p>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${staff.levelColor}`}>
                {staff.level}
              </span>
            </div>

            {/* 更多操作 */}
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* 分頁 */}
      <div className="flex items-center justify-end gap-4">
        <span className="text-sm text-gray-500">1-8 of {totalStaff}</span>
        <div className="flex items-center gap-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <ChevronLeft size={18} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      {/* 篩選 Drawer */}
      <AdminDrawer
        open={showFilter}
        onClose={() => setShowFilter(false)}
        title="篩選"
        footer={
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <Info size={14} className="text-blue-500" />
              找到 10 個匹配項
            </span>
            <AdminButton onClick={() => setShowFilter(false)}>
              提交篩選 ({filterCount})
            </AdminButton>
          </div>
        }
      >
        <div className="space-y-6">
          {/* 時間周期 */}
          <div>
            <p className="mb-2 text-sm text-gray-500">時間周期</p>
            <div className="relative">
              <input
                placeholder="選擇時間周期"
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500"
              />
              <CalendarDays size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* 任務組 */}
          <div>
            <p className="mb-3 text-sm text-gray-500">任務組</p>
            <div className="space-y-3">
              {Object.entries(filterGroups).map(([name, checked]) => (
                <AdminCheckbox
                  key={name}
                  label={name}
                  checked={checked}
                  onChange={(val) => setFilterGroups((prev) => ({ ...prev, [name]: val }))}
                />
              ))}
            </div>
          </div>

          {/* 報告人 */}
          <div>
            <p className="mb-3 text-sm text-gray-500">報告人</p>
            <div className="space-y-3">
              {Object.entries(filterReporters).map(([name, checked]) => (
                <AdminCheckbox
                  key={name}
                  checked={checked}
                  onChange={(val) => setFilterReporters((prev) => ({ ...prev, [name]: val }))}
                  label={name}
                />
              ))}
            </div>
            <button className="mt-3 text-sm font-medium text-blue-500 hover:text-blue-600">
              查看更多 <ChevronDown size={14} className="inline" />
            </button>
          </div>

          {/* 執行人 */}
          <div>
            <p className="mb-2 text-sm text-gray-500">執行人</p>
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="搜索"
                className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedExecutors.map((name, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 py-1 pl-2 pr-2 text-sm text-gray-700"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-[10px] font-semibold text-blue-500">
                    {name.charAt(0)}
                  </span>
                  {name}
                  <button
                    onClick={() => setSelectedExecutors((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 預估時間 */}
          <div>
            <p className="mb-2 text-sm text-gray-500">預估時間</p>
            <div className="relative">
              <input
                placeholder="選擇預估時間"
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500"
              />
              <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* 優先等級 */}
          <div>
            <p className="mb-2 text-sm text-gray-500">優先等級</p>
            <div className="relative">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-900 outline-none focus:border-blue-500"
              >
                <option value="高">高</option>
                <option value="中">中</option>
                <option value="低">低</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </AdminDrawer>

      {/* 添加員工 Modal */}
      <AdminModal open={showAddModal} onClose={() => setShowAddModal(false)} title="添加員工">
        {/* 插圖 */}
        <div className="mb-5 flex justify-center rounded-xl bg-gray-50 py-6">
          <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-28">
            {/* 植物左 */}
            <rect x="28" y="110" width="12" height="20" rx="2" fill="#FCD34D" />
            <circle cx="34" cy="90" r="8" fill="#93C5FD" />
            <circle cx="26" cy="80" r="6" fill="#818CF8" />
            <circle cx="42" cy="82" r="7" fill="#A5B4FC" />
            <circle cx="34" cy="72" r="5" fill="#C7D2FE" />
            <ellipse cx="30" cy="68" rx="4" ry="8" fill="#CBD5E1" transform="rotate(-15 30 68)" />
            <ellipse cx="40" cy="65" rx="3" ry="7" fill="#E2E8F0" transform="rotate(10 40 65)" />
            {/* 植物右 */}
            <rect x="162" y="105" width="8" height="25" rx="2" fill="#93C5FD" />
            <ellipse cx="166" cy="85" rx="6" ry="12" fill="#C7D2FE" />
            <ellipse cx="160" cy="78" rx="4" ry="10" fill="#E0E7FF" transform="rotate(-10 160 78)" />
            <ellipse cx="172" cy="80" rx="4" ry="10" fill="#EEF2FF" transform="rotate(10 172 80)" />
            {/* 筆電 */}
            <rect x="65" y="75" width="70" height="45" rx="4" fill="#60A5FA" />
            <rect x="70" y="80" width="60" height="32" rx="2" fill="#BFDBFE" />
            <rect x="55" y="120" width="90" height="5" rx="2" fill="#E5E7EB" />
            {/* 人物頭 */}
            <circle cx="100" cy="35" r="14" fill="#D4A574" />
            {/* 頭髮 */}
            <path d="M86 30 Q86 15 100 15 Q114 15 114 30 Q114 25 108 22 Q100 20 92 22 Q86 25 86 30Z" fill="#1E293B" />
            <path d="M86 30 Q84 40 86 45 L86 30Z" fill="#1E293B" />
            {/* 身體 */}
            <path d="M82 52 Q100 65 118 52 L115 90 H85 Z" fill="#FCD34D" />
            {/* 手臂 */}
            <rect x="78" y="58" width="6" height="25" rx="3" fill="#D4A574" transform="rotate(-10 78 58)" />
            <rect x="116" y="58" width="6" height="25" rx="3" fill="#D4A574" transform="rotate(10 119 58)" />
          </svg>
        </div>

        {/* 表單 */}
        <AdminInput label="員工郵箱" placeholder="memberemail@hotmail.com" />

        <div className="mt-5 flex items-center justify-between">
          <button className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600">
            <Plus size={16} /> 繼續添加
          </button>
          <AdminButton onClick={() => setShowAddModal(false)}>確定添加</AdminButton>
        </div>
      </AdminModal>
    </div>
  );
}
