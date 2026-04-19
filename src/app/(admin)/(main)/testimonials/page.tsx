"use client";

import { useState, useCallback } from "react";
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
import { Input, Textarea } from "@heroui/input";
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
import {
  useTestimonialList,
  useCreateTestimonial,
  useUpdateTestimonial,
  useDeleteTestimonial,
} from "@/hooks/useTestimonials";
import type { CreateUpdateTestimonialDto, TestimonialDto } from "@/types/api";
import PartnerSection from "./PartnerSection";

// ==================== 主元件 ====================

export default function TestimonialsPage() {
  const { data, isLoading } = useTestimonialList({
    maxResultCount: 100,
    sorting: "SortOrder ASC",
  });
  const createMutation = useCreateTestimonial();
  const updateMutation = useUpdateTestimonial();
  const deleteMutation = useDeleteTestimonial();

  // 編輯 Modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateUpdateTestimonialDto>({
    authorName: "",
    authorTitle: "",
    content: "",
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

  const items = data?.items ?? [];

  // ==================== 事件處理 ====================

  const openCreate = useCallback(() => {
    setEditingId(null);
    setForm({
      authorName: "",
      authorTitle: "",
      content: "",
      sortOrder: items.length,
      isPublished: true,
    });
    onEditOpen();
  }, [items.length, onEditOpen]);

  const openEdit = useCallback(
    (item: TestimonialDto) => {
      setEditingId(item.id);
      setForm({
        authorName: item.authorName,
        authorTitle: item.authorTitle ?? "",
        content: item.content,
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
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* ==================== 合作夥伴區塊 ==================== */}
        <div className="min-w-0">
          <PartnerSection />
        </div>

        {/* ==================== 客戶見證區塊 ==================== */}
        <div className="min-w-0 space-y-6">
          {/* 標題 */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">客戶見證</h1>
              <p className="text-sm text-gray-400 mt-1">
                管理前台首頁的客戶見證內容
              </p>
            </div>
            <Button
              onPress={openCreate}
              className="bg-blue-500 text-white rounded-xl px-5 h-10 font-medium hover:bg-blue-600"
            >
              <Plus size={16} /> 新增見證
            </Button>
          </div>

          {/* 表格 */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Spinner size="lg" color="primary" />
            </div>
          ) : (
            <Table
              aria-label="客戶見證"
              classNames={{
                wrapper: "rounded-2xl shadow-sm",
                th: "text-xs text-gray-400 font-medium bg-white",
                td: "text-sm",
              }}
            >
              <TableHeader>
                <TableColumn width={60}>排序</TableColumn>
                <TableColumn>客戶</TableColumn>
                <TableColumn>見證內容</TableColumn>
                <TableColumn width={80}>狀態</TableColumn>
                <TableColumn width={100}>操作</TableColumn>
              </TableHeader>
              <TableBody
                items={items}
                emptyContent="尚無客戶見證，點擊「新增見證」開始建立"
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
                          name={item.authorName.charAt(0)}
                          size="sm"
                          classNames={{
                            base: "bg-purple-50 shrink-0",
                            name: "text-purple-500 font-semibold",
                          }}
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {item.authorName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.authorTitle}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-500 line-clamp-1 max-w-md">
                        {item.content}
                      </span>
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
        </div>
      </div>

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
                {editingId ? "編輯客戶見證" : "新增客戶見證"}
              </ModalHeader>
              <ModalBody className="gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="客戶名稱"
                    placeholder="例：FLUX Hair Salon"
                    variant="bordered"
                    value={form.authorName}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, authorName: v }))
                    }
                    classNames={{ inputWrapper: "rounded-xl" }}
                  />
                  <Input
                    label="角色 / 頭銜"
                    placeholder="例：台北大安 · 髮廊"
                    variant="bordered"
                    value={form.authorTitle ?? ""}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, authorTitle: v }))
                    }
                    classNames={{ inputWrapper: "rounded-xl" }}
                  />
                </div>
                <Textarea
                  label="見證內容"
                  placeholder="請輸入見證內容"
                  variant="bordered"
                  value={form.content}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, content: v }))
                  }
                  minRows={4}
                  classNames={{ inputWrapper: "rounded-xl" }}
                />
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
                  確定要刪除這則客戶見證嗎？此操作無法復原。
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
