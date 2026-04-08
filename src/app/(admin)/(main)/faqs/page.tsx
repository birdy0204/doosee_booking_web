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
import { Spinner } from "@heroui/spinner";
import {
  useFaqList,
  useCreateFaq,
  useUpdateFaq,
  useDeleteFaq,
} from "@/hooks/useFaqs";
import type { CreateUpdateFaqDto, FaqDto } from "@/types/api";

// ==================== 主元件 ====================

export default function FaqsPage() {
  const { data, isLoading } = useFaqList({
    maxResultCount: 100,
    sorting: "SortOrder ASC",
  });
  const createMutation = useCreateFaq();
  const updateMutation = useUpdateFaq();
  const deleteMutation = useDeleteFaq();

  // 編輯 Modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateUpdateFaqDto>({
    question: "",
    answer: "",
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
      question: "",
      answer: "",
      sortOrder: items.length,
      isPublished: true,
    });
    onEditOpen();
  }, [items.length, onEditOpen]);

  const openEdit = useCallback(
    (item: FaqDto) => {
      setEditingId(item.id);
      setForm({
        question: item.question,
        answer: item.answer,
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
      {/* 標題 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">常見問題管理</h1>
          <p className="text-sm text-gray-400 mt-1">
            管理前台首頁的常見問題（FAQ）
          </p>
        </div>
        <Button
          onPress={openCreate}
          className="bg-blue-500 text-white rounded-xl px-5 h-10 font-medium hover:bg-blue-600"
        >
          <Plus size={16} /> 新增問題
        </Button>
      </div>

      {/* 表格 */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <Table
          aria-label="常見問題"
          classNames={{
            wrapper: "rounded-2xl shadow-sm",
            th: "text-xs text-gray-400 font-medium bg-white",
            td: "text-sm",
          }}
        >
          <TableHeader>
            <TableColumn width={60}>排序</TableColumn>
            <TableColumn>問題</TableColumn>
            <TableColumn>回答</TableColumn>
            <TableColumn width={80}>狀態</TableColumn>
            <TableColumn width={100}>操作</TableColumn>
          </TableHeader>
          <TableBody items={items} emptyContent="尚無常見問題，點擊「新增問題」開始建立">
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <span className="text-gray-400 font-mono">
                    {item.sortOrder}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-gray-900 line-clamp-1">
                    {item.question}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-500 line-clamp-1 max-w-md">
                    {item.answer}
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
                {editingId ? "編輯常見問題" : "新增常見問題"}
              </ModalHeader>
              <ModalBody className="gap-5">
                <Input
                  label="問題"
                  placeholder="請輸入問題"
                  variant="bordered"
                  value={form.question}
                  onValueChange={(v) => setForm((f) => ({ ...f, question: v }))}
                  classNames={{ inputWrapper: "rounded-xl" }}
                />
                <Textarea
                  label="回答"
                  placeholder="請輸入回答內容"
                  variant="bordered"
                  value={form.answer}
                  onValueChange={(v) => setForm((f) => ({ ...f, answer: v }))}
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
                  確定要刪除這則常見問題嗎？此操作無法復原。
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
