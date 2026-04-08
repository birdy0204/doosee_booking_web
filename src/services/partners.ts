import { apiClient } from "@/lib/api-client";
import type {
  PartnerDto,
  CreateUpdatePartnerDto,
  PagedResultDto,
  PagedRequestDto,
} from "@/types/api";

const BASE = "/api/app/partner";

export const partnerService = {
  /** 查詢列表（公開） */
  getList: (params?: PagedRequestDto) =>
    apiClient.get<PagedResultDto<PartnerDto>>(
      BASE,
      params as Record<string, unknown>,
    ),

  /** 查詢單筆 */
  get: (id: string) => apiClient.get<PartnerDto>(`${BASE}/${id}`),

  /** 新增（需認證：admin, editor） */
  create: (data: CreateUpdatePartnerDto) =>
    apiClient.post<PartnerDto>(BASE, data),

  /** 更新（需認證：admin, editor） */
  update: (id: string, data: CreateUpdatePartnerDto) =>
    apiClient.put<PartnerDto>(`${BASE}/${id}`, data),

  /** 刪除（需認證：僅 admin） */
  delete: (id: string) => apiClient.delete<void>(`${BASE}/${id}`),
};
