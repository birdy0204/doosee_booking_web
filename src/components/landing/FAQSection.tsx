"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { fontSize, textColor } from "@/constants/landing-styles";
import { useFaqList } from "@/hooks/useFaqs";

gsap.registerPlugin(ScrollTrigger);

// ==================== 主元件 ====================

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const { data } = useFaqList({ maxResultCount: 50, sorting: "SortOrder ASC" });

  // 只顯示已發佈的 FAQ
  const faqItems = (data?.items ?? []).filter((item) => item.isPublished);

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

  if (faqItems.length === 0) return null;

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
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
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
