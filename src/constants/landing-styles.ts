/**
 * Landing Page 樣式常數
 * 集中管理前台頁面的字體大小、顏色與共用參數，修改此檔即可全站生效
 */

// ==================== 共用常數 ====================

/** Logo 掉落動畫的 ScrollTrigger 結束位置（Header 與 DooseeLogo 共用） */
export const LOGO_SCROLL_END = "150 top";

/** 前台 layout 主容器 ID（MenuOverlay 需要存取此元素做推移動畫） */
export const PAGE_CONTENT_ID = "page-content";

// ==================== 字體大小 ====================

export const fontSize = {
  /** 主標題 — Hero 區塊的大標 */
  hero: "text-6xl md:text-7xl lg:text-[100px]",
  /** 章節標題 — 各 section 的主標題（最大） */
  sectionTitle: "text-6xl md:text-7xl lg:text-8xl",
  /** 大型章節標題 — JoinUs 等中大型 section 標題 */
  headingXl: "text-4xl md:text-5xl lg:text-6xl",
  /** 中型章節標題 — WhatIsDoosee 等資訊型 section 標題 */
  headingLg: "text-2xl md:text-3xl lg:text-5xl",
  /** 卡片標題 — 平台卡片等中型標題 */
  cardTitle: "text-6xl md:text-7xl lg:text-8xl",
  /** 小標題 — 功能卡片等 */
  subtitle: "text-lg md:text-xl lg:text-2xl",
  /** 內文大 — 副標題、描述文字 */
  bodyLg: "text-base md:text-lg lg:text-xl",
  /** 內文 — 一般段落 */
  body: "text-base md:text-lg",
  /** 標籤 — tag、badge、小型文字 */
  tag: "text-sm md:text-base",
  /** 按鈕文字 */
  button: "text-base md:text-lg",
  /** 頁尾標題 */
  footerTitle: "text-2xl md:text-3xl",
  /** 頁尾副標題 */
  footerSubtitle: "text-base md:text-lg",
} as const;

// ==================== 顏色 ====================

export const textColor = {
  /** 深色背景上的主要文字 */
  onDark: "text-white",
  /** 深色背景上的次要文字 */
  onDarkMuted: "text-white/80",
  /** 淺色背景上的主要文字 */
  onLight: "text-foreground",
  /** 淺色背景上的次要文字 */
  onLightMuted: "text-muted-foreground",
} as const;
