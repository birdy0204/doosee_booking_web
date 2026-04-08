import { apiClient } from "@/lib/api-client";
import type {
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  PagedResultDto,
  PagedRequestDto,
} from "@/types/api";

const BASE = "/api/users";

export const userService = {
  /** 查詢使用者列表 */
  getList: (params?: PagedRequestDto) =>
    apiClient.get<PagedResultDto<UserDto>>(
      BASE,
      params as Record<string, unknown>,
    ),

  /** 查詢單一使用者 */
  get: (id: string) => apiClient.get<UserDto>(`${BASE}/${id}`),

  /** 新增使用者 */
  create: (data: CreateUserDto) => apiClient.post<UserDto>(BASE, data),

  /** 更新使用者 */
  update: (id: string, data: UpdateUserDto) =>
    apiClient.put<UserDto>(`${BASE}/${id}`, data),

  /** 刪除使用者 */
  delete: (id: string) => apiClient.delete<void>(`${BASE}/${id}`),
};
