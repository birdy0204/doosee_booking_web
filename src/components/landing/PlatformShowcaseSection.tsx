"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Monitor, Smartphone, Users } from "lucide-react";
import { getLenis } from "@/components/SmoothScroll";
import type { LucideIcon } from "lucide-react";
import { fontSize, textColor } from "@/constants/landing-styles";

gsap.registerPlugin(ScrollTrigger);

interface PlatformData {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  features: string[];
}

const platforms: PlatformData[] = [
  {
    title: "POS 系統",
    description: "為美業門店量身打造的智慧收銀與營運管理系統，從預約到結帳一氣呵成。",
    icon: Monitor,
    gradient: "from-orange-400 to-amber-500",
    iconBg: "bg-orange-500/10",
    features: ["預約排程", "多元支付", "庫存追蹤", "營收報表"],
  },
  {
    title: "設計師 APP",
    description: "讓每位設計師掌握自己的節奏，輕鬆管理排班、業績與顧客關係。",
    icon: Smartphone,
    gradient: "from-violet-400 to-purple-500",
    iconBg: "bg-violet-500/10",
    features: ["個人排班", "業績追蹤", "顧客偏好", "作品集展示"],
  },
  {
    title: "客戶端 APP",
    description: "給顧客最順暢的預約體驗，從瀏覽作品到線上預約，一指搞定。",
    icon: Users,
    gradient: "from-pink-400 to-rose-500",
    iconBg: "bg-pink-500/10",
    features: ["線上預約", "作品瀏覽", "儲值金管理", "消費紀錄"],
  },
];

// 平台卡片元件
const PlatformCard = ({ platform }: { platform: PlatformData }) => {
  const Icon = platform.icon;

  return (
    <div className="w-screen h-screen flex items-center justify-center px-6 md:px-12 lg:px-20">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-6xl w-full">
        {/* 圖示區塊 */}
        <div className="flex-shrink-0">
          <div
            className={`relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-3xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center shadow-2xl`}
          >
            <Icon className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 text-white" strokeWidth={1.2} />
            {/* 裝飾光暈 */}
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${platform.gradient} opacity-30 blur-2xl -z-10 scale-110`}
            />
          </div>
        </div>

        {/* 文字內容區塊 */}
        <div className="text-center lg:text-left">
          <h3 className={`${fontSize.cardTitle} font-bold ${textColor.onLight} mb-4`}>
            {platform.title}
          </h3>
          <p className={`${fontSize.bodyLg} ${textColor.onLightMuted} mb-8 max-w-md`}>
            {platform.description}
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            {platform.features.map((feature) => (
              <span
                key={feature}
                className={`px-4 py-2 rounded-full bg-accent ${fontSize.tag} font-medium text-foreground/80 border border-border`}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PlatformShowcaseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<globalThis.ScrollTrigger | null>(null);
  const activePanelRef = useRef(-1);
  const [activeTab, setActiveTab] = useState(-1);

  // 點擊 tab 跳轉到對應面板
  const scrollToPanel = (panelIndex: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const targetScroll = st.start + panelIndex * window.innerWidth;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const scrollDistance = track.scrollWidth - window.innerWidth;
      const panelCount = platforms.length + 1; // 標題面板 + 3 個平台

      const tween = gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // 根據進度計算當前面板 index（0=標題, 1-3=平台）
            const panelIndex = Math.min(
              panelCount - 1,
              Math.floor(self.progress * panelCount)
            );
            if (panelIndex !== activePanelRef.current) {
              activePanelRef.current = panelIndex;
              setActiveTab(panelIndex - 1); // -1=標題, 0-2=三個平台
            }
          },
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger as globalThis.ScrollTrigger;
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="platforms"
      data-section-label="平台介紹"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex h-screen"
        style={{ width: `${(platforms.length + 1) * 100}vw` }}
      >
        {/* 面板 1：標題導言 */}
        <div className="w-screen h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <h2 className={`${fontSize.hero} font-bold ${textColor.onLight} mb-6`}>
              三大平台，一站整合
            </h2>
            <p className={`${fontSize.bodyLg} ${textColor.onLightMuted} max-w-xl mx-auto`}>
              完整覆蓋美業經營每個環節
            </p>
          </div>
        </div>

        {/* 面板 2~4：各平台卡片 */}
        {platforms.map((platform) => (
          <PlatformCard key={platform.title} platform={platform} />
        ))}
      </div>

      {/* 膠囊切換 Tab */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg p-1.5">
        {platforms.map((platform, index) => (
          <button
            key={platform.title}
            onClick={() => scrollToPanel(index + 1)}
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
    </section>
  );
};

export default PlatformShowcaseSection;
