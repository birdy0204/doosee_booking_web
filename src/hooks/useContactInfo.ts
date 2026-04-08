"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { contactInfoService } from "@/services/contact-info";
import { queryKeys } from "@/hooks/query-keys";
import type { UpdateContactInfoDto } from "@/types/api";

/** 查詢聯絡資訊 */
export function useContactInfo() {
  return useQuery({
    queryKey: queryKeys.contactInfo.detail(),
    queryFn: () => contactInfoService.get(),
  });
}

/** 更新聯絡資訊 */
export function useUpdateContactInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateContactInfoDto) =>
      contactInfoService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contactInfo.all });
      toast.success("聯絡資訊已更新");
    },
    onError: () => {
      toast.error("更新失敗，請稍後再試");
    },
  });
}
