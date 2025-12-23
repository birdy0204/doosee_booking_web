import { Calendar, Users, BarChart3, CreditCard, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: '線上預約管理',
    description: '輕鬆管理預約時間，減少電話溝通成本，讓顧客隨時隨地預約',
  },
  {
    icon: Users,
    title: '顧客關係經營',
    description: '建立完整顧客資料庫，記錄偏好與服務歷程，打造專屬體驗',
  },
  {
    icon: BarChart3,
    title: '數據分析與行銷',
    description: '掌握營運數據，精準分析業績趨勢，制定有效行銷策略',
  },
  {
    icon: CreditCard,
    title: '金流串接、票券儲值',
    description: '整合多元支付方式，提供票券儲值功能，提升顧客黏著度',
  },
  {
    icon: Sparkles,
    title: '成本優化 & 品牌打造',
    description: '降低營運成本，建立專業品牌形象，提升市場競爭力',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div
          data-aos="fade-up"
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            從日常管理，到夢想實現
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            我們提供完整的數位化解決方案，讓您專注於創造美好
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  feature: typeof features[0];
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const Icon = feature.icon;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={(index + 1) * 100}
      className="group p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {feature.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};

export default FeaturesSection;
