# Doosee Booking Web — 開發規範

## 專案概述

Doosee 美容業軟體產品介紹網站，包含：

- **前台（產品介紹網站）**：面向潛在客戶的公開網站，用於展示 Doosee 美容業軟體的產品功能、服務方案、客戶案例與品牌資訊。目標是讓訪客了解產品價值並引導諮詢或註冊。需要 SEO，使用 SSG/SSR 渲染。
- **後台（CMS 管理系統）**：供內部人員使用的管理介面，用於維護前台網站內容（如文案、圖片、方案資訊）、管理顧客諮詢表單資料、以及後續可能的數據報表功能。需登入才可存取，使用 Client-side 渲染。

## 技術架構

### 前端

- **框架**：Next.js 16（App Router）+ React 19
- **語言**：TypeScript
- **樣式**：Tailwind CSS + shadcn/ui（Radix UI 為底層）
- **狀態管理 / 資料請求**：TanStack React Query
- **表單**：React Hook Form + Zod 驗證
- **動畫**：GSAP + @gsap/react（使用 `useGSAP` hook，需搭配 `"use client"`）
- **平滑滾動**：Lenis（https://github.com/darkroomengineering/lenis）
- **路由**：Next.js App Router（Route Group 分離前後台）

### 渲染策略

| 頁面區塊 | 渲染方式 | 原因 |
|----------|---------|------|
| 前台（產品介紹、首頁） | SSG / SSR | 需要 SEO，讓搜尋引擎收錄 |
| 後台（CMS 管理） | Client-side（SPA） | 不需要 SEO，著重互動體驗 |

### 專案結構

```
src/app/
├── (public)/              ← 前台（產品介紹，SSG/SSR）
│   ├── page.tsx               ← 首頁
│   ├── about/page.tsx         ← 關於我們
│   └── features/page.tsx      ← 功能介紹
│
├── (admin)/               ← 後台（CMS，Client-side）
│   ├── layout.tsx             ← 後台共用版型
│   ├── dashboard/page.tsx
│   └── customers/page.tsx
│
└── layout.tsx             ← 根版型
```
