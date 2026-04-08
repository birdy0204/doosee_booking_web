"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userService } from "@/services/users";
import { queryKeys } from "@/hooks/query-keys";
import type {
  CreateUserDto,
  UpdateUserDto,
  PagedRequestDto,
} from "@/types/api";

/** 查詢使用者列表 */
export function useUserList(params?: PagedRequestDto) {
  return useQuery({
    queryKey: queryKeys.users.list(params as Record<string, unknown>),
    queryFn: () => userService.getList(params),
  });
}

/** 查詢單一使用者 */
export function useUserDetail(id: string | null) {
  return useQuery({
    queryKey: queryKeys.users.detail(id!),
    queryFn: () => userService.get(id!),
    enabled: !!id,
  });
}

/** 新增使用者 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDto) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success("使用者已新增");
    },
    onError: () => {
      toast.error("新增失敗，請稍後再試");
    },
  });
}

/** 更新使用者 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      userService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success("使用者已更新");
    },
    onError: () => {
      toast.error("更新失敗，請稍後再試");
    },
  });
}

/** 刪除使用者 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success("使用者已刪除");
    },
    onError: () => {
      toast.error("刪除失敗，請稍後再試");
    },
  });
}
