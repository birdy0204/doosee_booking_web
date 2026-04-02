"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import { InputOtp } from "@heroui/input-otp";
import { useCreateFormSubmission } from "@/hooks/useFormSubmissions";
import { FormSource } from "@/types/api";

// ==================== 表單驗證 ====================

const step1Schema = z.object({
  salonName: z.string().optional(),
  name: z.string().min(1, "請輸入您的姓名"),
  service: z.string().min(1, "請選擇諮詢服務"),
});

const step2Schema = z
  .object({
    verifyMethod: z.enum(["email", "phone"]),
    email: z.string().optional(),
    phone: z.string().optional(),
    verifyCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.verifyMethod === "email") {
      if (!data.email) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "請輸入 Email", path: ["email"] });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Email 格式不正確", path: ["email"] });
      }
    }
    if (data.verifyMethod === "phone") {
      if (!data.phone) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "請輸入手機號碼", path: ["phone"] });
      } else if (!/^09\d{8}$/.test(data.phone)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "請輸入正確的手機號碼（09 開頭共 10 碼）", path: ["phone"] });
      }
    }
    if (!data.verifyCode) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "請輸入驗證碼", path: ["verifyCode"] });
    }
  });

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

const serviceOptions = [
  { key: "booking", label: "預約管理" },
  { key: "report", label: "報表分析" },
  { key: "multi-store", label: "多門市管理" },
  { key: "other", label: "其他" },
];

// ==================== 元件 ====================

interface ContactFormModalProps {
  children: (onOpen: () => void) => React.ReactNode;
}

export default function ContactFormModal({ children }: ContactFormModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const createFormSubmission = useCreateFormSubmission();
  const [step, setStep] = useState<1 | 2>(1);
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sendingCode, setSendingCode] = useState(false);

  // 步驟一表單
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { salonName: "", name: "", service: "" },
  });

  // 步驟二表單
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { verifyMethod: "email", email: "", phone: "", verifyCode: "" },
  });

  const verifyMethod = step2Form.watch("verifyMethod");

  // 倒計時
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // 切換驗證方式時重置驗證碼狀態
  useEffect(() => {
    setCodeSent(false);
    setCountdown(0);
    step2Form.setValue("verifyCode", "");
  }, [verifyMethod, step2Form]);

  // 發送驗證碼
  const handleSendCode = useCallback(async () => {
    // 先驗證對應欄位
    const field = verifyMethod === "email" ? "email" : "phone";
    const valid = await step2Form.trigger(field);
    if (!valid) return;

    setSendingCode(true);
    try {
      // TODO: 串接發送驗證碼 API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCodeSent(true);
      setCountdown(60);
    } finally {
      setSendingCode(false);
    }
  }, [verifyMethod, step2Form]);

  // 步驟一：驗證後進入步驟二
  const handleNext = async () => {
    const valid = await step1Form.trigger();
    if (valid) setStep(2);
  };

  // 步驟二：送出
  const handleSubmitForm = async (step2Data: Step2Data) => {
    const step1Data = step1Form.getValues();
    try {
      await createFormSubmission.mutateAsync({
        name: step1Data.name,
        salonName: step1Data.salonName || undefined,
        service: step1Data.service || undefined,
        email: step2Data.verifyMethod === "email" ? step2Data.email! : "",
        phone: step2Data.verifyMethod === "phone" ? step2Data.phone! : undefined,
        source: FormSource.Website,
      });
      resetAll();
      onOpenChange();
    } catch {
      // 錯誤已在 hook 內透過 toast 處理
    }
  };

  const resetAll = () => {
    step1Form.reset();
    step2Form.reset();
    setStep(1);
    setCodeSent(false);
    setCountdown(0);
  };

  // Modal 關閉時重置
  const handleOpenChange = (open: boolean) => {
    if (!open) resetAll();
    onOpenChange();
  };

  return (
    <>
      {children(onOpen)}

      <Modal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        placement="center"
        backdrop="blur"
        size="lg"
        isDismissable={false}
        classNames={{
          base: "bg-white dark:bg-zinc-900",
          header: "border-b border-zinc-100 dark:border-zinc-800",
          footer: "border-t border-zinc-100 dark:border-zinc-800",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold">免費諮詢</h3>
                  <span className="text-xs text-zinc-400 font-normal">
                    步驟 {step} / 2
                  </span>
                </div>
                <p className="text-sm text-zinc-500 font-normal">
                  {step === 1
                    ? "留下您的資料，專屬顧問將在 24 小時內與您聯繫"
                    : "請選擇您偏好的驗證方式"}
                </p>
              </ModalHeader>

              {step === 1 ? (
                <>
                  <ModalBody className="gap-5 py-6">
                    <Input
                      label="店家名稱"
                      placeholder="例：FLUX Hair Salon"
                      variant="bordered"
                      {...step1Form.register("salonName")}
                      isInvalid={!!step1Form.formState.errors.salonName}
                      errorMessage={step1Form.formState.errors.salonName?.message}
                      description="選填"
                    />

                    <Input
                      label="聯絡人姓名"
                      placeholder="請輸入您的姓名"
                      variant="bordered"
                      isRequired
                      {...step1Form.register("name")}
                      isInvalid={!!step1Form.formState.errors.name}
                      errorMessage={step1Form.formState.errors.name?.message}
                    />

                    <Controller
                      name="service"
                      control={step1Form.control}
                      render={({ field }) => (
                        <Select
                          label="諮詢服務"
                          placeholder="請選擇諮詢項目"
                          variant="bordered"
                          selectedKeys={field.value ? new Set([field.value]) : new Set()}
                          onSelectionChange={(keys) => {
                            const selected = Array.from(keys)[0] as string;
                            field.onChange(selected ?? "");
                          }}
                          classNames={{ trigger: "rounded-xl" }}
                          isRequired
                          isInvalid={!!step1Form.formState.errors.service}
                          errorMessage={step1Form.formState.errors.service?.message}
                        >
                          {serviceOptions.map((opt) => (
                            <SelectItem key={opt.key}>{opt.label}</SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button variant="light" onPress={onClose}>
                      取消
                    </Button>
                    <Button
                      type="button"
                      color="primary"
                      className="bg-primary font-semibold"
                      onPress={handleNext}
                    >
                      下一步
                    </Button>
                  </ModalFooter>
                </>
              ) : (
                <form onSubmit={step2Form.handleSubmit(handleSubmitForm)}>
                  <ModalBody className="gap-5 py-6">
                    <Controller
                      name="verifyMethod"
                      control={step2Form.control}
                      render={({ field }) => (
                        <Select
                          label="驗證方式"
                          variant="bordered"
                          selectedKeys={new Set([field.value])}
                          onSelectionChange={(keys) => {
                            const selected = Array.from(keys)[0] as "email" | "phone";
                            if (selected) field.onChange(selected);
                          }}
                          classNames={{ trigger: "rounded-xl" }}
                        >
                          <SelectItem key="email">信箱驗證</SelectItem>
                          <SelectItem key="phone">手機驗證</SelectItem>
                        </Select>
                      )}
                    />

                    {verifyMethod === "email" ? (
                      <Input
                        label="電子信箱"
                        placeholder="your@email.com"
                        type="email"
                        variant="bordered"
                        isRequired
                        {...step2Form.register("email")}
                        isInvalid={!!step2Form.formState.errors.email}
                        errorMessage={step2Form.formState.errors.email?.message}
                        endContent={
                          <Button
                            type="button"
                            size="sm"
                            variant="flat"
                            color="primary"
                            isLoading={sendingCode}
                            isDisabled={countdown > 0}
                            onPress={handleSendCode}
                            className="shrink-0 font-medium"
                          >
                            {countdown > 0 ? `${countdown}s` : "發送驗證碼"}
                          </Button>
                        }
                      />
                    ) : (
                      <Input
                        label="手機號碼"
                        placeholder="0912345678"
                        type="tel"
                        variant="bordered"
                        isRequired
                        {...step2Form.register("phone")}
                        isInvalid={!!step2Form.formState.errors.phone}
                        errorMessage={step2Form.formState.errors.phone?.message}
                        endContent={
                          <Button
                            type="button"
                            size="sm"
                            variant="flat"
                            color="primary"
                            isLoading={sendingCode}
                            isDisabled={countdown > 0}
                            onPress={handleSendCode}
                            className="shrink-0 font-medium"
                          >
                            {countdown > 0 ? `${countdown}s` : "發送驗證碼"}
                          </Button>
                        }
                      />
                    )}

                    {codeSent && (
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 self-start">
                          驗證碼 <span className="text-danger">*</span>
                        </p>
                        <Controller
                          name="verifyCode"
                          control={step2Form.control}
                          render={({ field }) => (
                            <InputOtp
                              length={4}
                              value={field.value ?? ""}
                              onValueChange={field.onChange}
                              isInvalid={!!step2Form.formState.errors.verifyCode}
                              errorMessage={step2Form.formState.errors.verifyCode?.message}
                              size="lg"
                            />
                          )}
                        />
                      </div>
                    )}
                  </ModalBody>

                  <ModalFooter>
                    <Button type="button" variant="light" onPress={() => setStep(1)}>
                      上一步
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      isLoading={step2Form.formState.isSubmitting}
                      isDisabled={!codeSent}
                      className="bg-primary font-semibold"
                    >
                      送出諮詢
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
