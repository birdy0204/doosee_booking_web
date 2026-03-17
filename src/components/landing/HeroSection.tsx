import { Button } from '@/components/ui/button';
import { fontSize, textColor } from '@/constants/landing-styles';

const HeroSection = () => {
  return (
    <section id="hero" data-section-label="首頁" data-section-theme="dark" className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/landingbg.png')" }}>
      {/* 底部漸層遮罩，讓下方文字更清晰 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="relative z-10 container mx-auto px-8 lg:px-16 flex items-center min-h-screen">
        <div className="w-full">
          <h1 className={`${fontSize.hero} font-bold ${textColor.onDark} mb-6 leading-[1.1]`}>
            <span className="flex justify-between items-end">
              <span>完成你</span>
              <span className="lg:translate-x-20">看見的美好</span>
            </span>
          </h1>
          <div className="max-w-full lg:max-w-[42%]">
            <p className={`${fontSize.bodyLg} ${textColor.onDarkMuted} mb-10`}>
              陪伴美業人，用數位化完成夢想
            </p>
            <Button
              size="lg"
              className={`${fontSize.button} px-12 py-8 font-semibold bg-white text-gray-900 hover:bg-white/90 hover:scale-105 transition-all rounded-full`}
            >
              立即體驗
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
