import { apiClient } from "@/lib/api-client";
import type {
  PricingPlanDto,
  CreateUpdatePricingPlanDto,
  PagedResultDto,
  PagedRequestDto,
} from "@/types/api";

const BASE = "/api/app/pricing-plan";

export const pricingPlanService = {
  /** 查詢列表（公開） */
  getList: (params?: PagedRequestDto) =>
    apiClient.get<PagedResultDto<PricingPlanDto>>(
      BASE,
      params as Record<string, unknown>,
    ),

  /** 查詢單筆（含巢狀 features） */
  get: (id: string) => apiClient.get<PricingPlanDto>(`${BASE}/${id}`),

  /** 新增（需認證：admin, editor） */
  create: (data: CreateUpdatePricingPlanDto) =>
    apiClient.post<PricingPlanDto>(BASE, data),

  /** 更新（需認證：admin, editor，features 一併巢狀更新） */
  update: (id: string, data: CreateUpdatePricingPlanDto) =>
    apiClient.put<PricingPlanDto>(`${BASE}/${id}`, data),

  /** 刪除（需認證：僅 admin） */
  delete: (id: string) => apiClient.delete<void>(`${BASE}/${id}`),
};
