"use client";

import { useState, useMemo, useCallback } from "react";
import type { SortDescriptor } from "@heroui/table";
import { Search, Eye, Trash2, X } from "lucide-react";
import { Tabs, Tab } from "@heroui/tabs";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import { Select, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/modal";
import { Textarea } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { toast } from "sonner";
import {
  useFormSubmissionList,
  useFormSubmissionDetail,
  useUpdateFormSubmission,
  useDeleteFormSubmission,
} from "@/hooks/useFormSubmissions";
import { FormStatus, FormSource } from "@/types/api";
import type { FormSubmissionDto } from "@/types/api";

// ==================== 常量對照表 ====================

const statusLabelMap: Record<FormStatus, string> = {
  [FormStatus.Pending]: "未處理",
  [FormStatus.Contacted]: "已聯繫",
  [FormStatus.Booked]: "已預約",
};

const statusColorMap: Record<FormStatus, "warning" | "primary" | "success"> = {
  [FormStatus.Pending]: "warning",
  [FormStatus.Contacted]: "primary",
  [FormStatus.Booked]: "success",
};

const sourceLabelMap: Record<FormSource, string> = {
  [FormSource.Website]: "官網表單",
  [FormSource.Line]: "LINE",
  [FormSource.Instagram]: "Instagram",
  [FormSource.Facebook]: "Facebook",
  [FormSource.Other]: "其他",
};

const columns = [
  { key: "name", label: "姓名", sortable: false },
  { key: "phone", label: "電話", sortable: false },
  { key: "email", label: "Email", sortable: false },
  { key: "service", label: "諮詢服務", sortable: false },
  { key: "source", label: "來源", sortable: false },
  { key: "status", label: "狀態", sortable: false },
  { key: "creationTime", label: "提交時間", sortable: true },
  { key: "actions", label: "操作", sortable: false },
];

const tabItems = ["全部", "未處理", "已聯繫", "已預約"];
const tabStatusMap: Record<number, FormStatus | null> = {
  0: null,
  1: FormStatus.Pending,
  2: FormStatus.Contacted,
  3: FormStatus.Booked,
};

const rowsPerPageOptions = [
  { key: "5", label: "5" },
  { key: "10", label: "10" },
  { key: "15", label: "15" },
];

// ==================== 格式化時間 ====================

function formatDateTime(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// ==================== 主元件 ====================

export default function FormsPage() {
  const [tab, setTab] = useState("0");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedKeys, setSelectedKeys] = useState<Set<string> | "all">(new Set());
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "creationTime",
    direction: "descending",
  });

  // 詳情 Modal 狀態
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onOpenChange: onDetailOpenChange } = useDisclosure();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<FormStatus | null>(null);
  const [editNote, setEditNote] = useState("");

  // 刪除確認 Modal 狀態
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onOpenChange: onDeleteOpenChange } = useDisclosure();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const tabIndex = Number(tab);
  const statusFilter = tabStatusMap[tabIndex];

  // ==================== API 資料 ====================

  // 將 sortDescriptor 轉為 API sorting 參數
  const apiSorting = useMemo(() => {
    if (!sortDescriptor.column) return "CreationTime DESC";
    // API 欄位名稱首字母大寫
    const col = String(sortDescriptor.column);
    const field = col.charAt(0).toUpperCase() + col.slice(1);
    const dir = sortDescriptor.direction === "ascending" ? "ASC" : "DESC";
    return `${field} ${dir}`;
  }, [sortDescriptor]);

  const { data: listData, isLoading } = useFormSubmissionList({
    skipCount: (page - 1) * rowsPerPage,
    maxResultCount: rowsPerPage,
    sorting: apiSorting,
  });

  const { data: detailData } = useFormSubmissionDetail(selectedId);
  const updateMutation = useUpdateFormSubmission();
  const deleteMutation = useDeleteFormSubmission();

  const items = listData?.items ?? [];
  const totalCount = listData?.totalCount ?? 0;

  // ==================== 前端篩選（tab + 搜尋） ====================

  const filtered = useMemo(() => {
    return items.filter(
      (item) =>
        (statusFilter === null || item.status === statusFilter) &&
        (search === "" ||
          item.name.includes(search) ||
          (item.phone?.includes(search) ?? false) ||
          item.email.includes(search)),
    );
  }, [items, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(
    statusFilter === null && search === ""
      ? totalCount / rowsPerPage
      : filtered.length / rowsPerPage,
  ));

  const paginatedData = useMemo(() => {
    if (statusFilter !== null || search !== "") {
      const start = 0;
      return filtered.slice(start, start + rowsPerPage);
    }
    return filtered;
  }, [filtered, statusFilter, search, rowsPerPage]);

  // ==================== 事件處理 ====================

  const onRowsPerPageChange = useCallback((keys: Set<string> | "all") => {
    if (keys === "all") return;
    const value = Array.from(keys)[0];
    if (value) {
      setRowsPerPage(Number(value));
      setPage(1);
    }
  }, []);

  const openDetail = (item: FormSubmissionDto) => {
    setSelectedId(item.id);
    setEditStatus(item.status);
    setEditNote(item.note ?? "");
    onDetailOpen();
  };

  const handleUpdateStatus = async () => {
    if (!selectedId || editStatus === null) return;
    await updateMutation.mutateAsync({
      id: selectedId,
      data: { status: editStatus, note: editNote || undefined },
    });
    onDetailOpenChange();
  };

  const openDeleteConfirm = (id: string) => {
    setDeleteId(id);
    onDeleteOpen();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    onDeleteOpenChange();
    setDeleteId(null);
  };

  // ==================== 批量操作 ====================

  const hasSelection = selectedKeys === "all" || selectedKeys.size > 0;
  const selectionCount = selectedKeys === "all" ? filtered.length : selectedKeys.size;

  const getSelectedIds = (): string[] => {
    if (selectedKeys === "all") return filtered.map((item) => item.id);
    return Array.from(selectedKeys);
  };

  const handleBulkUpdateStatus = async (status: FormStatus) => {
    const ids = getSelectedIds();
    try {
      await Promise.all(
        ids.map((id) => updateMutation.mutateAsync({ id, data: { status } })),
      );
      toast.success(`已將 ${ids.length} 筆表單標記為「${statusLabelMap[status]}」`);
      setSelectedKeys(new Set());
    } catch {
      // 錯誤已在 hook 內處理
    }
  };

  const handleBulkDelete = async () => {
    const ids = getSelectedIds();
    try {
      await Promise.all(ids.map((id) => deleteMutation.mutateAsync(id)));
      toast.success(`已刪除 ${ids.length} 筆表單`);
      setSelectedKeys(new Set());
    } catch {
      // 錯誤已在 hook 內處理
    }
  };

  // 批量刪除確認
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  // ==================== 表格 cell 渲染 ====================

  const renderCell = (item: FormSubmissionDto, columnKey: string) => {
    switch (columnKey) {
      case "phone":
        return item.phone || "—";
      case "service":
        return item.service || "—";
      case "source":
        return sourceLabelMap[item.source] ?? "其他";
      case "status":
        return (
          <Chip size="sm" variant="flat" color={statusColorMap[item.status]}>
            {statusLabelMap[item.status]}
          </Chip>
        );
      case "creationTime":
        return formatDateTime(item.creationTime);
      case "actions":
        return (
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
            <button
              onClick={() => openDetail(item)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => openDeleteConfirm(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      default:
        return item[columnKey as keyof FormSubmissionDto] as string;
    }
  };

  return (
    <div className="space-y-6">
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

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <Table
          aria-label="表單資料"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={(keys) => setSelectedKeys(keys as Set<string> | "all")}
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          classNames={{
            wrapper: "rounded-2xl shadow-sm",
            th: "text-xs text-gray-400 font-medium bg-white",
            td: "text-sm",
          }}
          topContent={
            hasSelection ? (
              <div className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-2.5">
                <span className="text-sm font-medium text-blue-700">
                  已選取 {selectionCount} 筆
                </span>
                <div className="flex items-center gap-2">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button size="sm" variant="flat" color="primary" className="rounded-lg font-medium">
                        變更狀態
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="批量變更狀態"
                      onAction={(key) => handleBulkUpdateStatus(Number(key) as FormStatus)}
                    >
                      <DropdownItem key={FormStatus.Pending}>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          未處理
                        </div>
                      </DropdownItem>
                      <DropdownItem key={FormStatus.Contacted}>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-blue-500" />
                          已聯繫
                        </div>
                      </DropdownItem>
                      <DropdownItem key={FormStatus.Booked}>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          已預約
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    className="rounded-lg font-medium"
                    onPress={() => setIsBulkDeleteOpen(true)}
                  >
                    <Trash2 size={14} />
                    批量刪除
                  </Button>
                  <Button
                    size="sm"
                    isIconOnly
                    variant="light"
                    onPress={() => setSelectedKeys(new Set())}
                    className="text-gray-400"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            ) : null
          }
          topContentPlacement="outside"
          bottomContent={
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-500">
                {selectedKeys === "all"
                  ? `已選取全部 ${filtered.length} 筆`
                  : `已選取 ${selectedKeys.size} / ${filtered.length} 筆資料`}
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
            {(column) => (
              <TableColumn key={column.key} allowsSorting={column.sortable}>
                {column.label}
              </TableColumn>
            )}
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
      )}

      {/* ==================== 詳情 / 編輯狀態 Modal ==================== */}
      <Modal
        isOpen={isDetailOpen}
        onOpenChange={onDetailOpenChange}
        size="2xl"
        placement="center"
        classNames={{ base: "bg-white rounded-2xl" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-between">
                <span className="text-lg font-semibold">表單詳情</span>
              </ModalHeader>
              <ModalBody className="gap-4">
                {detailData ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">姓名</p>
                        <p className="text-sm font-medium text-gray-900">{detailData.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Email</p>
                        <p className="text-sm font-medium text-gray-900">{detailData.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">電話</p>
                        <p className="text-sm font-medium text-gray-900">{detailData.phone || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">店家名稱</p>
                        <p className="text-sm font-medium text-gray-900">{detailData.salonName || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">諮詢服務</p>
                        <p className="text-sm font-medium text-gray-900">{detailData.service || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">來源</p>
                        <p className="text-sm font-medium text-gray-900">{sourceLabelMap[detailData.source]}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">提交時間</p>
                        <p className="text-sm font-medium text-gray-900">{formatDateTime(detailData.creationTime)}</p>
                      </div>
                    </div>

                    {detailData.description && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">詳細描述</p>
                        <p className="text-sm font-medium text-gray-900 whitespace-pre-wrap">{detailData.description}</p>
                      </div>
                    )}

                    <div className="border-t border-gray-100 pt-4 space-y-4">
                      <div>
                        <p className="text-xs text-gray-400 mb-2">處理狀態</p>
                        <div className="flex gap-2">
                          {([FormStatus.Pending, FormStatus.Contacted, FormStatus.Booked] as const).map((s) => (
                            <Button
                              key={s}
                              size="sm"
                              variant={editStatus === s ? "solid" : "bordered"}
                              color={statusColorMap[s]}
                              onPress={() => setEditStatus(s)}
                              className="rounded-lg"
                            >
                              {statusLabelMap[s]}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Textarea
                        label="備註"
                        placeholder="新增備註..."
                        variant="bordered"
                        value={editNote}
                        onValueChange={setEditNote}
                        minRows={2}
                        classNames={{ inputWrapper: "rounded-xl" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center py-8">
                    <Spinner size="lg" color="primary" />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  onPress={handleUpdateStatus}
                  isLoading={updateMutation.isPending}
                  className="bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600"
                >
                  儲存變更
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* ==================== 刪除確認 Modal ==================== */}
      <Modal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        size="sm"
        placement="center"
        classNames={{ base: "bg-white rounded-2xl" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">確認刪除</ModalHeader>
              <ModalBody>
                <p className="text-sm text-gray-600">確定要刪除這筆表單資料嗎？此操作無法復原。</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="danger"
                  onPress={handleDelete}
                  isLoading={deleteMutation.isPending}
                  className="rounded-xl font-medium"
                >
                  確認刪除
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* ==================== 批量刪除確認 Modal ==================== */}
      <Modal
        isOpen={isBulkDeleteOpen}
        onOpenChange={setIsBulkDeleteOpen}
        size="sm"
        placement="center"
        classNames={{ base: "bg-white rounded-2xl" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">確認批量刪除</ModalHeader>
              <ModalBody>
                <p className="text-sm text-gray-600">
                  確定要刪除已選取的 <span className="font-semibold text-danger">{selectionCount}</span> 筆表單資料嗎？此操作無法復原。
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="danger"
                  isLoading={deleteMutation.isPending}
                  className="rounded-xl font-medium"
                  onPress={async () => {
                    await handleBulkDelete();
                    onClose();
                  }}
                >
                  確認刪除 {selectionCount} 筆
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
