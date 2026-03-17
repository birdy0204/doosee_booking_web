"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MenuOverlay from "./MenuOverlay";
import DooseeLogo from "./DooseeLogo";
import { textColor, LOGO_SCROLL_END } from "@/constants/landing-styles";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(true);
  const menuTextRef = useRef<HTMLSpanElement>(null);

  // Menu 文字隨滾動淡出（與 DooseeLogo 同步，共用 LOGO_SCROLL_END）
  useGSAP(() => {
    if (!menuTextRef.current) return;
    gsap.to(menuTextRef.current, {
      opacity: 0,
      y: -20,
      scrollTrigger: {
        start: "top top",
        end: LOGO_SCROLL_END,
        scrub: 0.3,
      },
    });
  }, { dependencies: [mounted] });

  useEffect(() => {
    setMounted(true);
  }, []);

  // 偵測是否在深色背景的 section（與 SectionIndicator 統一使用 ScrollTrigger）
  useGSAP(() => {
    const darkSections = gsap.utils.toArray<HTMLElement>(
      '[data-section-theme="dark"]'
    );
    darkSections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        // top-=1：給 1px 緩衝，避免 scroll=0 時恰好在邊界導致 trigger 判定為未啟動
        start: "top-=1 top",
        end: "bottom top",
        onToggle: ({ isActive }) => setIsDarkSection(isActive),
      });
    });
  }, { dependencies: [mounted] });

  // 首頁（深色背景）：白底黑 icon；其他頁面（淺色背景）：黑底白 icon
  const btnBg = isDarkSection ? "bg-white" : "bg-black";
  const btnLine = isDarkSection ? "bg-black" : "bg-white";
  const menuTextColor = isDarkSection ? textColor.onDark : textColor.onLight;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full pr-9 py-9 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <DooseeLogo />
          </Link>
          <div className="w-[50px] h-[50px]" />
        </div>
      </header>

      {mounted &&
        createPortal(
          <>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="fixed top-9 right-9 z-[60] flex items-center gap-3 group"
              aria-label={isMenuOpen ? "關閉選單" : "開啟選單"}
            >
              <span
                ref={menuTextRef}
                className={`text-[26px] font-medium tracking-wider ${
                  isMenuOpen ? "invisible" : menuTextColor
                }`}
              >
                Menu
              </span>
              <div
                className={`w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-500 ${
                  isMenuOpen ? "bg-white" : btnBg
                }`}
              >
                <div className="w-[18px] h-[12px] flex flex-col justify-between items-center">
                  <span
                    className={`block w-full h-[1.5px] rounded-full transition-all duration-500 origin-center ${
                      isMenuOpen
                        ? "bg-foreground rotate-45 translate-y-[5.25px]"
                        : btnLine
                    }`}
                  />
                  <span
                    className={`block w-full h-[1.5px] rounded-full transition-all duration-500 ${
                      isMenuOpen
                        ? "bg-foreground opacity-0 scale-x-0"
                        : btnLine
                    }`}
                  />
                  <span
                    className={`block w-full h-[1.5px] rounded-full transition-all duration-500 origin-center ${
                      isMenuOpen
                        ? "bg-foreground -rotate-45 -translate-y-[5.25px]"
                        : btnLine
                    }`}
                  />
                </div>
              </div>
            </button>

            <MenuOverlay
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
            />
          </>,
          document.body
        )}
    </>
  );
};

export default Header;
