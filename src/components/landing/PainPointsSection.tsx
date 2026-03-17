"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SquareCheck, UserRound, Store, Factory } from "lucide-react";
import { fontSize, textColor } from "@/constants/landing-styles";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ImageConfig {
  src: string;
  width: number;
  height: number;
  /** 圖片容器寬度 class */
  containerClass: string;
  /** 圖片容器負 margin + 偏移 class */
  positionClass: string;
  /** 圖片本身的額外 class（獨立於文字） */
  imageClass?: string;
}

interface PainPointGroup {
  icon: LucideIcon;
  role: string;
  highlight: string;
  items: string[];
  image?: ImageConfig;
  bgColor: string;
}

const painPointGroups: PainPointGroup[] = [
  {
    icon: Store,
    role: "在管理預約時常遇到的問題：",
    highlight: "店家",
    image: {
      src: "/store.png",
      width: 500,
      height: 500,
      containerClass: "w-[36%] max-w-[540px]",
      positionClass: "ml-[-10%] top-0",
      imageClass: "translate-y-10",
    },
    bgColor: "#fef3e2",
    items: [
      "回覆 LINE 訊息很費時費力",
      "網頁預約可能導致低效時段也有預約產生",
      "大型預約網站的刊登費用昂貴",
      "來自多個預約平台的預約，管理起來非常繁瑣",
      "電話預約影響接待與服務專注度",
      "希望提高回頭客的來店頻率",
    ],
  },
  {
    icon: UserRound,
    role: "在預約時常遇到的問題：",
    highlight: "回頭客",
    image: {
      src: "/customer.png",
      width: 460,
      height: 460,
      containerClass: "w-[30%] max-w-[460px]",
      positionClass: "mr-[-6%] top-10",
    },
    bgColor: "#eff4f2",
    items: [
      "透過 LINE 預約時，無法即時收到回覆",
      "網頁預約時需要填寫過多資訊",
      "希望由平常的負責人來服務並選擇慣用的服務項目",
      "營業時間外無法撥打電話",
      "打電話預約很麻煩，還需要支付通話費",
      "服務項目過多，難以瀏覽",
    ],
  },
  {
    icon: Factory,
    role: "在經營合作時常遇到的問題：",
    highlight: "廠商",
    image: {
      src: "/DeliveryMan.png",
      width: 500,
      height: 500,
      containerClass: "w-[32%] max-w-[500px]",
      positionClass: "ml-[-10%] top-10",
    },
    bgColor: "#eeecf6",
    items: [
      "產品推廣管道有限，難以直接觸及終端店家",
      "缺乏店家實際銷售數據，備貨全靠經驗估算",
      "促銷活動訊息傳遞效率低，店家常漏接",
      "與店家對帳流程繁瑣，容易出錯",
      "無法精準掌握各店的進貨週期與偏好",
      "業務拜訪成本高，合作關係難以規模化",
    ],
  },
];

const PainPointsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;

      // 卡片從側邊滑入
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const isRight = index % 2 === 1;

        gsap.fromTo(
          card,
          {
            x: isRight ? 120 : -120,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });

      // 背景色漸變 — 使用回呼觸發 + overwrite，避免多個 scrub tween 同時控制同一屬性造成衝突
      if (section) {
        const initialBg = getComputedStyle(section).backgroundColor;

        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          ScrollTrigger.create({
            trigger: card,
            start: "top 70%",
            onEnter: () => {
              gsap.to(section, {
                backgroundColor: painPointGroups[index].bgColor,
                duration: 0.6,
                ease: "power1.inOut",
                overwrite: true,
              });
            },
            onLeaveBack: () => {
              const prevColor =
                index > 0 ? painPointGroups[index - 1].bgColor : initialBg;
              gsap.to(section, {
                backgroundColor: prevColor,
                duration: 0.6,
                ease: "power1.inOut",
                overwrite: true,
              });
            },
          });
        });
      }
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="pain-points"
      data-section-label="常見困擾"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-muted/30"
    >
      <div className="container mx-auto px-4">
        {/* 標題 */}
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold ${textColor.onLight}`}
          >
            您是否有這些困擾？
          </h2>
          <p
            className={`${fontSize.bodyLg} ${textColor.onLightMuted} mt-4 max-w-2xl mx-auto`}
          >
            無論是回頭客、店家還是廠商，現有的預約與經營模式都存在痛點
          </p>
        </div>

        {/* 交錯排列卡片 */}
        <div className="flex flex-col gap-[20vh] max-w-6xl mx-auto">
          {painPointGroups.map((group, groupIndex) => {
            const Icon = group.icon;
            const isRight = groupIndex % 2 === 1;
            return (
              <div
                key={group.highlight}
                ref={(el) => {
                  cardRefs.current[groupIndex] = el;
                }}
                className={`flex items-end gap-0 w-full ${
                  isRight ? "lg:justify-end" : "lg:justify-start"
                }`}
              >
                {/* 右側卡片：圖片在左 */}
                {isRight && group.image && (
                  <div className={`hidden lg:flex flex-col items-center shrink-0 relative z-0 ${group.image.positionClass} ${group.image.containerClass}`}>
                    <h3 className={`${fontSize.body} font-semibold ${textColor.onLight} mb-2 text-center`}>
                      {group.role}
                      <span className="text-primary underline decoration-primary/40 underline-offset-4">
                        {group.highlight}
                      </span>
                    </h3>
                    <Image
                      src={group.image.src}
                      alt={group.highlight}
                      width={group.image.width}
                      height={group.image.height}
                      className={`object-contain w-full h-auto ${group.image.imageClass || ""}`}
                    />
                  </div>
                )}

                <div className="p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 w-full lg:w-[75%] lg:max-w-[850px] lg:shrink-0 relative z-10">
                  {/* 卡片標題：僅在無圖片或手機版顯示 */}
                  <div className={`flex items-center gap-3 mb-6 ${group.image ? "lg:hidden" : ""}`}>
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3
                      className={`${fontSize.body} font-semibold ${textColor.onLight}`}
                    >
                      {group.role}
                      <span className="text-primary underline decoration-primary/40 underline-offset-4">
                        {group.highlight}
                      </span>
                    </h3>
                  </div>

                  {/* 痛點列表 */}
                  <ul className="space-y-4">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 items-start">
                        <SquareCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span
                          className={`${fontSize.tag} ${textColor.onLightMuted} leading-relaxed`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 左側卡片：圖片在右 */}
                {!isRight && group.image && (
                  <div className={`hidden lg:flex flex-col items-center shrink-0 relative z-20 ${group.image.positionClass} ${group.image.containerClass}`}>
                    <h3 className={`${fontSize.body} font-semibold ${textColor.onLight} mb-2 text-center`}>
                      {group.role}
                      <span className="text-primary underline decoration-primary/40 underline-offset-4">
                        {group.highlight}
                      </span>
                    </h3>
                    <Image
                      src={group.image.src}
                      alt={group.highlight}
                      width={group.image.width}
                      height={group.image.height}
                      className={`object-contain w-full h-auto ${group.image.imageClass || ""}`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
