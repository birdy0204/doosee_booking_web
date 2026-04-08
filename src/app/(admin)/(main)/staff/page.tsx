"use client";

import { useState, useMemo, useCallback } from "react";
import { Plus, MoreVertical, Search, Shield, Pencil, Users } from "lucide-react";
import { Pagination } from "@heroui/pagination";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Select, SelectItem } from "@heroui/select";
import { Avatar } from "@heroui/avatar";
import { Spinner } from "@heroui/spinner";
import { useUserList } from "@/hooks/useUsers";
import { useRoleList } from "@/hooks/useRoles";
import type { UserDto, RoleDto } from "@/types/api";

// ==================== 常數設定 ====================

const userColumns = [
  { key: "name", label: "姓名" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "電話" },
  { key: "roles", label: "角色" },
  { key: "isActive", label: "狀態" },
  { key: "creationTime", label: "建立時間" },
  { key: "actions", label: "" },
];

const roleColumns = [
  { key: "name", label: "職位" },
  { key: "permissions", label: "權限" },
  { key: "count", label: "人數" },
  { key: "isDefault", label: "預設" },
  { key: "actions", label: "" },
];

const rowsPerPageOptions = [
  { key: "5", label: "5" },
  { key: "10", label: "10" },
  { key: "15", label: "15" },
];

// ==================== 工具函式 ====================

function getDisplayName(user: UserDto): string {
  const parts = [user.surname, user.name].filter(Boolean);
  return parts.length > 0 ? parts.join("") : user.userName;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function getRoleLabel(name: string): string {
  const map: Record<string, string> = {
    admin: "管理員",
    editor: "編輯者",
    viewer: "檢視者",
  };
  return map[name] ?? name;
}

/** 角色對應的權限描述 */
function getRolePermissions(name: string): string[] {
  const map: Record<string, string[]> = {
    admin: ["完整管理", "使用者管理", "內容管理", "系統設定"],
    editor: ["內容管理", "表單管理", "檔案上傳"],
    viewer: ["檢視內容", "檢視表單"],
  };
  return map[name] ?? ["基本存取"];
}

function getRoleChipColor(name: string): "warning" | "primary" | "success" | "default" {
  const map: Record<string, "warning" | "primary" | "success"> = {
    admin: "warning",
    editor: "primary",
    viewer: "success",
  };
  return map[name] ?? "default";
}

// ==================== 主元件 ====================

export default function StaffPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // 呼叫 API
  const { data: userData, isLoading: usersLoading, isError } = useUserList({
    skipCount: (page - 1) * rowsPerPage,
    maxResultCount: rowsPerPage,
    sorting: "CreationTime DESC",
  });
  // 取得全部使用者（用於角色人數統計）
  const { data: allUserData } = useUserList({ maxResultCount: 1000 });
  const { data: roleData, isLoading: rolesLoading } = useRoleList();

  const users = userData?.items ?? [];
  const totalCount = userData?.totalCount ?? 0;
  const allUsers = allUserData?.items ?? [];
  const roles = roleData?.items ?? [];

  // 用全部使用者計算每個角色的人數
  const roleUserCounts = useMemo(() => {
    const map = new Map<string, number>();
    allUsers.forEach((u) => {
      (u.roles ?? []).forEach((role) => {
        map.set(role, (map.get(role) || 0) + 1);
      });
    });
    return map;
  }, [allUsers]);

  // 前端篩選（搜尋 + 角色）
  const filtered = useMemo(() => {
    let result = [...users];

    if (selectedRole) {
      result = result.filter((u) =>
        (u.roles ?? []).includes(selectedRole),
      );
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (u) =>
          getDisplayName(u).toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.userName.toLowerCase().includes(q) ||
          (u.phoneNumber && u.phoneNumber.includes(q)),
      );
    }

    return result;
  }, [users, selectedRole, search]);

  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage));

  const onRowsPerPageChange = useCallback((keys: Set<string> | "all") => {
    if (keys === "all") return;
    const value = Array.from(keys)[0];
    if (value) {
      setRowsPerPage(Number(value));
      setPage(1);
    }
  }, []);

  // ==================== 角色表格 Cell 渲染 ====================

  const renderRoleCell = (role: RoleDto, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-3">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              role.name === "admin" ? "bg-amber-50" : role.name === "editor" ? "bg-blue-50" : "bg-green-50"
            }`}>
              <Shield size={16} className={
                role.name === "admin" ? "text-amber-500" : role.name === "editor" ? "text-blue-500" : "text-green-500"
              } />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{getRoleLabel(role.name)}</p>
              <p className="text-xs text-gray-400">{role.name}</p>
            </div>
          </div>
        );
      case "permissions":
        return (
          <div className="flex items-center gap-1 flex-wrap">
            {getRolePermissions(role.name).map((perm) => (
              <Chip key={perm} size="sm" variant="flat" color={getRoleChipColor(role.name)}>
                {perm}
              </Chip>
            ))}
          </div>
        );
      case "count":
        return (
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-900">
              {roleUserCounts.get(role.name) ?? 0}
            </span>
          </div>
        );
      case "isDefault":
        return role.isDefault ? (
          <Chip size="sm" variant="flat" color="primary">預設</Chip>
        ) : (
          <span className="text-sm text-gray-400">-</span>
        );
      case "actions":
        return (
          <Button
            size="sm"
            variant="light"
            isIconOnly
            className="text-gray-400 hover:text-blue-500"
          >
            <Pencil size={15} />
          </Button>
        );
      default:
        return null;
    }
  };

  // ==================== 員工表格 Cell 渲染 ====================

  const renderUserCell = (user: UserDto, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-3">
            <Avatar
              name={getDisplayName(user).charAt(0)}
              size="sm"
              classNames={{ base: "bg-blue-50 shrink-0", name: "text-blue-500 font-semibold" }}
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">{getDisplayName(user)}</p>
              <p className="text-xs text-gray-400">@{user.userName}</p>
            </div>
          </div>
        );
      case "email":
        return <span className="text-sm text-gray-900">{user.email}</span>;
      case "phoneNumber":
        return <span className="text-sm text-gray-900">{user.phoneNumber || "-"}</span>;
      case "roles":
        return (
          <div className="flex items-center gap-1 flex-wrap">
            {(user.roles ?? []).length > 0 ? (
              (user.roles ?? []).map((role) => (
                <Chip key={role} size="sm" variant="flat" color={getRoleChipColor(role)}>
                  {getRoleLabel(role)}
                </Chip>
              ))
            ) : (
              <span className="text-sm text-gray-400">-</span>
            )}
          </div>
        );
      case "isActive":
        return (
          <Chip size="sm" variant="flat" color={user.isActive ? "success" : "default"}>
            {user.isActive ? "啟用" : "停用"}
          </Chip>
        );
      case "creationTime":
        return <span className="text-sm text-gray-900">{formatDate(user.creationTime)}</span>;
      case "actions":
        return (
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={18} />
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* ==================== 權限管理表格 ==================== */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">權限管理</h2>
            <Chip size="sm" variant="flat" classNames={{ base: "bg-gray-100", content: "text-gray-600 font-semibold" }}>
              {roles.length}
            </Chip>
          </div>
        </div>

        <Table
          aria-label="權限列表"
          selectionMode="single"
          selectedKeys={selectedRole ? new Set([selectedRole]) : new Set()}
          onSelectionChange={(keys) => {
            if (keys === "all") return;
            const val = Array.from(keys)[0] as string | undefined;
            setSelectedRole(val ?? null);
            setPage(1);
          }}
          classNames={{
            wrapper: "rounded-2xl shadow-sm",
            th: "text-xs text-gray-400 font-medium bg-white",
            td: "text-sm py-3",
            tr: "cursor-pointer hover:bg-gray-50 transition-colors data-[selected=true]:bg-blue-50",
          }}
        >
          <TableHeader columns={roleColumns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody
            items={roles}
            isLoading={rolesLoading}
            loadingContent={<Spinner color="primary" label="載入中..." />}
            emptyContent="尚無角色資料"
          >
            {(role) => (
              <TableRow key={role.name}>
                {(columnKey) => (
                  <TableCell>{renderRoleCell(role, String(columnKey))}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ==================== 員工管理表格 ==================== */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">
              {selectedRole ? `${getRoleLabel(selectedRole)} 員工` : "全部員工"}
            </h2>
            <Chip size="sm" variant="flat" classNames={{ base: "bg-gray-100", content: "text-gray-600 font-semibold" }}>
              {selectedRole ? filtered.length : totalCount}
            </Chip>
            {selectedRole && (
              <Button
                size="sm"
                variant="flat"
                className="text-gray-500"
                onPress={() => { setSelectedRole(null); setPage(1); }}
              >
                清除篩選
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Input
              size="sm"
              placeholder="搜尋..."
              variant="bordered"
              value={search}
              onValueChange={(val) => { setSearch(val); setPage(1); }}
              startContent={<Search size={14} className="text-gray-400" />}
              classNames={{ base: "w-48", inputWrapper: "rounded-lg border-gray-200" }}
            />
            <Button
              size="sm"
              onPress={() => setShowAddModal(true)}
              className="bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
              <Plus size={14} /> 添加
            </Button>
          </div>
        </div>

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
                {totalCount > 0
                  ? `${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, totalCount)} / ${totalCount} 位員工`
                  : "沒有資料"}
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
                  classNames={{ cursor: "bg-blue-500 text-white" }}
                />
              </div>
            </div>
          }
        >
          <TableHeader columns={userColumns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody
            items={filtered}
            isLoading={usersLoading}
            loadingContent={<Spinner color="primary" label="載入中..." />}
            emptyContent={isError ? "載入失敗，請稍後再試" : "沒有符合條件的員工"}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderUserCell(item, String(columnKey))}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ==================== 添加員工 Modal ==================== */}
      <Modal
        isOpen={showAddModal}
        onOpenChange={(open) => { if (!open) setShowAddModal(false); }}
        placement="center"
        classNames={{ base: "bg-white rounded-2xl" }}
      >
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

            <Input
              label="員工郵箱"
              placeholder="memberemail@hotmail.com"
              variant="bordered"
              classNames={{ inputWrapper: "rounded-xl" }}
            />

            <div className="mt-5 flex items-center justify-between">
              <button className="flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600">
                <Plus size={16} /> 繼續添加
              </button>
              <Button
                onPress={() => setShowAddModal(false)}
                className="bg-blue-500 text-white rounded-xl px-5 h-10 font-medium hover:bg-blue-600"
              >
                確定添加
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
