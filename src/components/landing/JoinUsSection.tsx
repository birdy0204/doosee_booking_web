"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronUp, ChevronDown } from "lucide-react";
import { fontSize, textColor } from "@/constants/landing-styles";

gsap.registerPlugin(ScrollTrigger);

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

const JoinUsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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
      className="py-20 lg:py-28 bg-background"
    >
      <div className="container mx-auto px-4">
        {/* 標題 */}
        <div className="mb-16">
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
            {/* 步驟數字大字背景 */}
            <span className="absolute top-8 right-12 text-[220px] lg:text-[300px] font-black text-foreground/[0.04] leading-none select-none">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            {/* 右側步驟視覺（絕對定位於右半邊） */}
            <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-[55%] items-center justify-center">
              <div className="flex flex-col items-center gap-10">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-background/80 shadow-lg flex items-center justify-center">
                  <span className="text-6xl md:text-7xl font-bold text-primary">
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

                {/* 進度點 */}
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

          <div className="relative z-10 flex flex-col lg:flex-row min-h-[700px]">
            {/* 左側：步驟列表 */}
            <div className="lg:w-[45%] p-10 lg:p-16 flex items-center gap-4 relative">
              {/* 上下按鍵 */}
              <div className="hidden lg:flex flex-col gap-3 shrink-0 absolute left-4 top-1/2 -translate-y-1/2">
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

              <div className="flex-1 flex flex-col lg:pl-12">
                {steps.map((step, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div
                      key={step.title}
                      onClick={() => handleToggle(index)}
                      className="cursor-pointer py-1"
                    >
                      {/* 膠囊標題 */}
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

                      {/* 展開描述氣泡 */}
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

            {/* 右側：手機版步驟視覺（桌面版已在全幅背景中） */}
            <div className="lg:hidden flex items-center justify-center p-10 relative">
              <div className="flex flex-col items-center gap-10">
                <div className="w-40 h-40 rounded-full bg-background/80 shadow-lg flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary">
                    {activeIndex + 1}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className={`text-3xl font-bold ${textColor.onLight} mb-3`}>
                    {steps[activeIndex].title}
                  </h3>
                  <p className={`${textColor.onLightMuted} text-base`}>
                    Step {String(activeIndex + 1).padStart(2, "0")} of {String(steps.length).padStart(2, "0")}
                  </p>
                </div>

                {/* 進度點 */}
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
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;
