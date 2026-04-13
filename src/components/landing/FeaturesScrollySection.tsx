"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { fontSize, textColor } from "@/constants/landing-styles";

// ==================== 功能分類資料 ====================

interface Feature {
  /** 錨點 id，供 MenuOverlay hash 導向 */
  id: string;
  /** 大標題 */
  title: string;
  /** Chip 上的小分類標籤 */
  tag: string;
  /** 一段概述 */
  description: string;
  /** 功能點清單 */
  bullets: string[];
  /** 左側顯示的產品截圖 */
  image: string;
  /** 產品截圖 alt 文字 */
  imageAlt: string;
}

const features: Feature[] = [
  {
    id: "booking",
    title: "線上預約管理",
    tag: "Booking",
    description:
      "24 小時不打烊的自助預約系統，讓顧客隨時下單，沙龍端自動同步班表，再也不用在 LINE 訊息裡手動確認時段。",
    bullets: [
      "顧客自助線上預約，支援指定設計師與服務項目",
      "LINE / 簡訊自動提醒，降低爽約率",
      "設計師班表、休假、休息時段一眼掌握",
    ],
    image: "/Ipad_dashboard.png",
    imageAlt: "Doosee 線上預約管理畫面",
  },
  {
    id: "crm",
    title: "顧客關係經營",
    tag: "CRM",
    description:
      "每位顧客都有完整的消費檔案與偏好紀錄，從新客到忠實 VIP,系統自動分級、提醒關鍵時刻，讓每一次服務都更貼心。",
    bullets: [
      "完整顧客檔案：消費紀錄、偏好、過敏提醒",
      "自動會員分級與標籤，精準掌握客群",
      "生日、節日、回訪提醒，主動經營關係",
    ],
    image: "/Ipad_dashboard.png",
    imageAlt: "Doosee 顧客關係經營畫面",
  },
  {
    id: "marketing",
    title: "行銷自動化",
    tag: "Marketing",
    description:
      "把行銷流程交給 Doosee，依照顧客行為自動推播優惠、發券、再行銷，讓有限的人力專注服務，業績自動成長。",
    bullets: [
      "LINE 官方帳號雙向整合，一鍵群發或分眾",
      "優惠券、點數、儲值卡一站管理",
      "依消費習慣自動分眾推播，提升回訪率",
    ],
    image: "/Ipad_dashboard.png",
    imageAlt: "Doosee 行銷自動化畫面",
  },
  {
    id: "analytics",
    title: "營運數據分析",
    tag: "Analytics",
    description:
      "營收、顧客、服務、設計師績效一目瞭然。數據不再只是數字，而是讓你做對每一個經營決策的依據。",
    bullets: [
      "即時營收儀表板，月週日營收輕鬆比對",
      "顧客回流率、流失率分析，找出關鍵客群",
      "熱門服務 / 商品排行榜，優化方案配置",
    ],
    image: "/Ipad_dashboard.png",
    imageAlt: "Doosee 營運數據分析儀表板",
  },
  {
    id: "operations",
    title: "多分店與員工管理",
    tag: "Operations",
    description:
      "從單店到連鎖，Doosee 都能陪你一起成長。統一後台管理多分店、設計師業績抽成、員工權限與排班，把複雜留給系統。",
    bullets: [
      "多分店一站後台，跨店會員通用、資料同步",
      "設計師業績、抽成、獎金自動計算",
      "員工權限分級、請假排班、出勤紀錄",
    ],
    image: "/Ipad_dashboard.png",
    imageAlt: "Doosee 多分店與員工管理畫面",
  },
];

// ==================== 手機端功能（右側 sticky iPhone + 左側捲動文案） ====================

interface PhoneFeature {
  id: string;
  title: string;
  tag: string;
  description: string;
  bullets: string[];
}

const phoneFeatures: PhoneFeature[] = [
  {
    id: "stylist-app",
    title: "設計師端 App，走到哪都是你的行動櫃檯",
    tag: "Stylist App",
    description:
      "不用整天守在店內電腦前。Doosee 設計師 App 把當日行程、顧客資料、訊息回覆、結帳功能全部裝進你的手機，下班路上、出差途中都能繼續照顧你的客人。",
    bullets: [
      "當日預約行程與顧客備註一目瞭然",
      "顧客 LINE 私訊直接在 App 內回覆",
      "服務完成當場結帳，顧客不用排隊",
      "休假、調班、補班手機申請即時同步",
    ],
  },
  {
    id: "customer-experience",
    title: "顧客不用下載 App,在 LINE 裡就能完成預約",
    tag: "Customer Experience",
    description:
      "越是簡單的預約流程，顧客越願意上門。Doosee 讓顧客從熟悉的 LINE 或網頁直接預約，全程不到一分鐘，免下載、免註冊、免客服，把麻煩全部留給系統。",
    bullets: [
      "LINE 官方帳號內直接預約，零下載門檻",
      "即時顯示可預約時段，不怕撞期",
      "支援訂金、刷卡、行動支付多元付款",
      "預約成功、服務前自動提醒，降低爽約",
    ],
  },
  {
    id: "anywhere",
    title: "雲端即時同步，店內外、多裝置都一致",
    tag: "Anywhere",
    description:
      "iPad、電腦、手機同時登入不衝突。預約一有變動，每個裝置都會在幾秒內同步，不用擔心兩個店員同時收到同一筆預約、或忘了同步檔案搞丟顧客資料。",
    bullets: [
      "跨裝置即時同步，資料永遠一致",
      "雲端自動備份，手機摔壞資料不流失",
      "多分店共用後台，跨店調度零時差",
      "離線也能暫存操作，連線時自動上傳",
    ],
  },
];

// ==================== 主元件 ====================

// 左側 sticky 永遠顯示的主視覺（目前五個功能共用同一張，之後可替換）
const HERO_IMAGE = features[0].image;
const HERO_IMAGE_ALT = "Doosee 後台管理畫面";

const FeaturesScrollySection = () => {
  return (
    <section
      id="features-scrolly"
      className="relative bg-background"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* 頁面頂部：All Features 風格的標題 + 錨點膠囊導航 */}
        <div className="pt-24 lg:pt-32 pb-12 lg:pb-20 text-center max-w-4xl mx-auto">
          <h1
            className={`${fontSize.sectionTitle} font-bold ${textColor.onLight} tracking-tight mb-6`}
          >
            所有功能
          </h1>
          <p
            className={`${fontSize.bodyLg} ${textColor.onLightMuted} mb-10 lg:mb-14`}
          >
            一站掌握 Doosee 為美業打造的完整解決方案。
          </p>

          {/* 錨點膠囊：點擊平滑捲動到對應 feature 區塊 */}
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
            {features.map((feature) => (
              <a
                key={feature.id}
                href={`#${feature.id}`}
                className={`px-5 lg:px-6 py-2.5 lg:py-3 rounded-full bg-secondary ${textColor.onLight} font-bold ${fontSize.tag} hover:bg-primary hover:text-primary-foreground transition-colors duration-300`}
              >
                {feature.title}
              </a>
            ))}
          </div>
        </div>

        {/* 主體：左 sticky iPad、右捲動功能段落（類似首頁 FAQSection 版型） */}
        <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24 pb-24 lg:pb-32">
          {/* 左側：sticky 視覺區（手機版隱藏） */}
          <div className="hidden lg:block lg:w-1/2 shrink-0 lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-6rem)]">
            <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-10">
              <Image
                src={HERO_IMAGE}
                alt={HERO_IMAGE_ALT}
                width={1200}
                height={900}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* 右側：功能段落（會隨捲動自然往上移） */}
          <div className="flex-1 min-w-0">
            {features.map((feature, i) => (
              <article
                key={feature.id}
                id={feature.id}
                className="min-h-screen flex flex-col justify-center py-16 lg:py-24 scroll-mt-24"
              >
                {/* 行動裝置專用：每段上方顯示產品截圖 */}
                <div className="lg:hidden mb-8">
                  <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      width={1200}
                      height={900}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <p
                  className={`${fontSize.tag} text-primary uppercase tracking-[0.2em] font-semibold mb-4`}
                >
                  {String(i + 1).padStart(2, "0")} / {feature.tag}
                </p>
                <h2
                  className={`${fontSize.headingLg} font-bold ${textColor.onLight} tracking-tight mb-6`}
                >
                  {feature.title}
                </h2>
                <p
                  className={`${fontSize.bodyLg} ${textColor.onLightMuted} leading-relaxed mb-8`}
                >
                  {feature.description}
                </p>

                <ul className="flex flex-col gap-4">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                      </span>
                      <span className={`${fontSize.body} ${textColor.onLight} leading-relaxed`}>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* ==================== 鏡像 sticky：右側 iPhone 不動 + 左側文案滾動 ==================== */}
        <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24 pb-24 lg:pb-32">
          {/* 左側：功能段落（會隨捲動自然往上移） */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            {phoneFeatures.map((feature, i) => (
              <article
                key={feature.id}
                id={feature.id}
                className="min-h-screen flex flex-col justify-center py-16 lg:py-24 scroll-mt-24"
              >
                {/* 行動裝置專用：每段上方顯示 iPhone */}
                <div className="lg:hidden mb-8 flex items-center justify-center">
                  <Image
                    src="/iPhone_stylist.png"
                    alt="Doosee 設計師端 App 畫面"
                    width={800}
                    height={1600}
                    className="w-full max-w-[240px] h-auto object-contain"
                  />
                </div>

                <p
                  className={`${fontSize.tag} text-primary uppercase tracking-[0.2em] font-semibold mb-4`}
                >
                  {String(i + 1).padStart(2, "0")} / {feature.tag}
                </p>
                <h2
                  className={`${fontSize.headingLg} font-bold ${textColor.onLight} tracking-tight mb-6`}
                >
                  {feature.title}
                </h2>
                <p
                  className={`${fontSize.bodyLg} ${textColor.onLightMuted} leading-relaxed mb-8`}
                >
                  {feature.description}
                </p>

                <ul className="flex flex-col gap-4">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                      </span>
                      <span className={`${fontSize.body} ${textColor.onLight} leading-relaxed`}>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {/* 右側：sticky iPhone 視覺區（手機版隱藏） */}
          <div className="hidden lg:block lg:w-1/2 shrink-0 lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-6rem)] order-1 lg:order-2">
            <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-10">
              <Image
                src="/iPhone_stylist.png"
                alt="Doosee 設計師端 App 畫面"
                width={800}
                height={1600}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesScrollySection;
