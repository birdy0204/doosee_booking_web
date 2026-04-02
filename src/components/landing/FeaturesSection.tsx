import { Quote } from 'lucide-react';
import { textColor } from '@/constants/landing-styles';

const FeaturesSection = () => {
  return (
    <section
      id="features"
      data-section-label="功能介紹"
      className="py-20 lg:py-28 bg-background border-y border-border"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左側：引言區塊 */}
          <div>
            <Quote className="w-10 h-10 text-foreground mb-8 fill-foreground" />

            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug mb-10">
              <span className={`${textColor.onLightMuted} italic`}>
                使用 Doosee 讓預約管理變得輕鬆又有效率，
              </span>
              <span className={`${textColor.onLight} font-bold`}>
                從線上預約
              </span>
              <span className={`${textColor.onLightMuted} italic`}>到</span>
              <span className={`${textColor.onLight} font-bold`}>
                顧客關係經營
              </span>
              <span className={`${textColor.onLightMuted} italic`}>
                ，所有流程一站搞定。
              </span>
            </blockquote>

            {/* 作者資訊 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent" />
              <div>
                <span className={`font-semibold ${textColor.onLight}`}>
                  王小美
                </span>
                <span className={`${textColor.onLightMuted}`}>
                  ，沙龍經營者
                </span>
              </div>
            </div>
          </div>

          {/* 右側：預留圖片區域 */}
          <div className="relative h-[350px] md:h-[420px] lg:h-[460px] rounded-2xl bg-muted/50 border border-border flex items-center justify-center">
            <span className="text-muted-foreground text-sm">產品截圖預留區域</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
