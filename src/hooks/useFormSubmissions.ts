"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formSubmissionService } from "@/services/form-submissions";
import { queryKeys } from "@/hooks/query-keys";
import type {
  CreateFormSubmissionDto,
  UpdateFormSubmissionDto,
  PagedRequestDto,
} from "@/types/api";

/** 查詢表單列表 */
export function useFormSubmissionList(params?: PagedRequestDto) {
  return useQuery({
    queryKey: queryKeys.formSubmissions.list(
      params as Record<string, unknown>,
    ),
    queryFn: () => formSubmissionService.getList(params),
  });
}

/** 查詢單筆表單 */
export function useFormSubmissionDetail(id: string | null) {
  return useQuery({
    queryKey: queryKeys.formSubmissions.detail(id!),
    queryFn: () => formSubmissionService.get(id!),
    enabled: !!id,
  });
}

/** 前台提交諮詢表單 */
export function useCreateFormSubmission() {
  return useMutation({
    mutationFn: (data: CreateFormSubmissionDto) =>
      formSubmissionService.create(data),
    onSuccess: () => {
      toast.success("諮詢表單已送出，我們將盡快與您聯繫！");
    },
    onError: () => {
      toast.error("送出失敗，請稍後再試");
    },
  });
}

/** 後台更新表單狀態/備註 */
export function useUpdateFormSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateFormSubmissionDto;
    }) => formSubmissionService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.formSubmissions.all,
      });
      toast.success("表單狀態已更新");
    },
    onError: () => {
      toast.error("更新失敗，請稍後再試");
    },
  });
}

/** 後台刪除表單 */
export function useDeleteFormSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => formSubmissionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.formSubmissions.all,
      });
      toast.success("表單已刪除");
    },
    onError: () => {
      toast.error("刪除失敗，請稍後再試");
    },
  });
}
