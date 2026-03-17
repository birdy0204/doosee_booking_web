import { CalendarX2, TrendingDown, Unplug } from 'lucide-react';
import { fontSize, textColor } from '@/constants/landing-styles';

const painPoints = [
  {
    icon: CalendarX2,
    title: '排班靠紙本，預約靠電話？',
    description:
      '手動排班容易出錯、電話預約容易漏接，設計師和店家都在浪費寶貴時間。',
  },
  {
    icon: TrendingDown,
    title: '業績好不好，全憑感覺？',
    description:
      '沒有完整的數據追蹤，難以掌握營收趨勢，行銷活動效果無從評估。',
  },
  {
    icon: Unplug,
    title: '預約一套、收銀一套、會員又一套？',
    description:
      '多系統切換不僅效率低落，顧客資料也無法串通，服務體驗大打折扣。',
  },
];

const stats = [
  { number: '8+ 年', label: '深耕美業數位化' },
  { number: '3 大平台', label: '完整覆蓋經營環節' },
  { number: '1,000+', label: '店家信賴使用' },
];

const WhatIsDooseeSection = () => {
  return (
    <section
      id="about"
      data-section-label="關於 Doosee"
      className="py-16 md:py-20 lg:py-28 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-16">
          {/* 左側：文字 + 數據 */}
          <div className="lg:w-1/2">
            <span
              className={`${fontSize.tag} font-medium text-primary mb-3 md:mb-4 inline-block`}
            >
              關於 Doosee
            </span>
            <h2
              className={`${fontSize.headingLg} font-bold ${textColor.onLight} mb-4 md:mb-6 leading-tight`}
            >
              專為美業打造的
              <br />
              一站式數位夥伴
            </h2>
            <p
              className={`${fontSize.body} ${textColor.onLightMuted} leading-relaxed mb-3 md:mb-4`}
            >
              從一間美髮沙龍的真實需求出發，Doosee
              深耕美業數位化，將預約排班、顧客經營、數據分析到金流管理，整合成一套直覺好用的系統。
            </p>
            <p
              className={`${fontSize.body} ${textColor.onLightMuted} leading-relaxed mb-8 md:mb-10`}
            >
              不只是工具，更是懂你產業的夥伴。
            </p>

            {/* 數據亮點 */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl md:text-2xl lg:text-4xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div
                    className={`text-xs md:text-sm lg:text-base ${textColor.onLightMuted} mt-1`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右側：痛點卡片 */}
          <div className="lg:w-1/2 flex flex-col gap-3 md:gap-4 lg:gap-6">
            {painPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="group p-5 md:p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex gap-3 md:gap-4 items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h3
                        className={`${fontSize.subtitle} font-semibold ${textColor.onLight} mb-1 md:mb-2`}
                      >
                        {point.title}
                      </h3>
                      <p
                        className={`text-sm md:text-base lg:text-lg ${textColor.onLightMuted} leading-relaxed`}
                      >
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsDooseeSection;
