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
    <div className="absolute inset-0 flex flex-col items-center justify-center md:justify-start px-6 md:px-12 lg:px-20">
      {/* 圖片區 */}
      <div className="flex-shrink-0">
        {platform.images ? (
          <div className="relative w-[500px] h-[340px] md:w-[840px] md:h-[540px] lg:w-[1320px] lg:h-[780px] mt-0 md:mt-16 lg:mt-16">
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
          <div className="mt-12 md:mt-16 lg:mt-20">
            <Image
              src={platform.image}
              alt={platform.title}
              width={300}
              height={600}
              className="w-[180px] md:w-[240px] lg:w-[300px] h-auto drop-shadow-2xl"
            />
          </div>
        ) : (
          <div className="mt-12 md:mt-16 lg:mt-20">
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
  const tabletRef = useRef<HTMLDivElement>(null);
  const deviceTitleRef = useRef<HTMLDivElement>(null);
  const deviceLayerRef = useRef<HTMLDivElement>(null);

  // 平台介紹 refs
  const platformLayerRef = useRef<HTMLDivElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState(0);

  useGSAP(
    () => {
      const phone = phoneRef.current;
      const tablet = tabletRef.current;
      const deviceTitle = deviceTitleRef.current;
      const deviceLayer = deviceLayerRef.current;
      const platformLayer = platformLayerRef.current;
      const tabBar = tabBarRef.current;
      if (
        !phone ||
        !tablet ||
        !deviceTitle ||
        !deviceLayer ||
        !platformLayer ||
        !tabBar
      )
        return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          lg: "(min-width: 1024px)",
          md: "(min-width: 768px) and (max-width: 1023px)",
          sm: "(max-width: 767px)",
        },
        (context) => {
          const { lg, md } = context.conditions!;

          // 裝置動畫參數
          const phoneInitialScale = lg ? 1.8 : md ? 1.5 : 1.3;
          const phoneFinalX = lg ? 340 : md ? 250 : 130;
          const phoneFinalY = lg ? 120 : md ? 90 : 60;
          const phoneFinalScale = lg ? 0.55 : md ? 0.55 : 0.6;
          const tabletFinalX = lg ? -60 : md ? -40 : -20;
          const yOffset = lg ? 30 : md ? 20 : 15;

          // pin 裝置動畫 + 平台展示停留緩衝
          const pinDuration = window.innerHeight * 2.5;

          // 初始狀態
          gsap.set(phone, {
            xPercent: -50,
            yPercent: -50,
            scale: phoneInitialScale,
            x: 0,
            y: yOffset,
          });
          gsap.set(tablet, {
            xPercent: -50,
            yPercent: -50,
            opacity: 0,
            scale: 0.85,
            x: tabletFinalX - 40,
            y: yOffset,
          });
          gsap.set(deviceTitle, { opacity: 0, y: 30 });
          gsap.set(platformLayer, { opacity: 0 });
          gsap.set(tabBar, { opacity: 0, y: 20 });

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

          // ===== 裝置展示動畫（0 ~ a*0.7） =====

          // 手機縮小並移到右下角
          tl.to(
            phone,
            {
              scale: phoneFinalScale,
              x: phoneFinalX,
              y: phoneFinalY,
              duration: a * 0.5,
              ease: "power2.inOut",
            },
            0
          );

          // 平板淡入
          tl.to(
            tablet,
            {
              opacity: 1,
              scale: 1,
              x: tabletFinalX,
              duration: a * 0.4,
              ease: "power2.out",
            },
            a * 0.1
          );

          // 標題淡入
          tl.to(
            deviceTitle,
            { opacity: 1, y: 0, duration: a * 0.2, ease: "power2.out" },
            a * 0.55
          );

          // ===== 過渡：裝置淡出 → 平台層浮現 =====

          // 手機與標題先淡出
          tl.to(
            phone,
            { opacity: 0, duration: a * 0.15, ease: "power1.in" },
            a * 0.65
          );
          tl.to(
            deviceTitle,
            { opacity: 0, duration: a * 0.15, ease: "power1.in" },
            a * 0.65
          );

          // 平板放大並淡出（穿進螢幕的效果）
          tl.to(
            tablet,
            { scale: 3, opacity: 0, duration: a * 0.3, ease: "power2.in" },
            a * 0.7
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
          className="absolute top-[16%] md:top-[18%] left-0 right-0 z-10 text-center px-6"
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
          {/* 平板（橫向） */}
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

          {/* 手機 */}
          <div ref={phoneRef} className="absolute top-1/2 left-1/2 z-20">
            <Image
              src="/AppPhone.png"
              alt="Doosee APP 介面"
              width={300}
              height={600}
              className="w-[180px] md:w-[220px] lg:w-[260px] h-auto drop-shadow-2xl"
              priority
            />
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
