import { apiClient } from "@/lib/api-client";
import type {
  TestimonialDto,
  CreateUpdateTestimonialDto,
  PagedResultDto,
  PagedRequestDto,
} from "@/types/api";

const BASE = "/api/app/testimonial";

export const testimonialService = {
  /** 查詢列表（公開） */
  getList: (params?: PagedRequestDto) =>
    apiClient.get<PagedResultDto<TestimonialDto>>(
      BASE,
      params as Record<string, unknown>,
    ),

  /** 查詢單筆 */
  get: (id: string) => apiClient.get<TestimonialDto>(`${BASE}/${id}`),

  /** 新增（需認證：admin, editor） */
  create: (data: CreateUpdateTestimonialDto) =>
    apiClient.post<TestimonialDto>(BASE, data),

  /** 更新（需認證：admin, editor） */
  update: (id: string, data: CreateUpdateTestimonialDto) =>
    apiClient.put<TestimonialDto>(`${BASE}/${id}`, data),

  /** 刪除（需認證：僅 admin） */
  delete: (id: string) => apiClient.delete<void>(`${BASE}/${id}`),
};
