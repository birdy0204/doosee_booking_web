"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { fontSize, textColor } from "@/constants/landing-styles";

gsap.registerPlugin(ScrollTrigger);

// ==================== 常見問題資料 ====================

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Doosee 適合哪些類型的美業店家？",
    answer:
      "Doosee 適用於所有美業類型，包含髮廊、美甲、美睫、美容 SPA、紋繡、醫美診所等。無論您是個人工作室、單店經營還是多門市連鎖品牌，都能找到最適合的使用方式。",
  },
  {
    question: "免費試用期間有功能限制嗎？",
    answer:
      "沒有！14 天免費試用期間可以使用 Doosee 的所有完整功能，包含預約管理、顧客管理、數據報表等，讓您充分體驗系統帶來的便利。試用期間無需綁定信用卡，結束後不會自動扣款。",
  },
  {
    question: "導入 Doosee 需要多久時間？",
    answer:
      "從帳號開通到正式上線，最快只需要 1-3 個工作天。我們的專屬顧問會協助您完成初始設定、資料匯入與教育訓練，確保您和團隊都能順利上手。",
  },
  {
    question: "可以從其他系統搬遷過來嗎？",
    answer:
      "可以！我們提供免費的資料搬遷服務，協助您將現有的顧客資料、預約紀錄等從舊系統匯入 Doosee。專屬顧問會全程協助，確保資料完整無遺漏。",
  },
  {
    question: "Doosee 支援哪些付款方式？",
    answer:
      "我們支援信用卡（Visa、MasterCard、JCB）及銀行轉帳等付款方式。年繳方案還可享有額外折扣優惠。",
  },
  {
    question: "系統當機或遇到問題怎麼辦？",
    answer:
      "Doosee 採用雲端架構，系統穩定度達 99.9%。若遇到任何問題，我們提供即時線上客服支援，付費方案更享有優先專屬客服通道，確保在 24 小時內回覆並解決您的問題。",
  },
  {
    question: "合約期間可以升級或降級方案嗎？",
    answer:
      "當然可以！您可以隨時升級方案以享受更多功能。降級方案則會在當期結束後生效。我們的顧問會根據您的使用需求，推薦最適合的方案。",
  },
];

// ==================== 主元件 ====================

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 標題動畫
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // 手風琴容器動畫
      gsap.fromTo(
        accordionRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: accordionRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="faq"
      data-section-label="常見問題"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-secondary"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24">
          {/* 左側標題 */}
          <div ref={headerRef} className="mb-10 lg:mb-0 lg:w-[340px] xl:w-[400px] shrink-0 lg:sticky lg:top-28 lg:self-start">
            <h2
              className={`${fontSize.headingXl} font-bold ${textColor.onLight} tracking-tight`}
            >
              常見問題
            </h2>
            <p
              className={`${fontSize.bodyLg} ${textColor.onLightMuted} mt-4`}
            >
              關於 Doosee 的一切，這裡都有答案。
            </p>
          </div>

          {/* 右側收折選單 */}
          <div ref={accordionRef} className="flex-1 min-w-0">
            <Accordion
              selectionMode="multiple"
              variant="splitted"
              itemClasses={{
                base: "bg-white !shadow-sm rounded-2xl px-5 lg:px-6 !border-none",
                title: `${fontSize.body} font-semibold ${textColor.onLight}`,
                trigger: "py-5 lg:py-6 hover:text-primary transition-colors",
                content: `${fontSize.tag} ${textColor.onLightMuted} leading-relaxed pb-5 lg:pb-6`,
                indicator: `${textColor.onLightMuted}`,
              }}
            >
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  aria-label={item.question}
                  title={item.question}
                >
                  {item.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
