"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";

const SectionIndicator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const currentLabelRef = useRef<string>("");
  const [isDark, setIsDark] = useState(false);

  const switchLabel = useCallback(
    (newLabel: string, activeIndex: number, theme: string | null) => {
      if (currentLabelRef.current === newLabel) return;

      // 中斷進行中的動畫，避免快速滾動時被跳過
      gsap.killTweensOf([labelRef.current, numberRef.current]);

      currentLabelRef.current = newLabel;
      setIsDark(theme === "dark");

      const newNumber = String(activeIndex + 1).padStart(2, "0");

      const tl = gsap.timeline();

      // 舊文字與編號向上滑出 + 淡出
      tl.to([labelRef.current, numberRef.current], {
        y: -12,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      // 更新內容
      tl.call(() => {
        if (labelRef.current) labelRef.current.textContent = newLabel;
        if (numberRef.current) numberRef.current.textContent = newNumber;
      });

      // 新文字與編號從下方滑入 + 淡入
      tl.fromTo(
        [labelRef.current, numberRef.current],
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    },
    []
  );

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-label]")
    );
    if (sections.length === 0) return;

    // 設定初始文字與編號
    const firstLabel = sections[0].getAttribute("data-section-label") || "";
    if (labelRef.current) {
      labelRef.current.textContent = firstLabel;
      currentLabelRef.current = firstLabel;
    }
    if (numberRef.current) {
      numberRef.current.textContent = "01";
    }

    // 檢查指示器位置是否與任何深色區塊重疊
    const checkDarkOverlap = () => {
      if (!containerRef.current) return false;
      const indicatorRect = containerRef.current.getBoundingClientRect();
      const indicatorY = indicatorRect.top + indicatorRect.height / 2;
      const darkSections = document.querySelectorAll<HTMLElement>(
        '[data-section-theme="dark"]'
      );
      for (const dark of darkSections) {
        const rect = dark.getBoundingClientRect();
        if (indicatorY >= rect.top && indicatorY <= rect.bottom) return true;
      }
      return false;
    };

    // 用 getBoundingClientRect 判斷哪個 section 最接近畫面中央
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let activeIndex = 0;

      for (let i = sections.length - 1; i >= 0; i--) {
        const rect = sections[i].getBoundingClientRect();
        // 找最後一個 top 還在畫面中央以上的 section
        if (rect.top <= viewportCenter) {
          activeIndex = i;
          break;
        }
      }

      const section = sections[activeIndex];
      const label = section.getAttribute("data-section-label") || "";
      // 以指示器實際位置判斷是否在深色區塊內
      const theme = checkDarkOverlap() ? "dark" : null;
      switchLabel(label, activeIndex, theme);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // 初始觸發一次
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [switchLabel]);

  return (
    <div
      ref={containerRef}
      className="fixed left-8 bottom-12 z-40 hidden lg:flex flex-col items-start gap-2 transition-colors duration-500"
    >
      {/* 垂直分類文字 */}
      <div className="overflow-hidden py-1">
        <span
          ref={labelRef}
          className={`block text-base font-semibold tracking-[0.12em] transition-colors duration-500 ${
            isDark ? "text-white/80" : "text-foreground/70"
          }`}
          style={{ writingMode: "vertical-rl" }}
        />
      </div>

      {/* 編號 */}
      <div className="overflow-hidden pl-1">
        <span
          ref={numberRef}
          className={`block text-sm font-medium transition-colors duration-500 ${
            isDark ? "text-white/50" : "text-foreground/40"
          }`}
        />
      </div>
    </div>
  );
};

export default SectionIndicator;
