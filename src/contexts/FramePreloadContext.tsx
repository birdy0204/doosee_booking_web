"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";

// 序列幀常數（與 SalonAnimationSection 共用）
export const FRAME_COUNT = 192;
export const getFrameSrc = (index: number) =>
  `/frame/frame_${String(index).padStart(3, "0")}_delay-0.041s.webp`;

interface FramePreloadContextType {
  images: HTMLImageElement[];
  /** 載入進度 0 ~ 1 */
  progress: number;
  /** 所有圖片是否已載入完成 */
  ready: boolean;
}

const FramePreloadContext = createContext<FramePreloadContextType>({
  images: [],
  progress: 0,
  ready: false,
});

export const useFramePreload = () => useContext(FramePreloadContext);

export function FramePreloadProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const loadedCount = useRef(0);
  const rafId = useRef(0);

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];

    // 將進度更新合併到下一個 animation frame，避免過於頻繁的 re-render
    const flush = () => {
      const p = loadedCount.current / FRAME_COUNT;
      setProgress(p);
      if (loadedCount.current >= FRAME_COUNT) setReady(true);
      rafId.current = 0;
    };

    const handleLoad = () => {
      loadedCount.current++;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(flush);
      }
      // 最後一張：確保立即觸發（避免被 rAF 延遲）
      if (loadedCount.current >= FRAME_COUNT) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
        flush();
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.addEventListener("load", handleLoad);
      img.addEventListener("error", handleLoad); // 載入失敗也計入進度
      img.src = getFrameSrc(i);
      imgs.push(img);
    }

    setImages(imgs);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const value = useMemo(
    () => ({ images, progress, ready }),
    [images, progress, ready],
  );

  return (
    <FramePreloadContext.Provider value={value}>
      {children}
    </FramePreloadContext.Provider>
  );
}
