"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CustomScrollbar = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;

    // 用 ScrollTrigger 監聽整頁滾動進度，驅動 thumb 位置
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        // thumb 可移動的最大距離 = 軌道高度 - thumb 高度
        const track = trackRef.current;
        if (!track) return;
        const maxY = track.clientHeight - thumb.clientHeight;
        gsap.set(thumb, { y: self.progress * maxY });
      },
    });
  });

  return (
    <div
      ref={trackRef}
      className="fixed right-7 top-1/2 -translate-y-1/2 z-50 hidden lg:block h-[20vh] w-1.5 rounded-full bg-foreground/10"
    >
      <div
        ref={thumbRef}
        className="w-1.5 h-7 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.4)]"
      />
    </div>
  );
};

export default CustomScrollbar;
