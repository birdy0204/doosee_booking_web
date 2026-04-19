"use client";

import { useState, useCallback, useMemo } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Avatar } from "@heroui/avatar";
import { Spinner } from "@heroui/spinner";
import { Select, SelectItem } from "@heroui/select";
import { Tabs, Tab } from "@heroui/tabs";
import {
  usePartnerList,
  useCreatePartner,
  useUpdatePartner,
  useDeletePartner,
} from "@/hooks/usePartners";
import { PartnerCategory } from "@/types/api";
import type { CreateUpdatePartnerDto, PartnerDto } from "@/types/api";

const categoryLabel: Record<PartnerCategory, string> = {
  [PartnerCategory.Company]: "商家",
  [PartnerCategory.PersonalBrand]: "個人 IP",
};

const tabItems = ["全部", "商家", "個人 IP"];
const tabCategoryMap: Record<number, PartnerCategory | null> = {
  0: null,
  1: PartnerCategory.Company,
  2: PartnerCategory.PersonalBrand,
};

export default function PartnerSection() {
  const { data, isLoading } = usePartnerList({
    maxResultCount: 100,
    sorting: "SortOrder ASC",
  });
  const createMutation = useCreatePartner();
  const updateMutation = useUpdatePartner();
  const deleteMutation = useDeletePartner();

  // 編輯 Modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateUpdatePartnerDto>({
    name: "",
    description: "",
    category: PartnerCategory.Company,
    sortOrder: 0,
    isPublished: true,
  });

  // 刪除確認 Modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // 分類篩選
  const [tab, setTab] = useState("0");
  const categoryFilter = tabCategoryMap[Number(tab)];

  const allItems = data?.items ?? [];
  const items = useMemo(
    () =>
      categoryFilter === null
        ? allItems
        : allItems.filter((item) => item.category === categoryFilter),
    [allItems, categoryFilter],
  );

  // ==================== 事件處理 ====================

  const openCreate = useCallback(() => {
    setEditingId(null);
    setForm({
      name: "",
      description: "",
      category: PartnerCategory.Company,
      sortOrder: items.length,
      isPublished: true,
    });
    onEditOpen();
  }, [items.length, onEditOpen]);

  const openEdit = useCallback(
    (item: PartnerDto) => {
      setEditingId(item.id);
      setForm({
        name: item.name,
        description: item.description ?? "",
        category: item.category,
        sortOrder: item.sortOrder,
        isPublished: item.isPublished,
      });
      onEditOpen();
    },
    [onEditOpen],
  );

  const openDeleteConfirm = useCallback(
    (id: string) => {
      setDeleteId(id);
      onDeleteOpen();
    },
    [onDeleteOpen],
  );

  const handleSave = async (onClose: () => void) => {
    if (editingId) {
      await updateMutation.mutateAsync({ id: editingId, data: form });
    } else {
      await createMutation.mutateAsync(form);
    }
    onClose();
  };

  const handleDelete = async (onClose: () => void) => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* 標題 + 分類篩選 Tabs + 新增按鈕 */}
      <div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold whitespace-nowrap">合作夥伴</h1>
          <Tabs
          selectedKey={tab}
          onSelectionChange={(key) => setTab(String(key))}
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
          <Button
            onPress={openCreate}
            className="bg-blue-500 text-white rounded-xl px-5 h-10 font-medium hover:bg-blue-600"
          >
            <Plus size={16} /> 新增夥伴
          </Button>
        </div>
        <p className="text-sm text-gray-400 mt-1">
          管理前台首頁的合作夥伴跑馬燈
        </p>
      </div>

      {/* 表格 */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <Table
          aria-label="合作夥伴"
          classNames={{
            wrapper: "rounded-2xl shadow-sm",
            th: "text-xs text-gray-400 font-medium bg-white",
            td: "text-sm",
          }}
        >
          <TableHeader>
            <TableColumn width={60}>排序</TableColumn>
            <TableColumn>名稱</TableColumn>
            <TableColumn>描述</TableColumn>
            <TableColumn width={90}>分類</TableColumn>
            <TableColumn width={80}>狀態</TableColumn>
            <TableColumn width={100}>操作</TableColumn>
          </TableHeader>
          <TableBody
            items={items}
            emptyContent="尚無合作夥伴，點擊「新增夥伴」開始建立"
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <span className="text-gray-400 font-mono">
                    {item.sortOrder}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={item.name.charAt(0)}
                      size="sm"
                      classNames={{
                        base: "bg-green-50 shrink-0",
                        name: "text-green-500 font-semibold",
                      }}
                    />
                    <span className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-500 line-clamp-1 max-w-md">
                    {item.description}
                  </span>
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={
                      item.category === PartnerCategory.Company
                        ? "primary"
                        : "secondary"
                    }
                  >
                    {categoryLabel[item.category]}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={item.isPublished ? "success" : "warning"}
                  >
                    {item.isPublished ? "已發佈" : "草稿"}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => openEdit(item)}
                    >
                      <Pencil size={16} className="text-gray-400" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => openDeleteConfirm(item.id)}
                    >
                      <Trash2 size={16} className="text-gray-400" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* ==================== 編輯 / 新增 Modal ==================== */}
      <Modal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        size="2xl"
        placement="center"
        classNames={{ base: "bg-white rounded-2xl" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">
                {editingId ? "編輯合作夥伴" : "新增合作夥伴"}
              </ModalHeader>
              <ModalBody className="gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="名稱"
                    placeholder="例：FLUX Hair Salon"
                    variant="bordered"
                    value={form.name}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, name: v }))
                    }
                    classNames={{ inputWrapper: "rounded-xl" }}
                  />
                  <Input
                    label="描述"
                    placeholder="例：髮廊 · 台北大安"
                    variant="bordered"
                    value={form.description ?? ""}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, description: v }))
                    }
                    classNames={{ inputWrapper: "rounded-xl" }}
                  />
                </div>
                <Select
                  label="分類"
                  variant="bordered"
                  selectedKeys={[String(form.category)]}
                  onSelectionChange={(keys) => {
                    const val = [...keys][0];
                    if (val !== undefined) {
                      setForm((f) => ({ ...f, category: Number(val) }));
                    }
                  }}
                  classNames={{ trigger: "rounded-xl" }}
                >
                  <SelectItem key={String(PartnerCategory.Company)}>
                    商家
                  </SelectItem>
                  <SelectItem key={String(PartnerCategory.PersonalBrand)}>
                    個人 IP
                  </SelectItem>
                </Select>
                <div className="flex items-center gap-6">
                  <Input
                    label="排序"
                    type="number"
                    variant="bordered"
                    value={String(form.sortOrder ?? 0)}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, sortOrder: Number(v) || 0 }))
                    }
                    className="max-w-[120px]"
                    classNames={{ inputWrapper: "rounded-xl" }}
                  />
                  <Switch
                    isSelected={form.isPublished ?? true}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, isPublished: v }))
                    }
                    size="sm"
                  >
                    <span className="text-sm">發佈</span>
                  </Switch>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  onPress={() => handleSave(onClose)}
                  isLoading={
                    createMutation.isPending || updateMutation.isPending
                  }
                  className="bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600"
                >
                  {editingId ? "儲存變更" : "新增"}
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
              <ModalHeader className="text-lg font-semibold">
                確認刪除
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-gray-600">
                  確定要刪除這個合作夥伴嗎？此操作無法復原。
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="danger"
                  onPress={() => handleDelete(onClose)}
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
    </div>
  );
}
