"use client";

import { useState, useCallback } from "react";
import { Pencil, Plus, Trash2, Check } from "lucide-react";
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
  usePricingPlanList,
  useCreatePricingPlan,
  useUpdatePricingPlan,
  useDeletePricingPlan,
} from "@/hooks/usePricingPlans";
import type {
  CreateUpdatePricingPlanDto,
  CreateUpdatePricingPlanFeatureDto,
  PricingPlanDto,
} from "@/types/api";

// ==================== 空白表單 ====================

function emptyForm(): CreateUpdatePricingPlanDto {
  return {
    name: "",
    description: "",
    price: null,
    originalPrice: null,
    period: "",
    ctaText: "",
    isRecommended: false,
    isPublished: true,
    sortOrder: 0,
    features: [],
  };
}

// ==================== 主元件 ====================

export default function PlansPage() {
  const { data, isLoading } = usePricingPlanList({
    maxResultCount: 20,
    sorting: "SortOrder ASC",
  });
  const createMutation = useCreatePricingPlan();
  const updateMutation = useUpdatePricingPlan();
  const deleteMutation = useDeletePricingPlan();

  // 編輯 Modal
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CreateUpdatePricingPlanDto>(emptyForm());

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
    setForm({ ...emptyForm(), sortOrder: items.length });
    onEditOpen();
  }, [items.length, onEditOpen]);

  const openEdit = useCallback(
    (item: PricingPlanDto) => {
      setEditingId(item.id);
      setForm({
        name: item.name,
        description: item.description ?? "",
        price: item.price,
        originalPrice: item.originalPrice,
        period: item.period ?? "",
        ctaText: item.ctaText ?? "",
        isRecommended: item.isRecommended,
        isPublished: item.isPublished,
        sortOrder: item.sortOrder,
        features: [...item.features]
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((f) => ({ text: f.text, sortOrder: f.sortOrder })),
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
    // 自動補上 feature sortOrder
    const normalized: CreateUpdatePricingPlanDto = {
      ...form,
      features: form.features.map((f, i) => ({ ...f, sortOrder: i })),
    };
    if (editingId) {
      await updateMutation.mutateAsync({ id: editingId, data: normalized });
    } else {
      await createMutation.mutateAsync(normalized);
    }
    onClose();
  };

  const handleDelete = async (onClose: () => void) => {
    if (!deleteId) return;
    await deleteMutation.mutateAsync(deleteId);
    setDeleteId(null);
    onClose();
  };

  // ==================== Feature 操作 ====================

  const addFeature = () => {
    setForm((f) => ({
      ...f,
      features: [...f.features, { text: "", sortOrder: f.features.length }],
    }));
  };

  const updateFeature = (index: number, text: string) => {
    setForm((f) => ({
      ...f,
      features: f.features.map((feat, i) =>
        i === index ? { ...feat, text } : feat,
      ),
    }));
  };

  const removeFeature = (index: number) => {
    setForm((f) => ({
      ...f,
      features: f.features.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      {/* 標題 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">優惠方案</h1>
          <p className="text-sm text-gray-400 mt-1">管理前台首頁的定價方案</p>
        </div>
        <Button
          onPress={openCreate}
          className="bg-blue-500 text-white rounded-xl px-5 h-10 font-medium hover:bg-blue-600"
        >
          <Plus size={16} /> 新增方案
        </Button>
      </div>

      {/* 方案卡片 */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border bg-white p-6 relative ${
                plan.isRecommended
                  ? "border-blue-500 ring-1 ring-blue-500"
                  : "border-gray-100"
              }`}
            >
              {plan.isRecommended && (
                <Chip
                  size="sm"
                  color="primary"
                  className="absolute -top-2.5 left-4"
                >
                  推薦方案
                </Chip>
              )}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <Chip
                  size="sm"
                  variant="flat"
                  color={plan.isPublished ? "success" : "warning"}
                >
                  {plan.isPublished ? "已發佈" : "草稿"}
                </Chip>
              </div>
              <div className="mb-1">
                {plan.originalPrice != null && (
                  <span className="text-gray-400 line-through text-sm mr-2">
                    NT${plan.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-3xl font-bold text-gray-900">
                  {plan.price != null
                    ? `NT$${plan.price.toLocaleString()}`
                    : "免費"}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{plan.period}</p>
              <p className="text-sm text-gray-500 mb-4">{plan.description}</p>

              {/* 功能列表 */}
              <ul className="space-y-2 mb-6">
                {[...plan.features]
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((f) => (
                    <li
                      key={f.id}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <Check size={14} className="text-blue-500 shrink-0" />
                      {f.text}
                    </li>
                  ))}
              </ul>

              <div className="flex gap-2">
                <Button
                  fullWidth
                  variant="bordered"
                  onPress={() => openEdit(plan)}
                  className="rounded-xl"
                >
                  <Pencil size={14} /> 編輯
                </Button>
                <Button
                  isIconOnly
                  variant="bordered"
                  color="danger"
                  onPress={() => openDeleteConfirm(plan.id)}
                  className="rounded-xl"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==================== 編輯 / 新增 Modal ==================== */}
      <Modal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        size="2xl"
        placement="center"
        scrollBehavior="inside"
        classNames={{ base: "bg-white rounded-2xl" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-lg font-semibold">
                {editingId ? "編輯方案" : "新增方案"}
              </ModalHeader>
              <ModalBody className="gap-5">
                <Input
                  label="方案名稱"
                  placeholder="例：創業啟航"
                  variant="bordered"
                  value={form.name}
                  onValueChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  classNames={{ inputWrapper: "rounded-xl" }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="價格"
                    type="number"
                    placeholder="留空表示免費"
                    variant="bordered"
                    value={form.price != null ? String(form.price) : ""}
                    onValueChange={(v) =>
                      setForm((f) => ({
                        ...f,
                        price: v === "" ? null : Number(v),
                      }))
                    }
                    classNames={{ inputWrapper: "rounded-xl" }}
                  />
                  <Input
                    label="原價"
                    type="number"
                    placeholder="選填"
                    variant="bordered"
                    value={
                      form.originalPrice != null
                        ? String(form.originalPrice)
                        : ""
                    }
                    onValueChange={(v) =>
                      setForm((f) => ({
                        ...f,
                        originalPrice: v === "" ? null : Number(v),
                      }))
                    }
                    classNames={{ inputWrapper: "rounded-xl" }}
                  />
                </div>
                <Input
                  label="計費週期"
                  placeholder="例：/ 月"
                  variant="bordered"
                  value={form.period ?? ""}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, period: v }))
                  }
                  classNames={{ inputWrapper: "rounded-xl" }}
                />
                <Textarea
                  label="方案描述"
                  placeholder="請輸入方案描述"
                  variant="bordered"
                  value={form.description ?? ""}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, description: v }))
                  }
                  minRows={2}
                  classNames={{ inputWrapper: "rounded-xl" }}
                />
                <Input
                  label="按鈕文字"
                  placeholder="例：立即開始"
                  variant="bordered"
                  value={form.ctaText ?? ""}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, ctaText: v }))
                  }
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
                    isSelected={form.isRecommended ?? false}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, isRecommended: v }))
                    }
                    size="sm"
                  >
                    <span className="text-sm">推薦方案</span>
                  </Switch>
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

                {/* 功能項目 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-700">
                      功能項目
                    </p>
                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                      onPress={addFeature}
                      className="rounded-lg"
                    >
                      <Plus size={14} /> 新增
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {form.features.map(
                      (feat: CreateUpdatePricingPlanFeatureDto, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 w-6 text-center shrink-0">
                            {i + 1}
                          </span>
                          <Input
                            size="sm"
                            variant="bordered"
                            placeholder="功能描述"
                            value={feat.text}
                            onValueChange={(v) => updateFeature(i, v)}
                            classNames={{ inputWrapper: "rounded-lg" }}
                          />
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => removeFeature(i)}
                          >
                            <Trash2 size={14} className="text-gray-400" />
                          </Button>
                        </div>
                      ),
                    )}
                    {form.features.length === 0 && (
                      <p className="text-sm text-gray-400 text-center py-3">
                        尚無功能項目
                      </p>
                    )}
                  </div>
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
                  確定要刪除這個方案嗎？此操作無法復原。
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
