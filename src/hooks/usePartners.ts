"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { partnerService } from "@/services/partners";
import { queryKeys } from "@/hooks/query-keys";
import type { CreateUpdatePartnerDto, PagedRequestDto } from "@/types/api";

/** 查詢合作夥伴列表 */
export function usePartnerList(params?: PagedRequestDto) {
  return useQuery({
    queryKey: queryKeys.partners.list(params as Record<string, unknown>),
    queryFn: () => partnerService.getList(params),
  });
}

/** 查詢單筆合作夥伴 */
export function usePartnerDetail(id: string | null) {
  return useQuery({
    queryKey: queryKeys.partners.detail(id!),
    queryFn: () => partnerService.get(id!),
    enabled: !!id,
  });
}

/** 新增合作夥伴 */
export function useCreatePartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUpdatePartnerDto) => partnerService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.partners.all });
      toast.success("合作夥伴已新增");
    },
    onError: () => {
      toast.error("新增失敗，請稍後再試");
    },
  });
}

/** 更新合作夥伴 */
export function useUpdatePartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CreateUpdatePartnerDto;
    }) => partnerService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.partners.all });
      toast.success("合作夥伴已更新");
    },
    onError: () => {
      toast.error("更新失敗，請稍後再試");
    },
  });
}

/** 刪除合作夥伴 */
export function useDeletePartner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => partnerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.partners.all });
      toast.success("合作夥伴已刪除");
    },
    onError: () => {
      toast.error("刪除失敗，請稍後再試");
    },
  });
}
