import { apiClient } from "@/lib/api-client";
import type { RoleDto, PagedResultDto } from "@/types/api";

const BASE = "/api/roles";

export const roleService = {
  /** 查詢角色列表 */
  getList: () => apiClient.get<PagedResultDto<RoleDto>>(BASE),
};
