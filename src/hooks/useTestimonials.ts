"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { testimonialService } from "@/services/testimonials";
import { queryKeys } from "@/hooks/query-keys";
import type {
  CreateUpdateTestimonialDto,
  PagedRequestDto,
} from "@/types/api";

/** 查詢客戶見證列表 */
export function useTestimonialList(params?: PagedRequestDto) {
  return useQuery({
    queryKey: queryKeys.testimonials.list(params as Record<string, unknown>),
    queryFn: () => testimonialService.getList(params),
  });
}

/** 查詢單筆客戶見證 */
export function useTestimonialDetail(id: string | null) {
  return useQuery({
    queryKey: queryKeys.testimonials.detail(id!),
    queryFn: () => testimonialService.get(id!),
    enabled: !!id,
  });
}

/** 新增客戶見證 */
export function useCreateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUpdateTestimonialDto) =>
      testimonialService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.testimonials.all });
      toast.success("客戶見證已新增");
    },
    onError: () => {
      toast.error("新增失敗，請稍後再試");
    },
  });
}

/** 更新客戶見證 */
export function useUpdateTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CreateUpdateTestimonialDto;
    }) => testimonialService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.testimonials.all });
      toast.success("客戶見證已更新");
    },
    onError: () => {
      toast.error("更新失敗，請稍後再試");
    },
  });
}

/** 刪除客戶見證 */
export function useDeleteTestimonial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => testimonialService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.testimonials.all });
      toast.success("客戶見證已刪除");
    },
    onError: () => {
      toast.error("刪除失敗，請稍後再試");
    },
  });
}
