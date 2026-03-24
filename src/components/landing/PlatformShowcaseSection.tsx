"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, Smartphone, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fontSize, textColor } from "@/constants/landing-styles";

gsap.registerPlugin(ScrollTrigger);

// ==================== 平台資料 ====================

interface PlatformData {
  title: string;
  subtitle?: string;
  description: string;
  icon: LucideIcon;
  images?: string[];
  image?: string;
  gradient: string;
  features: string[];
}

const platforms: PlatformData[] = [
  {
    title: "POS 系統",
    subtitle: "一站滿足美業門店的所有營運需求。",
    description:
      "為美業門店量身打造的智慧收銀與營運管理系統，從預約到結帳一氣呵成。",
    icon: Monitor,
    images: ["/Ipad_dashboard.png", "/ipad_calender.png", "/ipad_inventory.png"],
    gradient: "from-orange-400 to-amber-500",
    features: ["預約排程", "多元支付", "庫存追蹤", "營收報表"],
  },
  {
    title: "設計師 APP",
    subtitle: "掌握自己的節奏，輕鬆管理一切。",
    description:
      "讓每位設計師掌握自己的節奏，輕鬆管理排班、業績與顧客關係。",
    icon: Smartphone,
    image: "/iPhone_stylist.png",
    gradient: "from-violet-400 to-purple-500",
    features: ["個人排班", "業績追蹤", "顧客偏好", "作品集展示"],
  },
  {
    title: "客戶端 APP",
    subtitle: "最順暢的預約體驗，一指搞定。",
    description:
      "給顧客最順暢的預約體驗，從瀏覽作品到線上預約，一指搞定。",
    icon: Users,
    image: "/AppPhone.png",
    gradient: "from-pink-400 to-rose-500",
    features: ["線上預約", "作品瀏覽", "儲值金管理", "消費紀錄"],
  },
];

// ==================== 平台卡片 ====================

const PlatformCard = ({ platform }: { platform: PlatformData }) => {
  const Icon = platform.icon;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pb-24 px-6 md:px-12 lg:px-20">
      {/* 圖片區 */}
      <div className="flex-shrink-0">
        {platform.images ? (
          <div className="relative w-[500px] h-[340px] md:w-[840px] md:h-[540px] lg:w-[1320px] lg:h-[780px]">
            {/* 左側 — 旋轉後退 */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-6 z-0 w-[45%] origin-center">
              <Image
                src={platform.images[0]}
                alt={`${platform.title} - 1`}
                width={800}
                height={600}
                className="w-full h-auto drop-shadow-2xl rounded-lg"
              />
            </div>
            {/* 中間 — 最大最前 */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[55%]">
              <Image
                src={platform.images[1]}
                alt={`${platform.title} - 2`}
                width={800}
                height={600}
                className="w-full h-auto drop-shadow-2xl rounded-lg"
              />
            </div>
            {/* 右側 — 旋轉後退 */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-6 z-0 w-[45%] origin-center">
              <Image
                src={platform.images[2]}
                alt={`${platform.title} - 3`}
                width={800}
                height={600}
                className="w-full h-auto drop-shadow-2xl rounded-lg"
              />
            </div>
          </div>
        ) : platform.image ? (
          <div>
            <Image
              src={platform.image}
              alt={platform.title}
              width={300}
              height={600}
              className="w-[180px] md:w-[240px] lg:w-[300px] h-auto drop-shadow-2xl"
            />
          </div>
        ) : (
          <div>
            <div
              className={`relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-3xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center shadow-2xl overflow-hidden`}
            >
              <Icon
                className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 text-white"
                strokeWidth={1.2}
              />
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${platform.gradient} opacity-30 blur-2xl -z-10 scale-110`}
              />
            </div>
          </div>
        )}
      </div>

      {/* 文字區 — Apple 風格 */}
      <div className="text-center max-w-3xl w-full">
        <h3
          className={`${fontSize.cardTitle} font-bold ${textColor.onLight} mb-4 lg:mb-6`}
        >
          {platform.title}
        </h3>
        {platform.subtitle && (
          <p className={`${fontSize.headingLg} font-bold ${textColor.onLight} mb-4 lg:mb-6`}>
            {platform.subtitle}
          </p>
        )}
        <p className={`${fontSize.bodyLg} ${textColor.onLightMuted} leading-relaxed max-w-2xl mx-auto`}>
          {platform.description}
          <span className="font-semibold text-foreground">
            {platform.features.join("、")}
          </span>
          ，全方位提升您的營運效率。
        </p>
      </div>
    </div>
  );
};

// ==================== 主元件 ====================

const PlatformShowcaseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // 裝置展示 refs
  const phoneRef = useRef<HTMLDivElement>(null);
  const stylistPhoneRef = useRef<HTMLDivElement>(null);
  const tabletRef = useRef<HTMLDivElement>(null);
  const deviceTitleRef = useRef<HTMLDivElement>(null);
  const deviceLayerRef = useRef<HTMLDivElement>(null);
  const deviceLabelsRef = useRef<HTMLDivElement>(null);
  const phoneIntroRef = useRef<HTMLDivElement>(null);

  // 平台介紹 refs
  const platformLayerRef = useRef<HTMLDivElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState(0);

  useGSAP(
    () => {
      const phone = phoneRef.current;
      const stylistPhone = stylistPhoneRef.current;
      const tablet = tabletRef.current;
      const deviceTitle = deviceTitleRef.current;
      const deviceLayer = deviceLayerRef.current;
      const deviceLabels = deviceLabelsRef.current;
      const phoneIntro = phoneIntroRef.current;
      const platformLayer = platformLayerRef.current;
      const tabBar = tabBarRef.current;
      if (
        !phone ||
        !stylistPhone ||
        !tablet ||
        !deviceTitle ||
        !deviceLayer ||
        !deviceLabels ||
        !phoneIntro ||
        !platformLayer ||
        !tabBar
      )
        return;

      // 裝置標籤 DOM
      const labelTablet = deviceLabels.querySelector(".device-label-tablet") as HTMLElement;
      const labelStylist = deviceLabels.querySelector(".device-label-stylist") as HTMLElement;
      const labelClient = deviceLabels.querySelector(".device-label-client") as HTMLElement;
      if (!labelTablet || !labelStylist || !labelClient) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          lg: "(min-width: 1024px)",
          md: "(min-width: 768px) and (max-width: 1023px)",
          sm: "(max-width: 767px)",
        },
        (context) => {
          const { lg, md } = context.conditions!;

          // 客戶端 iPhone 動畫參數
          const phoneFinalX = lg ? 280 : md ? 200 : 120;
          const phoneFinalY = lg ? 100 : md ? 75 : 50;
          const phoneFinalScale = lg ? 0.55 : md ? 0.55 : 0.6;

          // 設計師 iPhone 動畫參數
          const stylistFinalX = lg ? -280 : md ? -200 : -120;
          const stylistFinalY = lg ? 100 : md ? 75 : 50;
          const stylistFinalScale = lg ? 0.55 : md ? 0.55 : 0.6;

          // iPad 動畫參數（改為居中）
          const tabletFinalY = lg ? -10 : md ? -5 : 0;
          const yOffset = lg ? 30 : md ? 20 : 15;

          // 標籤位移參數（相對於各裝置位置）
          const labelTabletY = lg ? -200 : md ? -160 : -120;
          const labelPhoneY = lg ? 200 : md ? 160 : 110;

          // pin 裝置動畫 + 平台展示停留緩衝
          const pinDuration = window.innerHeight * 2.8;

          // ===== 初始狀態 =====

          // 兩支 iPhone 的初始位置參數（從中央靠攏開始）
          const phoneInitialX = lg ? 80 : md ? 60 : 40;
          const phoneInitialScale = lg ? 1.2 : md ? 1.0 : 0.9;

          // 客戶端 iPhone：中央偏右
          gsap.set(phone, {
            xPercent: -50,
            yPercent: -50,
            scale: phoneInitialScale,
            x: phoneInitialX,
            y: yOffset,
          });

          // 設計師 iPhone：中央偏左
          gsap.set(stylistPhone, {
            xPercent: -50,
            yPercent: -50,
            scale: phoneInitialScale,
            opacity: 1,
            x: -phoneInitialX,
            y: yOffset,
          });

          // iPad：中央下方，透明，稍小
          gsap.set(tablet, {
            xPercent: -50,
            yPercent: -50,
            opacity: 0,
            scale: 0.85,
            x: 0,
            y: tabletFinalY + 40,
          });

          gsap.set(deviceTitle, { opacity: 0, y: 30 });
          gsap.set(platformLayer, { opacity: 0 });
          gsap.set(tabBar, { opacity: 0, y: 20 });

          // 標籤初始狀態
          gsap.set(labelTablet, { opacity: 0, y: labelTabletY + 15, x: 0 });
          gsap.set(labelStylist, { opacity: 0, y: labelPhoneY + 15, x: stylistFinalX });
          gsap.set(labelClient, { opacity: 0, y: labelPhoneY + 15, x: phoneFinalX });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              pinType: "fixed",
              scrub: 1,
              start: "top top",
              end: () => `+=${pinDuration}`,
              invalidateOnRefresh: true,
            },
          });

          // 動畫壓縮到前半段，後半段是平台展示停留
          const a = 0.7;

          // ===== Phase 1：兩支 iPhone 從中央分開到左右兩側 =====

          // 介紹文字淡出（手機開始移動時就淡出）
          tl.to(
            phoneIntro,
            { opacity: 0, duration: a * 0.2, ease: "power1.in" },
            0
          );

          // 客戶端 iPhone 移到右側
          tl.to(
            phone,
            {
              scale: phoneFinalScale,
              x: phoneFinalX,
              y: phoneFinalY,
              duration: a * 0.4,
              ease: "power2.inOut",
            },
            0
          );

          // 設計師 iPhone 移到左側
          tl.to(
            stylistPhone,
            {
              scale: stylistFinalScale,
              x: stylistFinalX,
              y: stylistFinalY,
              duration: a * 0.4,
              ease: "power2.inOut",
            },
            0
          );

          // ===== Phase 2：iPad 從中間淡入 =====

          // iPad 從下方淡入上移到中央
          tl.to(
            tablet,
            {
              opacity: 1,
              scale: 1,
              x: 0,
              y: tabletFinalY,
              duration: a * 0.35,
              ease: "power2.out",
            },
            a * 0.1
          );

          // ===== Phase 3：標題 + 裝置標籤淡入 =====

          // 標題淡入
          tl.to(
            deviceTitle,
            { opacity: 1, y: 0, duration: a * 0.15, ease: "power2.out" },
            a * 0.48
          );

          // 裝置標籤淡入（稍晚於標題）
          tl.to(
            labelTablet,
            { opacity: 1, y: labelTabletY, duration: a * 0.12, ease: "power2.out" },
            a * 0.52
          );
          tl.to(
            labelStylist,
            { opacity: 1, y: labelPhoneY, duration: a * 0.12, ease: "power2.out" },
            a * 0.54
          );
          tl.to(
            labelClient,
            { opacity: 1, y: labelPhoneY, duration: a * 0.12, ease: "power2.out" },
            a * 0.56
          );

          // ===== Phase 4：過渡 — 裝置淡出 → 平台層浮現 =====

          // 兩支 iPhone 同時淡出
          tl.to(
            phone,
            { opacity: 0, duration: a * 0.12, ease: "power1.in" },
            a * 0.68
          );
          tl.to(
            stylistPhone,
            { opacity: 0, duration: a * 0.12, ease: "power1.in" },
            a * 0.68
          );

          // 標題和標籤淡出
          tl.to(
            deviceTitle,
            { opacity: 0, duration: a * 0.12, ease: "power1.in" },
            a * 0.68
          );
          tl.to(
            deviceLabels,
            { opacity: 0, duration: a * 0.12, ease: "power1.in" },
            a * 0.68
          );

          // 平板放大並淡出（穿進螢幕的效果）
          tl.to(
            tablet,
            { scale: 3, opacity: 0, duration: a * 0.28, ease: "power2.in" },
            a * 0.72
          );

          // 平台層浮現
          tl.to(
            platformLayer,
            { opacity: 1, duration: a * 0.1, ease: "power1.out" },
            a * 0.92
          );

          // 裝置層完全隱藏
          tl.set(deviceLayer, { visibility: "hidden" }, a);

          // Tab 列浮現
          tl.to(
            tabBar,
            { opacity: 1, y: 0, duration: a * 0.15, ease: "power2.out" },
            a * 0.9
          );

          // 錨定 timeline 到 1.0，a ~ 1.0 是平台展示停留時間
          tl.set({}, {}, 1);

          return () => {};
        }
      );
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="platforms"
      data-section-label="平台介紹"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-muted/30 touch-pan-y"
    >
      {/* Layer 1：裝置展示（scroll-driven 動畫） */}
      <div ref={deviceLayerRef} className="absolute inset-0 z-10">
        {/* 標題 */}
        <div
          ref={deviceTitleRef}
          className="absolute top-[14%] md:top-[12%] left-0 right-0 z-10 text-center px-6"
        >
          <h2
            className={`${fontSize.headingXl} font-bold ${textColor.onLight} mb-3`}
          >
            三大平台，一站整合
          </h2>
          <p
            className={`${fontSize.bodyLg} ${textColor.onLightMuted} max-w-xl mx-auto`}
          >
            完整覆蓋美業經營每個環節
          </p>
        </div>

        {/* 裝置 */}
        <div className="absolute inset-0">
          {/* 平板（橫向，中央） */}
          <div
            ref={tabletRef}
            className="absolute top-1/2 left-1/2 w-[340px] md:w-[480px] lg:w-[620px]"
          >
            <Image
              src="/ipad_doosee.png"
              alt="Doosee POS 平板介面"
              width={620}
              height={465}
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>

          {/* 設計師 iPhone（左前方） */}
          <div ref={stylistPhoneRef} className="absolute top-1/2 left-1/2 z-10 h-[340px] md:h-[420px] lg:h-[500px]">
            <Image
              src="/iPhone_stylist.png"
              alt="Doosee 設計師 APP 介面"
              width={1195}
              height={2434}
              className="h-full w-auto drop-shadow-2xl"
            />
          </div>

          {/* 客戶端 iPhone（右前方） */}
          <div ref={phoneRef} className="absolute top-1/2 left-1/2 z-10 h-[340px] md:h-[420px] lg:h-[500px]">
            <Image
              src="/AppPhone.png"
              alt="Doosee 客戶端 APP 介面"
              width={674}
              height={1280}
              className="h-full w-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* 初始介紹文字（兩支手機並排時顯示，分開後隱藏） */}
        <div ref={phoneIntroRef} className="absolute inset-0 z-20 pointer-events-none">
          {/* 小螢幕：上方居中 */}
          <div className="lg:hidden absolute inset-x-0 top-[14%] text-center px-6">
            <h3 className="text-lg md:text-xl font-bold text-foreground">
              設計師 APP ＆ 客戶端 APP
            </h3>
            <p className={`text-sm md:text-base ${textColor.onLightMuted} leading-relaxed mt-1`}>
              從設計師管理到顧客預約，雙端協作一指搞定
            </p>
          </div>
          {/* 大螢幕：左右兩側 */}
          <div className="intro-left hidden lg:block absolute top-1/2 left-[15%] -translate-y-1/2 max-w-[260px] text-right">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              設計師 APP
            </h3>
            <p className={`${fontSize.body} ${textColor.onLightMuted} leading-relaxed`}>
              掌握自己的節奏，輕鬆管理排班、業績與顧客關係
            </p>
          </div>
          <div className="intro-right hidden lg:block absolute top-1/2 right-[15%] -translate-y-1/2 max-w-[260px] text-left">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              客戶端 APP
            </h3>
            <p className={`${fontSize.body} ${textColor.onLightMuted} leading-relaxed`}>
              最順暢的預約體驗，從瀏覽作品到線上預約，一指搞定
            </p>
          </div>
        </div>

        {/* 裝置標籤 */}
        <div ref={deviceLabelsRef} className="absolute inset-0 z-20 pointer-events-none">
          {/* iPad 標籤 — 平板上方 */}
          <div className="device-label-tablet absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className={`${fontSize.tag} font-medium ${textColor.onLightMuted} bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50`}>
              POS 系統
            </span>
          </div>
          {/* 設計師 iPhone 標籤 — 手機下方 */}
          <div className="device-label-stylist absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className={`${fontSize.tag} font-medium ${textColor.onLightMuted} bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50`}>
              設計師 APP
            </span>
          </div>
          {/* 客戶端 iPhone 標籤 — 手機下方 */}
          <div className="device-label-client absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className={`${fontSize.tag} font-medium ${textColor.onLightMuted} bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50`}>
              客戶端 APP
            </span>
          </div>
        </div>
      </div>

      {/* Layer 2：平台介紹（Tab 點擊切換） */}
      <div ref={platformLayerRef} className="absolute inset-0">
        {platforms.map((platform, i) => (
          <div
            key={platform.title}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              activeTab === i
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <PlatformCard platform={platform} />
          </div>
        ))}
      </div>

      {/* Tab 切換列 + 點擊提示 */}
      <div
        ref={tabBarRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        {/* 點擊提示 */}
        <span className="text-xs text-muted-foreground/70 animate-pulse">
          點擊切換平台
        </span>
        <div className="flex items-center gap-1 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg p-1.5">
          {platforms.map((platform, index) => (
            <button
              key={platform.title}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-2 rounded-full ${fontSize.tag} font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === index
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {platform.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformShowcaseSection;
