"use client";

import { useState, useEffect } from "react";

const LandscapeOverlay = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // 只在手機尺寸（寬度小於 768px 或高度小於 500px）時偵測橫屏
      const isMobile = window.innerWidth < 768 || window.innerHeight < 500;
      const isLandscapeMode = window.innerWidth > window.innerHeight;
      setIsLandscape(isMobile && isLandscapeMode);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!isLandscape) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center gap-6 text-white">
      {/* 旋轉手機圖示 */}
      <div className="animate-[spin-slow_2s_ease-in-out_infinite_alternate]">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <line x1="12" y1="18" x2="12" y2="18.01" />
        </svg>
      </div>
      <p className="text-lg font-medium">請將手機轉為直向瀏覽</p>
      <p className="text-sm text-white/60">以獲得最佳瀏覽體驗</p>

      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LandscapeOverlay;
