"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fontSize, textColor } from "@/constants/landing-styles";

gsap.registerPlugin(ScrollTrigger);

const ScreenZoomSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const tabletRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const phone = phoneRef.current;
      const tablet = tabletRef.current;
      const title = titleRef.current;
      if (!phone || !tablet || !title) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          lg: "(min-width: 1024px)",
          md: "(min-width: 768px) and (max-width: 1023px)",
          sm: "(max-width: 767px)",
        },
        (context) => {
          const { lg, md } = context.conditions!;
          const scrollMultiplier = lg ? 1.0 : md ? 0.9 : 0.8;

          // 初始狀態：手機放大置中，平板與標題隱藏
          const phoneInitialScale = lg ? 1.8 : md ? 1.5 : 1.3;

          // 手機最終位置：右下角（疊在平板上）
          const phoneFinalX = lg ? 340 : md ? 250 : 130;
          const phoneFinalY = lg ? 120 : md ? 90 : 60;
          const phoneFinalScale = lg ? 0.55 : md ? 0.55 : 0.6;

          // 平板最終位置：置中偏左
          const tabletFinalX = lg ? -60 : md ? -40 : -20;

          // xPercent/yPercent 處理置中，x/y 處理額外位移
          const yOffset = lg ? 30 : md ? 20 : 15;
          gsap.set(phone, { xPercent: -50, yPercent: -50, scale: phoneInitialScale, x: 0, y: yOffset });
          gsap.set(tablet, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.85, x: tabletFinalX - 40, y: yOffset });
          gsap.set(title, { opacity: 0, y: 30 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${window.innerHeight * scrollMultiplier}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          // 階段 1（0.00–0.50）：手機縮小並移到右下角
          tl.to(
            phone,
            {
              scale: phoneFinalScale,
              x: phoneFinalX,
              y: phoneFinalY,
              duration: 0.5,
              ease: "power2.inOut",
            },
            0
          );

          // 階段 2（0.15–0.55）：平板淡入到定位（置中偏左）
          tl.to(
            tablet,
            {
              opacity: 1,
              scale: 1,
              x: tabletFinalX,
              duration: 0.4,
              ease: "power2.out",
            },
            0.15
          );

          // 階段 3（0.60–0.80）：標題淡入
          tl.to(
            title,
            { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
            0.6
          );

          return () => {};
        }
      );
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      data-section-label="平台展示"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-muted/30"
    >
      {/* 標題 — 上方置中 */}
      <div
        ref={titleRef}
        className="absolute top-[8%] md:top-[10%] left-0 right-0 z-10 text-center px-6"
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

      {/* 裝置容器 — 手機與平板各自絕對定位，互不影響佈局 */}
      <div className="absolute inset-0">
        {/* 平板（橫向，尚無圖片，使用裝置外框 placeholder） */}
        <div
          ref={tabletRef}
          className="absolute top-1/2 left-1/2 w-[340px] md:w-[480px] lg:w-[620px] aspect-[4/3] rounded-[18px] md:rounded-[24px] lg:rounded-[28px] bg-neutral-900 p-[6px] md:p-2.5 shadow-2xl"
        >
          <div className="w-full h-full rounded-[13px] md:rounded-[18px] lg:rounded-[22px] bg-gradient-to-br from-accent via-secondary to-muted overflow-hidden flex items-center justify-center">
            <div className="text-center px-6">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v15a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <p
                className={`${fontSize.tag} font-semibold ${textColor.onLightMuted}`}
              >
                POS 平板介面
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Coming Soon
              </p>
            </div>
          </div>
        </div>

        {/* 手機 — 一開始大且正中間，捲動後縮小往右 */}
        <div
          ref={phoneRef}
          className="absolute top-1/2 left-1/2 z-20"
        >
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
    </section>
  );
};

export default ScreenZoomSection;
