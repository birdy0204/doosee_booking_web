"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { pricingPlanService } from "@/services/pricing-plans";
import { queryKeys } from "@/hooks/query-keys";
import type {
  CreateUpdatePricingPlanDto,
  PagedRequestDto,
} from "@/types/api";

/** 查詢方案定價列表 */
export function usePricingPlanList(params?: PagedRequestDto) {
  return useQuery({
    queryKey: queryKeys.pricingPlans.list(params as Record<string, unknown>),
    queryFn: () => pricingPlanService.getList(params),
  });
}

/** 查詢單筆方案定價（含功能項目） */
export function usePricingPlanDetail(id: string | null) {
  return useQuery({
    queryKey: queryKeys.pricingPlans.detail(id!),
    queryFn: () => pricingPlanService.get(id!),
    enabled: !!id,
  });
}

/** 新增方案定價 */
export function useCreatePricingPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUpdatePricingPlanDto) =>
      pricingPlanService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pricingPlans.all });
      toast.success("方案定價已新增");
    },
    onError: () => {
      toast.error("新增失敗，請稍後再試");
    },
  });
}

/** 更新方案定價 */
export function useUpdatePricingPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CreateUpdatePricingPlanDto;
    }) => pricingPlanService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pricingPlans.all });
      toast.success("方案定價已更新");
    },
    onError: () => {
      toast.error("更新失敗，請稍後再試");
    },
  });
}

/** 刪除方案定價 */
export function useDeletePricingPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pricingPlanService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pricingPlans.all });
      toast.success("方案定價已刪除");
    },
    onError: () => {
      toast.error("刪除失敗，請稍後再試");
    },
  });
}
