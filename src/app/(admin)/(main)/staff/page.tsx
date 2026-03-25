"use client";

import { useState, useMemo, useCallback } from "react";
import { Plus, Filter, MoreVertical, CalendarDays, Clock, Search, X, ChevronDown, Info } from "lucide-react";
import { Pagination } from "@heroui/pagination";
import { Button } from "@heroui/button";
import { Tabs, Tab } from "@heroui/tabs";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Chip } from "@heroui/chip";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Select, SelectItem } from "@heroui/select";
import { Avatar } from "@heroui/avatar";
import { AdminDrawer } from "@/components/admin/AdminDrawer";

const staffData = [
  { id: 1, name: "森森", email: "youliaosucai@hmail.com", gender: "女", birthday: "1995-05-12", age: 28, position: "UI/UX 設計師", level: "中級", levelType: "primary" as const },
  { id: 2, name: "張偉成", email: "youliaosucai@hmail.com", gender: "男", birthday: "1995-05-12", age: 28, position: "UI/UX 設計師", level: "中級", levelType: "primary" as const },
  { id: 3, name: "王一月", email: "youliaosucai@hmail.com", gender: "女", birthday: "1995-05-12", age: 28, position: "文案", level: "初級", levelType: "default" as const },
  { id: 4, name: "李鶴軒", email: "youliaosucai@hmail.com", gender: "女", birthday: "1995-05-12", age: 28, position: "文案", level: "中級", levelType: "primary" as const },
  { id: 5, name: "甄博超", email: "youliaosucai@hmail.com", gender: "男", birthday: "1995-05-12", age: 28, position: "iOS開發", level: "高級", levelType: "warning" as const },
  { id: 6, name: "段欣怡", email: "youliaosucai@hmail.com", gender: "女", birthday: "1995-05-12", age: 28, position: "UI界面設計師", level: "高級", levelType: "warning" as const },
  { id: 7, name: "嚴瑞元", email: "youliaosucai@hmail.com", gender: "男", birthday: "1995-05-12", age: 28, position: "Android開發", level: "高級", levelType: "warning" as const },
  { id: 8, name: "王小祥", email: "youliaosucai@hmail.com", gender: "女", birthday: "1995-05-12", age: 28, position: "UE交互設計師", level: "高級", levelType: "warning" as const },
];

const columns = [
  { key: "name", label: "姓名" },
  { key: "gender", label: "性別" },
  { key: "birthday", label: "生日" },
  { key: "age", label: "年齡" },
  { key: "position", label: "職位" },
  { key: "actions", label: "" },
];

const rowsPerPageOptions = [
  { key: "5", label: "5" },
  { key: "10", label: "10" },
  { key: "15", label: "15" },
];

export default function StaffPage() {
  const [viewMode, setViewMode] = useState("0");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filterGroups, setFilterGroups] = useState<Record<string, boolean>>({
    設計組: true, 研發組: false, 測試組: false, 營銷組: false, 項目管理組: false,
  });
  const [filterReporters, setFilterReporters] = useState<Record<string, boolean>>({
    張偉成: true, 王一月: false, 李鶴軒: false, 甄博超: false, 段欣怡: false,
  });
  const [selectedExecutors, setSelectedExecutors] = useState(["于偉旗", "于偉旗", "有料", "森森", "嚴瑞元"]);
  const [priority, setPriority] = useState("中");

  const filterCount = Object.values(filterGroups).filter(Boolean).length
    + Object.values(filterReporters).filter(Boolean).length
    + (priority ? 1 : 0);

  const totalStaff = 28;
  const totalPages = Math.ceil(staffData.length / rowsPerPage);
  const paginatedStaff = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return staffData.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage]);

  const onRowsPerPageChange = useCallback((keys: Set<string> | "all") => {
    if (keys === "all") return;
    const value = Array.from(keys)[0];
    if (value) {
      setRowsPerPage(Number(value));
      setPage(1);
    }
  }, []);

  const renderCell = useCallback((staff: typeof staffData[0], columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-3">
            <Avatar
              name={staff.name.charAt(0)}
              size="sm"
              classNames={{ base: "bg-blue-50 shrink-0", name: "text-blue-500 font-semibold" }}
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">{staff.name}</p>
              <p className="text-xs text-gray-400">{staff.email}</p>
            </div>
          </div>
        );
      case "position":
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-900">{staff.position}</span>
            <Chip size="sm" variant="flat" color={staff.levelType}>{staff.level}</Chip>
          </div>
        );
      case "actions":
        return (
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={18} />
          </button>
        );
      default:
        return <span className="text-sm text-gray-900">{staff[columnKey as keyof typeof staff]}</span>;
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* 標題列 */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">員工 ({totalStaff})</h1>
        <div className="flex-1 flex justify-center">
          <Tabs
            selectedKey={viewMode}
            onSelectionChange={(key) => setViewMode(String(key))}
            variant="light"
            radius="full"
            classNames={{
              tabList: "bg-gray-100 p-1 rounded-full",
              tab: "px-6 py-1.5 text-sm font-medium",
              cursor: "bg-blue-500 rounded-full",
            }}
          >
            <Tab key="0" title="列表" />
            <Tab key="1" title="狀態" />
          </Tabs>
        </div>

        <button
          onClick={() => setShowFilter(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
        >
          <Filter size={18} />
        </button>

        <Button onPress={() => setShowAddModal(true)} className="bg-blue-500 text-white rounded-xl px-5 h-10 font-medium hover:bg-blue-600">
          <Plus size={16} /> 添加員工
        </Button>
      </div>

      {/* 員工表格 */}
      <Table
        aria-label="員工列表"
        classNames={{
          wrapper: "rounded-2xl shadow-sm",
          th: "text-xs text-gray-400 font-medium bg-white",
          td: "text-sm py-4",
        }}
        bottomContent={
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-gray-500">
              {staffData.length > 0
                ? `${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, staffData.length)} of ${totalStaff} 位員工`
                : "沒有資料"
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
        <TableBody items={paginatedStaff} emptyContent="沒有符合條件的員工">
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, String(columnKey))}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* 篩選 Drawer */}
      <AdminDrawer
        open={showFilter}
        onClose={() => setShowFilter(false)}
        title="篩選"
        footer={
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <Info size={14} className="text-blue-500" /> 找到 10 個匹配項
            </span>
            <Button onPress={() => setShowFilter(false)} className="bg-blue-500 text-white rounded-xl px-5 h-10 font-medium hover:bg-blue-600">
              提交篩選 ({filterCount})
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm text-gray-500">時間周期</p>
            <div className="relative">
              <input placeholder="選擇時間周期" className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500" />
              <CalendarDays size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm text-gray-500">任務組</p>
            <div className="space-y-3">
              {Object.entries(filterGroups).map(([name, checked]) => (
                <Checkbox
                  key={name}
                  isSelected={checked}
                  onValueChange={(val) => setFilterGroups((prev) => ({ ...prev, [name]: val }))}
                  classNames={{ label: "text-sm text-gray-700" }}
                >
                  {name}
                </Checkbox>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm text-gray-500">報告人</p>
            <div className="space-y-3">
              {Object.entries(filterReporters).map(([name, checked]) => (
                <Checkbox
                  key={name}
                  isSelected={checked}
                  onValueChange={(val) => setFilterReporters((prev) => ({ ...prev, [name]: val }))}
                  classNames={{ label: "text-sm text-gray-700" }}
                >
                  {name}
                </Checkbox>
              ))}
            </div>
            <button className="mt-3 text-sm font-medium text-blue-500 hover:text-blue-600">
              查看更多 <ChevronDown size={14} className="inline" />
            </button>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-500">執行人</p>
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input placeholder="搜索" className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedExecutors.map((name, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 py-1 pl-2 pr-2 text-sm text-gray-700">
                  <Avatar name={name.charAt(0)} size="sm" classNames={{ base: "bg-blue-50 h-5 w-5", name: "text-blue-500 font-semibold text-[10px]" }} />
                  {name}
                  <button onClick={() => setSelectedExecutors((prev) => prev.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-gray-600"><X size={12} /></button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-500">預估時間</p>
            <div className="relative">
              <input placeholder="選擇預估時間" className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500" />
              <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-gray-500">優先等級</p>
            <div className="relative">
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-900 outline-none focus:border-blue-500">
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
      <Modal isOpen={showAddModal} onOpenChange={(open) => { if (!open) setShowAddModal(false); }} placement="center" classNames={{ base: "bg-white rounded-2xl" }}>
        <ModalContent>
          <ModalHeader>添加員工</ModalHeader>
          <ModalBody className="pb-6">
            <div className="mb-5 flex justify-center rounded-xl bg-gray-50 py-6">
              <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-28">
                <rect x="28" y="110" width="12" height="20" rx="2" fill="#FCD34D" />
                <circle cx="34" cy="90" r="8" fill="#93C5FD" />
                <circle cx="26" cy="80" r="6" fill="#818CF8" />
                <circle cx="42" cy="82" r="7" fill="#A5B4FC" />
                <circle cx="34" cy="72" r="5" fill="#C7D2FE" />
                <ellipse cx="30" cy="68" rx="4" ry="8" fill="#CBD5E1" transform="rotate(-15 30 68)" />
                <ellipse cx="40" cy="65" rx="3" ry="7" fill="#E2E8F0" transform="rotate(10 40 65)" />
                <rect x="162" y="105" width="8" height="25" rx="2" fill="#93C5FD" />
                <ellipse cx="166" cy="85" rx="6" ry="12" fill="#C7D2FE" />
                <ellipse cx="160" cy="78" rx="4" ry="10" fill="#E0E7FF" transform="rotate(-10 160 78)" />
                <ellipse cx="172" cy="80" rx="4" ry="10" fill="#EEF2FF" transform="rotate(10 172 80)" />
                <rect x="65" y="75" width="70" height="45" rx="4" fill="#60A5FA" />
                <rect x="70" y="80" width="60" height="32" rx="2" fill="#BFDBFE" />
                <rect x="55" y="120" width="90" height="5" rx="2" fill="#E5E7EB" />
                <circle cx="100" cy="35" r="14" fill="#D4A574" />
                <path d="M86 30 Q86 15 100 15 Q114 15 114 30 Q114 25 108 22 Q100 20 92 22 Q86 25 86 30Z" fill="#1E293B" />
                <path d="M86 30 Q84 40 86 45 L86 30Z" fill="#1E293B" />
                <path d="M82 52 Q100 65 118 52 L115 90 H85 Z" fill="#FCD34D" />
                <rect x="78" y="58" width="6" height="25" rx="3" fill="#D4A574" transform="rotate(-10 78 58)" />
                <rect x="116" y="58" width="6" height="25" rx="3" fill="#D4A574" transform="rotate(10 119 58)" />
              </svg>
            </div>

            <Input label="員工郵箱" placeholder="memberemail@hotmail.com" variant="bordered" classNames={{ inputWrapper: "rounded-xl" }} />

            <div className="mt-5 flex items-center justify-between">
              <button className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600">
                <Plus size={16} /> 繼續添加
              </button>
              <Button onPress={() => setShowAddModal(false)} className="bg-blue-500 text-white rounded-xl px-5 h-10 font-medium hover:bg-blue-600">
                確定添加
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
