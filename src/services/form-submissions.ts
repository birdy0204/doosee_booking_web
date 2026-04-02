import { apiClient } from "@/lib/api-client";
import type {
  FormSubmissionDto,
  CreateFormSubmissionDto,
  UpdateFormSubmissionDto,
  PagedResultDto,
  PagedRequestDto,
} from "@/types/api";

const BASE = "/api/app/form-submission";

export const formSubmissionService = {
  /** 查詢列表（需認證） */
  getList: (params?: PagedRequestDto) =>
    apiClient.get<PagedResultDto<FormSubmissionDto>>(
      BASE,
      params as Record<string, unknown>,
    ),

  /** 查詢單筆（需認證） */
  get: (id: string) => apiClient.get<FormSubmissionDto>(`${BASE}/${id}`),

  /** 前台訪客提交表單（不需認證） */
  create: (data: CreateFormSubmissionDto) =>
    apiClient.post<FormSubmissionDto>(BASE, data),

  /** 更新狀態/備註（需認證） */
  update: (id: string, data: UpdateFormSubmissionDto) =>
    apiClient.put<FormSubmissionDto>(`${BASE}/${id}`, data),

  /** 刪除（需認證） */
  delete: (id: string) => apiClient.delete<void>(`${BASE}/${id}`),
};
