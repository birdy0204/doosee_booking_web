import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-stylist.jpg';
import heroLogo from '@/assets/hero-logo.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-primary pt-20 overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1" data-aos="fade-up">
            <img
              src={heroLogo}
              alt="Doosee Logo"
              className="h-20 md:h-24 lg:h-32 w-auto mb-8 mx-auto lg:mx-0"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              完成你所看見的
              <span className="block">美好</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-lg mx-auto lg:mx-0">
              陪伴美業人，用數位化完成夢想
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 font-semibold hover:scale-105 transition-transform"
            >
              立即體驗
            </Button>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end" data-aos="fade-left" data-aos-delay="200">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute inset-0 bg-primary-foreground/10 rounded-3xl transform rotate-3"></div>
              <img
                src={heroImage}
                alt="專業美髮師為顧客服務"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
