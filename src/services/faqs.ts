import { apiClient } from "@/lib/api-client";
import type {
  FaqDto,
  CreateUpdateFaqDto,
  PagedResultDto,
  PagedRequestDto,
} from "@/types/api";

const BASE = "/api/app/faq";

export const faqService = {
  /** 查詢列表（公開） */
  getList: (params?: PagedRequestDto) =>
    apiClient.get<PagedResultDto<FaqDto>>(
      BASE,
      params as Record<string, unknown>,
    ),

  /** 查詢單筆 */
  get: (id: string) => apiClient.get<FaqDto>(`${BASE}/${id}`),

  /** 新增（需認證：admin, editor） */
  create: (data: CreateUpdateFaqDto) =>
    apiClient.post<FaqDto>(BASE, data),

  /** 更新（需認證：admin, editor） */
  update: (id: string, data: CreateUpdateFaqDto) =>
    apiClient.put<FaqDto>(`${BASE}/${id}`, data),

  /** 刪除（需認證：僅 admin） */
  delete: (id: string) => apiClient.delete<void>(`${BASE}/${id}`),
};
