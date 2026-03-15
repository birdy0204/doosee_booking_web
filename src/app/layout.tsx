import type { Metadata } from "next";
import "@/index.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Doosee — 美業數位化平台",
  description:
    "陪伴美業人，用數位化完成夢想。從預約管理到品牌經營，提供完整的解決方案。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
