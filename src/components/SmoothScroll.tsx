"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 全域註冊 ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 模組層級的 Lenis 實例引用，供其他元件透過 getLenis() 存取
let lenisInstance: Lenis | null = null;
export function getLenis() {
  return lenisInstance;
}

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // 同步 Lenis 滾動事件到 ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 使用 GSAP ticker 驅動 Lenis（取代自訂 raf 迴圈）
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000); // GSAP ticker 的 time 是秒，Lenis 需要毫秒
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
