import { apiClient } from "@/lib/api-client";
import type { LoginDto, LoginResultDto, CurrentUserDto } from "@/types/api";

export const authService = {
  /** 登入取得 JWT Token */
  login: (data: LoginDto) =>
    apiClient.post<LoginResultDto>("/api/auth/login", data),

  /** 取得目前登入使用者資訊 */
  me: () => apiClient.get<CurrentUserDto>("/api/auth/me"),
};
