"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionIndicator = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const currentLabelRef = useRef<string>("");
  const [isDark, setIsDark] = useState(false);

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>(
      "[data-section-label]"
    );
    if (sections.length === 0) return;

    // 設定初始文字與編號
    const firstLabel =
      sections[0].getAttribute("data-section-label") || "";
    const firstTheme = sections[0].getAttribute("data-section-theme");
    if (labelRef.current) {
      labelRef.current.textContent = firstLabel;
      currentLabelRef.current = firstLabel;
    }
    if (numberRef.current) {
      numberRef.current.textContent = "01";
    }
    setIsDark(firstTheme === "dark");

    // 為每個 section 建立 ScrollTrigger
    sections.forEach((section, index) => {
      const label = section.getAttribute("data-section-label") || "";
      const theme = section.getAttribute("data-section-theme");

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => switchLabel(label, index, theme),
        onEnterBack: () => switchLabel(label, index, theme),
      });
    });

    function switchLabel(newLabel: string, activeIndex: number, theme: string | null) {
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
    }
  });

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
