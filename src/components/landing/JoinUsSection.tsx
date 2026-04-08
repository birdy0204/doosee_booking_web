"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { fontSize, textColor } from "@/constants/landing-styles";
import { useTestimonialList } from "@/hooks/useTestimonials";

gsap.registerPlugin(ScrollTrigger);

// ==================== 跑馬燈資料 ====================

interface MarqueeCard {
  name: string;
  type: string;
  gradient: string;
}

const marqueeRow1: MarqueeCard[] = [
  { name: "FLUX Hair Salon", type: "髮廊 · 台北大安", gradient: "from-zinc-700 to-zinc-900" },
  { name: "Belle Nails", type: "美甲 · 台中西區", gradient: "from-pink-500 to-rose-600" },
  { name: "淨妍美學診所", type: "醫美 · 全台連鎖", gradient: "from-sky-400 to-blue-600" },
  { name: "Oasis SPA", type: "SPA · 高雄左營", gradient: "from-teal-400 to-emerald-600" },
  { name: "小紅書美甲", type: "美甲美睫 · 台北中山", gradient: "from-red-400 to-rose-500" },
  { name: "MAVEN Hair", type: "髮廊 · 新竹竹北", gradient: "from-amber-500 to-orange-600" },
  { name: "Aura Skincare", type: "護膚 · 台南東區", gradient: "from-violet-400 to-purple-600" },
  { name: "Muse 紋繡學院", type: "紋繡 · 台北信義", gradient: "from-fuchsia-500 to-pink-600" },
];

const marqueeRow2: MarqueeCard[] = [
  { name: "Vicky 老師", type: "美睫技術講師 · 10 萬粉絲", gradient: "from-purple-500 to-indigo-600" },
  { name: "Kevin 髮型師", type: "明星御用造型師", gradient: "from-zinc-600 to-zinc-800" },
  { name: "小安老師", type: "日式美甲達人 · 8 萬粉絲", gradient: "from-rose-400 to-pink-500" },
  { name: "Mia 皮膚管理師", type: "韓式皮膚管理專家", gradient: "from-sky-400 to-cyan-600" },
  { name: "阿倫 Hair", type: "YouTube 髮型教學 · 25 萬訂閱", gradient: "from-red-500 to-orange-500" },
  { name: "Sophia 紋繡師", type: "半永久紋繡冠軍", gradient: "from-amber-400 to-yellow-500" },
  { name: "Lena 美學總監", type: "連鎖品牌創辦人", gradient: "from-emerald-400 to-teal-600" },
  { name: "Ivy 造型師", type: "婚禮造型 · 12 萬粉絲", gradient: "from-fuchsia-400 to-purple-500" },
];

// ==================== 客戶見證：漸層色與縮寫生成 ====================

const gradients = [
  "from-zinc-700 to-zinc-900",
  "from-pink-500 to-rose-600",
  "from-purple-500 to-indigo-600",
  "from-sky-400 to-blue-600",
  "from-zinc-600 to-zinc-800",
  "from-teal-400 to-emerald-600",
  "from-amber-500 to-orange-600",
  "from-fuchsia-500 to-pink-600",
];

/** 從名稱取得縮寫（英文取首字母，中文取第一字） */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (/^[\u4e00-\u9fff]/.test(name)) return name.charAt(0);
  return words
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

// ==================== 加入步驟資料 ====================

interface Step {
  title: string;
  description: string;
  image: string;
}

const steps: Step[] = [
  {
    title: "聯繫我們",
    description:
      "透過官網表單或 LINE 官方帳號與我們聯繫，我們的專屬顧問會在 24 小時內回覆您，了解您的需求與店家規模。",
    image: "/step-contact.png",
  },
  {
    title: "專人諮詢",
    description:
      "由專屬顧問為您介紹 Doosee 的完整功能與方案，根據您的營業型態推薦最適合的使用方式，解答所有疑問。",
    image: "/step-consult.png",
  },
  {
    title: "帳號開通",
    description:
      "確認合作後，我們會協助您建立店家帳號、設定基本資訊、上架服務項目與營業時段，讓一切準備就緒。",
    image: "/step-setup.png",
  },
  {
    title: "教育訓練",
    description:
      "提供完整的系統操作教學，包含預約管理、顧客管理、數據報表等功能，確保您和團隊都能輕鬆上手。",
    image: "/step-training.png",
  },
  {
    title: "正式上線",
    description:
      "完成設定與訓練後即可正式啟用，開始享受智慧預約帶來的便利。我們持續提供技術支援，陪伴您的每一步成長。",
    image: "/step-launch.png",
  },
];

// ==================== 主元件 ====================

const JoinUsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const { data: testimonialData } = useTestimonialList({
    maxResultCount: 50,
    sorting: "SortOrder ASC",
  });

  const testimonials = useMemo(
    () =>
      (testimonialData?.items ?? [])
        .filter((t) => t.isPublished)
        .map((t, i) => ({
          id: t.id,
          name: t.authorName,
          role: t.authorTitle ?? "",
          quote: `「${t.content}」`,
          initials: getInitials(t.authorName),
          gradient: gradients[i % gradients.length],
        })),
    [testimonialData],
  );

  const scrollTestimonial = useCallback((direction: "left" | "right") => {
    const container = testimonialRef.current;
    if (!container) return;
    const cardWidth = container.querySelector("div")?.offsetWidth ?? 400;
    const scrollAmount = cardWidth + 24;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  useGSAP(
    () => {
      // 步驟區塊動畫
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [] }
  );

  const handleToggle = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="join-us"
      data-section-label="加入我們"
      ref={sectionRef}
      className="pb-20 lg:pb-28 bg-background"
    >
      {/* ==================== 深色區塊：跑馬燈 + 見證 ==================== */}
      <div className="overflow-hidden bg-foreground" data-section-theme="dark">
        {/* 跑馬燈區塊 */}
        <div className="py-10 lg:py-14">
          {/* 第一行 — 合作商家，向左滾動 */}
          <div className="flex animate-marquee-left w-max mb-4 lg:mb-6">
            {[...marqueeRow1, ...marqueeRow1].map((card, i) => (
              <div
                key={`r1-${i}`}
                className={`shrink-0 w-[240px] lg:w-[280px] h-[120px] lg:h-[140px] mx-2 lg:mx-3 rounded-2xl bg-gradient-to-br ${card.gradient} p-5 lg:p-6 flex flex-col justify-between shadow-lg`}
              >
                <h4 className="text-white font-bold text-base lg:text-xl leading-tight">{card.name}</h4>
                <p className="text-white/70 text-xs lg:text-sm">{card.type}</p>
              </div>
            ))}
          </div>
          {/* 第二行 — 知名個人 IP，向右滾動 */}
          <div className="flex animate-marquee-right w-max">
            {[...marqueeRow2, ...marqueeRow2].map((card, i) => (
              <div
                key={`r2-${i}`}
                className={`shrink-0 w-[240px] lg:w-[280px] h-[120px] lg:h-[140px] mx-2 lg:mx-3 rounded-2xl bg-gradient-to-br ${card.gradient} p-5 lg:p-6 flex flex-col justify-between shadow-lg`}
              >
                <h4 className="text-white font-bold text-base lg:text-xl leading-tight">{card.name}</h4>
                <p className="text-white/70 text-xs lg:text-sm">{card.type}</p>
              </div>
            ))}
          </div>

          {/* 客戶見證區塊 */}
          <div className="mt-12 lg:mt-20 pb-2">
            <div className="container mx-auto px-4 flex items-end justify-between mb-8 lg:mb-12">
              <div>
                <h3 className={`${fontSize.headingLg} font-bold text-white tracking-tight`}>
                  深受美業人信賴的首選
                </h3>
                <p className={`${fontSize.bodyLg} text-white/70 mt-2 lg:mt-3 max-w-lg`}>
                  聽聽他們怎麼說，看見真實的改變。
                </p>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => scrollTestimonial("left")}
                  className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollTestimonial("right")}
                  className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              ref={testimonialRef}
              className="flex gap-6 overflow-x-auto no-scrollbar pb-4 px-4 lg:px-8"
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="shrink-0 w-[80vw] md:w-[44vw] lg:w-[38vw] bg-background rounded-2xl p-8 lg:p-10 flex flex-col"
                >
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center mb-6`}
                  >
                    <span className="text-white font-bold text-lg">{t.initials}</span>
                  </div>
                  <p className={`${textColor.onLightMuted} ${fontSize.tag} leading-relaxed flex-1 mb-8`}>
                    {t.quote}
                  </p>
                  <div>
                    <p className={`font-bold ${textColor.onLight} ${fontSize.body}`}>{t.name}</p>
                    <p className={`${textColor.onLightMuted} text-sm`}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 淺色區塊：加入步驟 ==================== */}
      <div className="container mx-auto px-4 mt-12 lg:mt-20">
        {/* 標題 */}
        <div className="mb-10 lg:mb-16">
          <h2
            className={`${fontSize.headingXl} font-bold ${textColor.onLight} tracking-tight`}
          >
            加入我們。
          </h2>
          <p className={`${fontSize.bodyLg} ${textColor.onLightMuted} mt-4 max-w-2xl`}>
            只要五個簡單步驟，即可開始數位化您的美業經營。
          </p>
        </div>

        {/* 內容區塊 */}
        <div
          ref={contentRef}
          className="rounded-3xl overflow-hidden shadow-sm relative"
        >
          {/* 全幅背景視覺區 */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted">
            <span className="absolute top-4 right-6 text-[160px] md:text-[220px] lg:text-[300px] font-black text-foreground/[0.04] leading-none select-none">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            {/* 右側步驟視覺 — 僅桌面版 */}
            <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-[55%] items-center justify-center">
              <div className="flex flex-col items-center gap-10">
                <div className="w-48 h-48 rounded-full bg-background/80 shadow-lg flex items-center justify-center">
                  <span className="text-7xl font-bold text-primary">
                    {activeIndex + 1}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className={`text-3xl md:text-4xl font-bold ${textColor.onLight} mb-3`}>
                    {steps[activeIndex].title}
                  </h3>
                  <p className={`${textColor.onLightMuted} text-base`}>
                    Step {String(activeIndex + 1).padStart(2, "0")} of {String(steps.length).padStart(2, "0")}
                  </p>
                </div>
                <div className="flex gap-4">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                        i === activeIndex
                          ? "bg-foreground scale-125"
                          : i < activeIndex
                            ? "bg-foreground/40"
                            : "bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===== 移動端佈局（< lg）===== */}
          <div className="relative z-10 flex flex-col lg:hidden min-h-[520px]">
            <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-6">
              <div className="w-28 h-28 rounded-full bg-background/80 shadow-lg flex items-center justify-center mb-6">
                <span className="text-4xl font-bold text-primary">
                  {activeIndex + 1}
                </span>
              </div>
              <h3 className={`text-2xl font-bold ${textColor.onLight} mb-2 text-center`}>
                {steps[activeIndex].title}
              </h3>
              <p className={`${textColor.onLightMuted} text-xs mb-4`}>
                Step {String(activeIndex + 1).padStart(2, "0")} of {String(steps.length).padStart(2, "0")}
              </p>
              <p className={`${textColor.onLightMuted} ${fontSize.tag} leading-relaxed text-center max-w-sm`}>
                {steps[activeIndex].description}
              </p>
            </div>

            <div className="px-4 pb-6">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {steps.map((step, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <button
                      key={step.title}
                      onClick={() => setActiveIndex(i)}
                      className={`flex items-center gap-2.5 rounded-full px-5 py-3 whitespace-nowrap shrink-0 transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-foreground/10 backdrop-blur-sm"
                          : "bg-muted/50 backdrop-blur-sm"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all duration-300 ${
                          isActive
                            ? "bg-foreground text-background"
                            : "bg-foreground/10 text-foreground"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className={`text-sm font-semibold ${textColor.onLight}`}>
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===== 桌面版佈局（lg+）===== */}
          <div className="relative z-10 hidden lg:flex lg:flex-row min-h-[700px]">
            <div className="lg:w-[45%] p-16 flex items-center gap-4 relative">
              <div className="flex flex-col gap-3 shrink-0 absolute left-4 top-1/2 -translate-y-1/2">
                <button
                  onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer ${
                    activeIndex === 0
                      ? "bg-muted text-muted-foreground/50"
                      : "bg-muted text-foreground hover:bg-border"
                  }`}
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveIndex(Math.min(steps.length - 1, activeIndex + 1))}
                  disabled={activeIndex === steps.length - 1}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer ${
                    activeIndex === steps.length - 1
                      ? "bg-muted text-muted-foreground/50"
                      : "bg-muted text-foreground hover:bg-border"
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 flex flex-col pl-12">
                {steps.map((step, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div
                      key={step.title}
                      onClick={() => handleToggle(index)}
                      className="cursor-pointer py-1"
                    >
                      <div
                        className={`items-center gap-2.5 rounded-full px-4 py-2 whitespace-nowrap bg-muted/70 backdrop-blur-sm ${
                          isActive ? "hidden" : "inline-flex"
                        }`}
                      >
                        <span className="w-7 h-7 rounded-full bg-foreground/10 text-foreground flex items-center justify-center shrink-0 text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className={`${fontSize.tag} font-semibold ${textColor.onLight}`}>
                          {step.title}
                        </span>
                      </div>

                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                          isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="bg-muted/70 backdrop-blur-sm rounded-[20px] px-6 py-5 max-w-md">
                            <p className={`font-semibold ${textColor.onLight} ${fontSize.body} mb-1.5`}>
                              {step.title}
                            </p>
                            <p className={`${textColor.onLightMuted} ${fontSize.tag} leading-relaxed`}>
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;
