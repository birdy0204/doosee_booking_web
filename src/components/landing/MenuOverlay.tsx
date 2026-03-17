"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "首頁", href: "/" },
  { label: "功能介紹", href: "/features" },
  { label: "關於我們", href: "/about" },
  { label: "聯絡我們", href: "/#contact" },
];

const subMenuItems = [
  { label: "線上預約管理", href: "/features" },
  { label: "顧客關係經營", href: "/features" },
  { label: "數據分析", href: "/features" },
];

const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const isFirstRender = useRef(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const subItemsRef = useRef<HTMLUListElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!panelRef.current) return;

    const pageContent = document.getElementById("page-content");
    if (!pageContent) return;

    // 跳過初次渲染的關閉動畫
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();

      // 選單面板從上方滑入，頁面內容同步往下推
      tl.to(
        panelRef.current,
        {
          y: "0%",
          duration: 0.8,
          ease: "power3.inOut",
        },
        0
      );

      tl.to(
        pageContent,
        {
          y: "70vh",
          duration: 0.8,
          ease: "power3.inOut",
        },
        0
      );

      // 選單項目依序淡入
      if (menuItemsRef.current) {
        tl.from(
          menuItemsRef.current.children,
          {
            y: 80,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.4
        );
      }

      if (subItemsRef.current) {
        tl.from(
          subItemsRef.current.children,
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.6
        );
      }

      if (bottomRef.current) {
        tl.from(
          bottomRef.current.children,
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.7
        );
      }

      if (topBarRef.current) {
        tl.from(
          topBarRef.current,
          {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          0.4
        );
      }
    } else {
      document.body.style.overflow = "";

      const tl = gsap.timeline();

      // 選單收回上方，頁面內容回到原位
      tl.to(
        panelRef.current,
        {
          y: "-100%",
          duration: 0.6,
          ease: "power3.inOut",
        },
        0
      );

      tl.to(
        pageContent,
        {
          y: 0,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            // 清除 transform，避免影響內部 fixed 元素的定位
            gsap.set(pageContent, { clearProps: "transform" });
          },
        },
        0
      );
    }
  }, [isOpen]);

  return (
    <nav
      ref={panelRef}
      className="fixed inset-0 z-[55]"
      style={{ transform: "translateY(-100%)" }}
    >
      {/* 聯絡我們 — 絕對定位對齊 Menu 文字 */}
      <div
        ref={topBarRef}
        className="absolute top-9 right-[98px] z-10 flex items-center h-[50px]"
      >
        <Link
          href="/#contact"
          onClick={onClose}
          className="rounded-full border border-background/30 px-6 py-2.5 text-sm text-background hover:bg-background hover:text-foreground transition-colors duration-300"
        >
          聯絡我們
        </Link>
      </div>

      <div className="h-full flex">
        {/* 左側：圖片 */}
        <div className="hidden md:block w-[45%] h-full relative">
          <img
            src="/hero-stylist.jpg"
            alt="專業美髮師"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 右側：選單內容 */}
        <div className="w-full md:w-[55%] h-full bg-foreground text-background flex flex-col px-8 md:px-16 py-8 pt-24">

          {/* 中間區域：主選單 + 副選單 */}
          <div className="flex-1 flex flex-col md:flex-row gap-12 md:gap-20">
            <ul ref={menuItemsRef} className="flex flex-col gap-2 md:gap-3">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block text-5xl md:text-7xl font-light text-background hover:text-primary transition-colors duration-300 leading-[1.15]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul
              ref={subItemsRef}
              className="flex flex-col gap-3 md:mt-auto md:mb-8"
            >
              {subMenuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-sm md:text-base italic text-background/70 hover:text-primary transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 底部資訊 */}
          <div
            ref={bottomRef}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-8 border-t border-background/10"
          >
            <span className="text-sm text-background/50">
              © {new Date().getFullYear()} Doosee
            </span>
            <div className="flex gap-6">
              <a
                href="tel:02-1234-5678"
                className="text-sm text-background/70 hover:text-background transition-colors"
              >
                02-1234-5678
              </a>
              <a
                href="mailto:contact@doosee.com"
                className="text-sm text-background/70 hover:text-background transition-colors"
              >
                contact@doosee.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MenuOverlay;
