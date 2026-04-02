"use client";

import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Clock, Shield, Gift } from "lucide-react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { fontSize, textColor } from "@/constants/landing-styles";
import ContactFormModal from "@/components/landing/ContactFormModal";

gsap.registerPlugin(ScrollTrigger);

// ==================== 優惠方案資料 ====================

const PROMOTION_END_DATE = new Date("2026-04-30T23:59:59");

interface Plan {
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  recommended?: boolean;
}

const plans: Plan[] = [
  {
    name: "免費體驗",
    price: "免費",
    period: "14 天",
    description: "零風險體驗全功能，免綁定信用卡",
    features: ["全功能 14 天試用", "免綁定信用卡", "基礎數據報表", "線上客服支援"],
    cta: "立即免費體驗",
  },
  {
    name: "創業啟航",
    price: "NT$990",
    originalPrice: "NT$1,980",
    period: "/ 月",
    description: "首 3 個月 5 折，最適合成長中的美業品牌",
    features: [
      "首 3 個月 5 折優惠",
      "專屬客戶成功顧問",
      "LINE 官方帳號串接",
      "進階數據分析報表",
      "多門市管理功能",
    ],
    cta: "立即開始",
    recommended: true,
  },
  {
    name: "年度夥伴",
    price: "NT$1,580",
    originalPrice: "NT$1,980",
    period: "/ 月（年繳）",
    description: "年繳享 8 折，額外贈送 2 個月使用權",
    features: [
      "年繳 8 折優惠",
      "贈送 2 個月使用權",
      "優先專屬客服通道",
      "客製化品牌頁面",
      "API 串接支援",
    ],
    cta: "了解更多",
  },
];

const trustItems = [
  { icon: Shield, text: "資料加密保護" },
  { icon: Gift, text: "免費教育訓練" },
  { icon: Clock, text: "24 小時內專人回覆" },
];

// ==================== 倒數計時器 ====================

function CountdownTimer({ endDate }: { endDate: Date }) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    setMounted(true);

    function calculate() {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance <= 0) {
        setExpired(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  if (expired) {
    return (
      <p className={`${fontSize.body} text-white/70`}>活動已結束</p>
    );
  }

  const blocks = [
    { value: mounted ? timeLeft.days : "--", label: "天" },
    { value: mounted ? timeLeft.hours : "--", label: "時" },
    { value: mounted ? timeLeft.minutes : "--", label: "分" },
    { value: mounted ? timeLeft.seconds : "--", label: "秒" },
  ];

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {blocks.map((block, i) => (
        <div key={block.label} className="flex items-center gap-2 md:gap-3">
          <div className="bg-white/10 rounded-xl px-3 py-2 md:px-4 md:py-3 min-w-[56px] md:min-w-[68px] text-center">
            <span className="text-xl md:text-2xl font-bold text-white tabular-nums block">
              {typeof block.value === "number"
                ? String(block.value).padStart(2, "0")
                : block.value}
            </span>
            <span className="text-xs text-white/60">{block.label}</span>
          </div>
          {i < blocks.length - 1 && (
            <span className="text-white/40 text-xl font-bold">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ==================== 方案卡片 ====================

function PlanCard({ plan, onOpenModal }: { plan: Plan; onOpenModal?: () => void }) {
  const isRecommended = plan.recommended;

  return (
    <div
      className={`relative rounded-2xl p-6 md:p-8 flex flex-col transition-transform duration-300 ${
        isRecommended
          ? "bg-white/10 border-2 border-primary lg:scale-105 order-first md:order-none"
          : "bg-white/5 border border-white/10"
      }`}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Chip classNames={{ base: "bg-primary border-0 px-4 py-1", content: "text-primary-foreground text-sm" }}>
            最多人選擇
          </Chip>
        </div>
      )}

      <div className="mb-6">
        <h3 className={`${fontSize.subtitle} font-bold text-white mb-2`}>{plan.name}</h3>
        <p className="text-white/60 text-sm">{plan.description}</p>
      </div>

      <div className="mb-6">
        {plan.originalPrice && (
          <span className="text-white/40 line-through text-sm mr-2">{plan.originalPrice}</span>
        )}
        <span className="text-3xl md:text-4xl font-bold text-white">{plan.price}</span>
        <span className="text-white/60 text-sm ml-1">{plan.period}</span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-white/80 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        onPress={onOpenModal}
        className={`w-full rounded-xl py-6 ${fontSize.button} font-semibold cursor-pointer ${
          isRecommended
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
        }`}
      >
        {plan.cta}
      </Button>
    </div>
  );
}

// ==================== 主元件 ====================

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 標題區動畫
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );

      // 卡片動畫
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }

      // 信任元素動畫
      gsap.fromTo(
        trustRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trustRef.current,
            start: "top 90%",
            end: "top 70%",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="pricing"
      data-section-label="優惠方案"
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden bg-foreground"
      data-section-theme="dark"
    >
      {/* 橙色徑向光暈裝飾 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* 標題區 */}
        <div ref={headerRef} className="text-center mb-12 lg:mb-16">
          <Chip
            startContent={<Clock className="w-3.5 h-3.5" />}
            classNames={{ base: "bg-primary/20 border-primary/30 mb-6 px-4 py-1.5", content: "text-primary" }}
          >
            限時優惠
          </Chip>

          <h2 className={`${fontSize.headingXl} font-bold ${textColor.onDark} mb-4`}>
            現在加入，享最優惠方案
          </h2>
          <p className={`${fontSize.bodyLg} ${textColor.onDarkMuted} mb-8 max-w-2xl mx-auto`}>
            限時推出早鳥優惠，讓你以最低成本開始數位轉型之旅
          </p>

          <div className="flex justify-center">
            <CountdownTimer endDate={PROMOTION_END_DATE} />
          </div>
        </div>

        {/* 方案卡片 */}
        <ContactFormModal>
          {(onOpen) => (
            <div
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12 lg:mb-16"
            >
              {plans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} onOpenModal={onOpen} />
              ))}
            </div>
          )}
        </ContactFormModal>

        {/* 信任元素 */}
        <div
          ref={trustRef}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-white/70 text-sm">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
