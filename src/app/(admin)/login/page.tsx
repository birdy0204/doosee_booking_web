"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

// ==================== 表單驗證 ====================

const loginSchema = z.object({
  email: z.string().min(1, "請輸入 Email").email("Email 格式不正確"),
  password: z.string().min(1, "請輸入密碼"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ==================== 主元件 ====================

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "admin@doosee.com", password: "Doosee@123" },
  });

  // 已登入時跳轉
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [authLoading, isAuthenticated, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({ email: data.email!, password: data.password! });
    } catch {
      toast.error("登入失敗，請確認帳號密碼");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="flex h-[85vh] w-full max-w-[1800px] overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* 左側視覺區塊 */}
        <div className="hidden w-1/2 flex-col justify-between bg-blue-500 p-12 lg:flex">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/doosee-logo.png" alt="Doosee Logo" width={40} height={40} className="rounded-lg" />
              <span className="text-lg font-semibold text-white">歡迎回來！</span>
            </div>
            <p className="mt-10 text-3xl leading-relaxed font-medium text-white/90">
              陪伴美業人，用數位化<br />完成夢想
            </p>
          </div>
          <div className="mt-auto flex items-end justify-center">
            <div className="flex items-end gap-3 text-white/30">
              <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[280px]">
                <rect x="40" y="20" width="240" height="150" rx="8" fill="white" fillOpacity="0.15" />
                <rect x="55" y="35" width="50" height="16" rx="4" fill="white" fillOpacity="0.3" />
                <rect x="115" y="35" width="50" height="16" rx="4" fill="white" fillOpacity="0.3" />
                <rect x="175" y="35" width="50" height="16" rx="4" fill="white" fillOpacity="0.3" />
                <rect x="235" y="35" width="35" height="16" rx="4" fill="white" fillOpacity="0.3" />
                <rect x="55" y="60" width="50" height="35" rx="4" fill="white" fillOpacity="0.2" />
                <rect x="55" y="100" width="50" height="35" rx="4" fill="#FCD34D" fillOpacity="0.5" />
                <rect x="115" y="60" width="50" height="35" rx="4" fill="#818CF8" fillOpacity="0.5" />
                <rect x="175" y="60" width="50" height="35" rx="4" fill="white" fillOpacity="0.2" />
                <ellipse cx="160" cy="190" rx="100" ry="8" fill="white" fillOpacity="0.1" />
              </svg>
            </div>
          </div>
        </div>

        {/* 右側登入表單 */}
        <div className="flex w-full flex-col justify-center px-8 py-12 md:w-1/2 md:px-12">
          <h1 className="mb-8 text-center text-xl font-semibold text-gray-900">歡迎登入</h1>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  label="Email"
                  type="email"
                  placeholder="youliaosucai@hotmail.com"
                  variant="bordered"
                  classNames={{ inputWrapper: "rounded-xl" }}
                  value={field.value}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  label="密碼"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  variant="bordered"
                  classNames={{ inputWrapper: "rounded-xl" }}
                  value={field.value}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 transition-colors">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  }
                />
              )}
            />

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                記住我
              </label>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-700">忘記密碼？</Link>
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full h-12 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600"
            >
              立即登入
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            還沒有帳號？{" "}
            <Link href="#" className="font-medium text-blue-500 hover:text-blue-500-hover">去註冊</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
