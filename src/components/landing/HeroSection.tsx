import { Button } from '@/components/ui/button';
import { fontSize, textColor } from '@/constants/landing-styles';

const HeroSection = () => {
  return (
    <section id="hero" data-section-label="首頁" data-section-theme="dark" className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/landingbg.png')" }}>
      {/* 底部漸層遮罩，讓下方文字更清晰 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="relative z-10 container mx-auto px-8 lg:px-16 flex items-end min-h-screen pb-24 lg:pb-32">
        <div className="text-left max-w-3xl" data-aos="fade-up">
          <h1 className={`${fontSize.hero} font-bold ${textColor.onDark} mb-6 leading-[1.1]`}>
            完成你所看見的
            <span className="block">美好</span>
          </h1>
          <p className={`${fontSize.bodyLg} ${textColor.onDarkMuted} mb-10`}>
            陪伴美業人，用數位化完成夢想
          </p>
          <Button
            size="lg"
            className={`${fontSize.button} px-12 py-8 font-semibold bg-white text-gray-900 hover:bg-white/90 hover:scale-105 transition-all rounded-2xl`}
          >
            立即體驗
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
