import { Globe, Target, Eye, Heart, Star } from 'lucide-react';
import { fontSize, textColor } from '@/constants/landing-styles';

const values = [
  { icon: Globe, title: '品牌國際化' },
  { icon: Target, title: '經營精確化' },
  { icon: Eye, title: '專業被看見' },
  { icon: Heart, title: '顧客更貼近' },
  { icon: Star, title: '夢想成現實' },
];

const MissionSection = () => {
  return (
    <section id="mission" data-section-label="我們的使命" className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`${fontSize.sectionTitle} font-bold ${textColor.onLight} mb-4`}>
            我們的使命，是陪伴美業人完成夢想
          </h2>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mb-16"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className={`${fontSize.body} font-semibold ${textColor.onLight}`}>{value.title}</h3>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="inline-block bg-primary rounded-2xl px-8 py-6 lg:px-12 lg:py-8">
            <p className={`${fontSize.bodyLg} font-semibold text-primary-foreground`}>
              不只是平台，而是你的數位夥伴。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
