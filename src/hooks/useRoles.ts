"use client";

import { useQuery } from "@tanstack/react-query";
import { roleService } from "@/services/roles";
import { queryKeys } from "@/hooks/query-keys";

/** 查詢角色列表 */
export function useRoleList() {
  return useQuery({
    queryKey: queryKeys.roles.list(),
    queryFn: () => roleService.getList(),
  });
}
