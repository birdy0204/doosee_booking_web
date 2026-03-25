"use client";

import { useForm } from "react-hook-form";
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

// ==================== 表單驗證 ====================

const contactFormSchema = z.object({
  salonName: z.string().optional(),
  name: z.string().min(1, "請輸入您的姓名"),
  email: z.string().min(1, "請輸入 Email").email("Email 格式不正確"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^09\d{8}$/.test(val), {
      message: "請輸入正確的手機號碼（09 開頭共 10 碼）",
    }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// ==================== 元件 ====================

interface ContactFormModalProps {
  children: (onOpen: () => void) => React.ReactNode;
}

export default function ContactFormModal({ children }: ContactFormModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      salonName: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // TODO: 串接 API
    console.log("表單送出：", data);
    // 模擬 API 請求
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
    onOpenChange();
  };

  return (
    <>
      {children(onOpen)}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        size="lg"
        classNames={{
          base: "bg-white dark:bg-zinc-900",
          header: "border-b border-zinc-100 dark:border-zinc-800",
          footer: "border-t border-zinc-100 dark:border-zinc-800",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">免費諮詢</h3>
                <p className="text-sm text-zinc-500 font-normal">
                  留下您的資料，專屬顧問將在 24 小時內與您聯繫
                </p>
              </ModalHeader>

              <ModalBody className="gap-5 py-6">
                <Input
                  label="店家名稱"
                  placeholder="例：FLUX Hair Salon"
                  variant="bordered"
                  {...register("salonName")}
                  isInvalid={!!errors.salonName}
                  errorMessage={errors.salonName?.message}
                  description="選填"
                />

                <Input
                  label="聯絡人姓名"
                  placeholder="請輸入您的姓名"
                  variant="bordered"
                  isRequired
                  {...register("name")}
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />

                <Input
                  label="電子信箱"
                  placeholder="your@email.com"
                  type="email"
                  variant="bordered"
                  isRequired
                  {...register("email")}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />

                <Input
                  label="手機號碼"
                  placeholder="0912345678"
                  type="tel"
                  variant="bordered"
                  {...register("phone")}
                  isInvalid={!!errors.phone}
                  errorMessage={errors.phone?.message}
                  description="選填"
                />
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="light"
                  onPress={onClose}
                >
                  取消
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isSubmitting}
                  className="bg-primary font-semibold"
                >
                  送出諮詢
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
