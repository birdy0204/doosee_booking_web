"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { faqService } from "@/services/faqs";
import { queryKeys } from "@/hooks/query-keys";
import type { CreateUpdateFaqDto, PagedRequestDto } from "@/types/api";

/** 查詢 FAQ 列表 */
export function useFaqList(params?: PagedRequestDto) {
  return useQuery({
    queryKey: queryKeys.faqs.list(params as Record<string, unknown>),
    queryFn: () => faqService.getList(params),
  });
}

/** 查詢單筆 FAQ */
export function useFaqDetail(id: string | null) {
  return useQuery({
    queryKey: queryKeys.faqs.detail(id!),
    queryFn: () => faqService.get(id!),
    enabled: !!id,
  });
}

/** 新增 FAQ */
export function useCreateFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUpdateFaqDto) => faqService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.faqs.all });
      toast.success("常見問題已新增");
    },
    onError: () => {
      toast.error("新增失敗，請稍後再試");
    },
  });
}

/** 更新 FAQ */
export function useUpdateFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateUpdateFaqDto }) =>
      faqService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.faqs.all });
      toast.success("常見問題已更新");
    },
    onError: () => {
      toast.error("更新失敗，請稍後再試");
    },
  });
}

/** 刪除 FAQ */
export function useDeleteFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => faqService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.faqs.all });
      toast.success("常見問題已刪除");
    },
    onError: () => {
      toast.error("刪除失敗，請稍後再試");
    },
  });
}
