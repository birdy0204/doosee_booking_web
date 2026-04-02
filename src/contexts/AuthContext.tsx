"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { tokenStorage } from "@/lib/api-client";
import { authService } from "@/services/auth";
import type { CurrentUserDto, LoginDto } from "@/types/api";

// ==================== Context 型別 ====================

interface AuthContextType {
  user: CurrentUserDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginDto) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// ==================== Provider ====================

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 啟動時檢查 token，取得使用者資訊
  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      setIsLoading(false);
      return;
    }
    authService
      .me()
      .then(setUser)
      .catch(() => tokenStorage.remove())
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(
    async (data: LoginDto) => {
      const result = await authService.login(data);
      tokenStorage.set(result.accessToken);
      const me = await authService.me();
      setUser(me);
      router.push("/dashboard");
    },
    [router],
  );

  const logout = useCallback(() => {
    tokenStorage.remove();
    setUser(null);
    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
