import { redirect } from "next/navigation";

// 合作夥伴管理已整合至客戶見證頁面
export default function PartnersPage() {
  redirect("/testimonials");
}
