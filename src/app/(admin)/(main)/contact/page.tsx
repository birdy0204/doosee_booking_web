"use client";

import { useEffect, useState } from "react";
import { Phone, ImageIcon } from "lucide-react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import { useContactInfo, useUpdateContactInfo } from "@/hooks/useContactInfo";
import type { UpdateContactInfoDto } from "@/types/api";

// ==================== 主元件 ====================

export default function ContactPage() {
  const { data, isLoading } = useContactInfo();
  const updateMutation = useUpdateContactInfo();

  const [form, setForm] = useState<UpdateContactInfoDto>({
    email: "",
    phone: "",
    address: "",
    facebook: "",
    instagram: "",
    line: "",
  });

  // 資料載入後填入表單
  useEffect(() => {
    if (data) {
      setForm({
        email: data.email,
        phone: data.phone,
        address: data.address,
        facebook: data.facebook,
        instagram: data.instagram,
        line: data.line,
      });
    }
  }, [data]);

  const handleSave = async () => {
    await updateMutation.mutateAsync(form);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 標題 */}
      <div>
        <h1 className="text-2xl font-bold">聯絡資訊</h1>
        <p className="text-sm text-gray-400 mt-1">
          管理前台網站的聯絡方式與社群連結
        </p>
      </div>

      {/* 表單 */}
      <div className="max-w-2xl">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Phone size={18} className="text-blue-500" /> 聯絡資訊
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="聯絡信箱"
              variant="bordered"
              value={form.email}
              onValueChange={(v) => setForm((f) => ({ ...f, email: v }))}
              classNames={{ inputWrapper: "rounded-xl" }}
            />
            <Input
              label="聯絡電話"
              variant="bordered"
              value={form.phone}
              onValueChange={(v) => setForm((f) => ({ ...f, phone: v }))}
              classNames={{ inputWrapper: "rounded-xl" }}
            />
          </div>
          <Input
            label="地址"
            variant="bordered"
            value={form.address}
            onValueChange={(v) => setForm((f) => ({ ...f, address: v }))}
            classNames={{ inputWrapper: "rounded-xl" }}
          />

          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pt-4">
            <ImageIcon size={18} className="text-blue-500" /> 社群連結
          </h3>
          <div className="space-y-4">
            <Input
              label="Facebook"
              variant="bordered"
              value={form.facebook}
              onValueChange={(v) => setForm((f) => ({ ...f, facebook: v }))}
              classNames={{ inputWrapper: "rounded-xl" }}
            />
            <Input
              label="Instagram"
              variant="bordered"
              value={form.instagram}
              onValueChange={(v) => setForm((f) => ({ ...f, instagram: v }))}
              classNames={{ inputWrapper: "rounded-xl" }}
            />
            <Input
              label="LINE"
              variant="bordered"
              value={form.line}
              onValueChange={(v) => setForm((f) => ({ ...f, line: v }))}
              classNames={{ inputWrapper: "rounded-xl" }}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onPress={handleSave}
              isLoading={updateMutation.isPending}
              className="bg-blue-500 text-white rounded-xl px-6 h-10 font-medium hover:bg-blue-600"
            >
              儲存變更
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
