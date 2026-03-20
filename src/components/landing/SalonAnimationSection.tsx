"use client";

import { useRef, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { fontSize, textColor } from "@/constants/landing-styles";
import { useFramePreload, FRAME_COUNT } from "@/contexts/FramePreloadContext";

gsap.registerPlugin(ScrollTrigger);

// 滾動過程中依序出現的文字介紹
const scrollCaptions = [
  {
    title: "各種服務，輕鬆管理",
    description: "讓每位顧客都能在最適合的時間，找到最適合的服務",
  },
  {
    title: "數據驅動，精準經營",
    description: "從預約到結帳，每個環節都為你的商店量身打造",
  },
  {
    title: "美好體驗，從預約開始",
    description: "Doosee — 你的美業數位夥伴",
  },
];

// ==================== 主元件 ====================

const SalonAnimationSection = () => {
  const { images } = useFramePreload();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  // 在 canvas 上繪製指定幀（object-fit: cover 模式）
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img?.complete || !img.naturalWidth) return;

    // 手機限制 DPR 最高為 2，避免過大 canvas buffer 導致效能問題
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    // 僅在尺寸改變時重設 canvas buffer
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cover 模式：圖片完整覆蓋 canvas，裁剪超出部分
    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;

    ctx.drawImage(
      img,
      x,
      y,
      img.naturalWidth * scale,
      img.naturalHeight * scale
    );
  }, []);

  // 從 context 取得已預載的圖片（不重複載入）
  useEffect(() => {
    if (images.length === 0) return;
    imagesRef.current = images;

    // 第一幀可用時立即繪製
    const firstImg = images[0];
    if (firstImg.complete && firstImg.naturalWidth) {
      drawFrame(0);
    } else {
      firstImg.addEventListener("load", () => drawFrame(0), { once: true });
    }

    // 視窗 resize 時重新繪製當前幀（debounce 避免手機網址列收合頻繁觸發）
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => drawFrame(currentFrameRef.current), 200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [images, drawFrame]);

  // GSAP ScrollTrigger 控制幀切換 + 文字動畫
  useGSAP(
    () => {
      const heroText = heroTextRef.current;
      const captions = captionRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!heroText) return;

      // 初始狀態
      gsap.set(heroText, { opacity: 1, y: 0 });
      captions.forEach((el) => gsap.set(el, { opacity: 0, y: 40 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          pinType: "fixed",
          scrub: 0.5,
          start: "top top",
          end: "+=300%",
          invalidateOnRefresh: true,
        },
      });

      // 序列幀動畫（0 ~ 1）
      const frameObj = { frame: 0 };
      tl.to(
        frameObj,
        {
          frame: FRAME_COUNT - 1,
          snap: "frame",
          ease: "none",
          duration: 1,
          onUpdate: () => {
            const frameIndex = Math.round(frameObj.frame);
            if (frameIndex !== currentFrameRef.current) {
              currentFrameRef.current = frameIndex;
              drawFrame(frameIndex);
            }
          },
        },
        0
      );

      // Hero 文字在前 15% 滾動時淡出並上移
      tl.to(
        heroText,
        {
          opacity: 0,
          y: -60,
          ease: "power2.in",
          duration: 0.15,
        },
        0
      );

      // 滾動文字介紹依序出現、停留、消失
      // 每段文字佔用約 20% 的滾動距離（淡入 5% → 停留 10% → 淡出 5%）
      const captionCount = captions.length;
      const startOffset = 0.2; // 第一段文字在 20% 處開始
      const segmentDuration = (0.95 - startOffset) / captionCount; // 均分剩餘空間
      const fadeIn = segmentDuration * 0.25;
      const fadeOut = segmentDuration * 0.25;

      captions.forEach((el, i) => {
        const segStart = startOffset + i * segmentDuration;
        const isLast = i === captionCount - 1;

        // 淡入 + 上移
        tl.to(
          el,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: fadeIn,
          },
          segStart
        );

        // 最後一段不淡出，留在畫面上
        if (!isLast) {
          tl.to(
            el,
            {
              opacity: 0,
              y: -30,
              ease: "power2.in",
              duration: fadeOut,
            },
            segStart + segmentDuration - fadeOut
          );
        }
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="hero"
      data-section-label="首頁"
      data-section-theme="dark"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#d9c4bc] touch-pan-y"
    >
      {/* 序列幀 Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 半透明漸層遮罩，讓文字更清晰 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent pointer-events-none" />

      {/* Hero 文字覆蓋層 */}
      <div
        ref={heroTextRef}
        className="relative z-10 container mx-auto px-4 lg:px-6 flex items-center h-full"
      >
        <div className="w-full">
          <h1
            className={`${fontSize.hero} font-bold ${textColor.onDark} mb-6 leading-[1.4]`}
          >
            <span className="block">完成你，</span>
            <span className="block mt-4">看見的美好!</span>
          </h1>
          <div className="max-w-full lg:max-w-[42%]">
            <p className={`${fontSize.bodyLg} ${textColor.onDarkMuted}`}>
              陪伴美業人，用數位化完成夢想
            </p>
          </div>
        </div>
      </div>

      {/* 滾動過程中依序出現的文字介紹 */}
      {scrollCaptions.map((caption, i) => {
        const isLast = i === scrollCaptions.length - 1;
        return (
          <div
            key={caption.title}
            ref={(el) => {
              captionRefs.current[i] = el;
            }}
            className={`absolute inset-0 z-10 flex items-center justify-center ${
              isLast ? "" : "pointer-events-none"
            }`}
          >
            <div className="text-center px-6 max-w-2xl">
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColor.onDark} mb-4 drop-shadow-lg`}
              >
                {caption.title}
              </h2>
              <p
                className={`${fontSize.bodyLg} ${textColor.onDarkMuted} drop-shadow-md`}
              >
                {caption.description}
              </p>
              {isLast && (
                <Button
                  size="lg"
                  className={`${fontSize.button} mt-8 px-12 py-8 font-semibold bg-white text-gray-900 hover:bg-white/90 hover:scale-105 transition-all rounded-full`}
                >
                  立即體驗
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default SalonAnimationSection;
