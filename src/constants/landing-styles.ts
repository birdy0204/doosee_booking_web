/**
 * Landing Page 樣式常數
 * 集中管理前台頁面的字體大小與顏色，修改此檔即可全站生效
 */

// ==================== 字體大小 ====================

export const fontSize = {
  /** 主標題 — Hero 區塊的大標 */
  hero: "text-7xl md:text-8xl lg:text-[120px]",
  /** 章節標題 — 各 section 的主標題 */
  sectionTitle: "text-6xl md:text-7xl lg:text-8xl",
  /** 卡片標題 — 平台卡片等中型標題 */
  cardTitle: "text-6xl md:text-7xl lg:text-8xl",
  /** 小標題 — 功能卡片等 */
  subtitle: "text-[40px]",
  /** 內文大 — 副標題、描述文字 */
  bodyLg: "text-4xl md:text-[40px]",
  /** 內文 — 一般段落 */
  body: "text-[32px]",
  /** 標籤 — tag、badge、小型文字 */
  tag: "text-[28px] md:text-[32px]",
  /** 按鈕文字 */
  button: "text-4xl",
  /** 頁尾標題 */
  footerTitle: "text-5xl",
  /** 頁尾副標題 */
  footerSubtitle: "text-[32px]",
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
