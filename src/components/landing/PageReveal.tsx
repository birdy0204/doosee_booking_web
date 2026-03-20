"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import DooseeLogo from "./DooseeLogo";
import { useFramePreload } from "@/contexts/FramePreloadContext";

const PageReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const displayProgress = useRef({ value: 0 });
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);
  const exitPlayed = useRef(false);
  const [mounted, setMounted] = useState(false);

  const { progress, ready } = useFramePreload();

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Logo 入場動畫 ──
  useEffect(() => {
    if (!mounted || !logoRef.current) return;

    // 鎖定滾動
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Logo 彈入
    gsap.fromTo(
      logoRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
    );

    // Logo 持續跳動（載入期間）
    gsap.to(logoRef.current, {
      scale: 1.06,
      duration: 0.25,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5,
    });
  }, [mounted]);

  // ── 即時追蹤真實進度（0% → 95%）──
  useEffect(() => {
    if (!mounted || exitPlayed.current) return;
    const bar = barRef.current;
    const numberEl = numberRef.current;
    if (!bar || !numberEl) return;

    const target = progress * 95;

    progressTweenRef.current?.kill();
    progressTweenRef.current = gsap.to(displayProgress.current, {
      value: target,
      duration: 0.4,
      ease: "power1.out",
      onUpdate: () => {
        const v = Math.round(displayProgress.current.value);
        numberEl.textContent = String(v);
        gsap.set(bar, { scaleX: v / 100 });
      },
    });
  }, [progress, mounted]);

  // ── 載入完成 → 95% → 100% 緩衝 → 退場 ──
  useEffect(() => {
    if (!ready || !mounted || exitPlayed.current) return;
    exitPlayed.current = true;

    // 停止進度追蹤 tween 與 Logo 跳動
    progressTweenRef.current?.kill();
    gsap.killTweensOf(logoRef.current);

    const container = containerRef.current;
    const bar = barRef.current;
    const numberEl = numberRef.current;
    if (!container || !bar || !numberEl) return;

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        container.style.display = "none";
      },
    });

    // 從當前進度平滑過渡到 100%
    tl.to(displayProgress.current, {
      value: 100,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        const v = Math.round(displayProgress.current.value);
        numberEl.textContent = String(v);
        gsap.set(bar, { scaleX: v / 100 });
      },
    });

    // 短暫停頓讓使用者看到 100
    tl.to({}, { duration: 0.3 });

    // 整個白幕向上滑出
    tl.to(container, {
      yPercent: -100,
      duration: 0.8,
      ease: "expo.in",
    });
  }, [ready, mounted]);

  const overlay = (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      aria-hidden="true"
    >
      {/* 左上角 Loading 大字 */}
      <span className="absolute top-8 left-8 md:top-12 md:left-16 text-4xl md:text-6xl font-black tracking-tight text-gray-100 select-none">
        Loading
      </span>

      {/* Logo 置中 */}
      <div ref={logoRef} className="relative z-10">
        <DooseeLogo
          className="h-32 md:h-48 w-auto"
          textColor="#1a1a1a"
          animate={false}
        />
      </div>

      {/* 底部：進度條 + 大數字同一排 */}
      <div className="absolute bottom-10 left-0 right-0 px-8 md:px-16 z-10 flex items-center gap-6">
        {/* 進度條 */}
        <div className="flex-1 h-[6px] rounded-full bg-gray-200 overflow-hidden">
          <div
            ref={barRef}
            className="h-full w-full origin-left rounded-full bg-primary"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        {/* 大數字 */}
        <span
          ref={numberRef}
          className="text-[12vw] md:text-[8vw] font-black tracking-tighter text-gray-200 select-none leading-none tabular-nums shrink-0 w-[25vw] md:w-[17vw] text-right"
        >
          0
        </span>
      </div>
    </div>
  );

  if (!mounted) return overlay;
  return createPortal(overlay, document.body);
};

export default PageReveal;
