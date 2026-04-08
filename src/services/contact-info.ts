import { apiClient } from "@/lib/api-client";
import type { ContactInfoDto, UpdateContactInfoDto } from "@/types/api";

const BASE = "/api/app/contact-info";

export const contactInfoService = {
  /** 查詢聯絡資訊（公開） */
  get: () => apiClient.get<ContactInfoDto>(BASE),

  /** 更新聯絡資訊（需認證：admin, editor） */
  update: (data: UpdateContactInfoDto) =>
    apiClient.put<ContactInfoDto>(BASE, data),
};
