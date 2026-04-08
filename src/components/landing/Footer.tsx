"use client";

import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { fontSize } from "@/constants/landing-styles";
import { useContactInfo } from "@/hooks/useContactInfo";

const Footer = () => {
  const { data: contact } = useContactInfo();

  return (
    <footer id="contact" className="bg-foreground text-background py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className={`${fontSize.footerTitle} font-bold mb-4`}>Doosee</h3>
            <p className={`${fontSize.body} text-background/80 mb-6 max-w-md`}>
              美業數位化平台，陪伴每一位美業人實現夢想。從預約管理到品牌經營，我們提供完整的解決方案。
            </p>
            <div className="flex gap-4">
              <a
                href={contact?.facebook ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={contact?.instagram ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={contact?.line ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LINE"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`${fontSize.footerSubtitle} font-semibold mb-4`}>快速連結</h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className={`${fontSize.body} text-background/80 hover:text-primary transition-colors`}>
                  功能介紹
                </a>
              </li>
              <li>
                <a href="#mission" className={`${fontSize.body} text-background/80 hover:text-primary transition-colors`}>
                  關於我們
                </a>
              </li>
              <li>
                <a href="#faq" className={`${fontSize.body} text-background/80 hover:text-primary transition-colors`}>
                  常見問題
                </a>
              </li>
              <li>
                <a href="#" className={`${fontSize.body} text-background/80 hover:text-primary transition-colors`}>
                  隱私權政策
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={`${fontSize.footerSubtitle} font-semibold mb-4`}>聯絡我們</h4>
            <ul className="space-y-3">
              <li className={`flex items-center gap-3 ${fontSize.body} text-background/80`}>
                <Mail className="w-5 h-5 text-primary" />
                <span>{contact?.email ?? ""}</span>
              </li>
              <li className={`flex items-center gap-3 ${fontSize.body} text-background/80`}>
                <Phone className="w-5 h-5 text-primary" />
                <span>{contact?.phone ?? ""}</span>
              </li>
              <li className={`flex items-start gap-3 ${fontSize.body} text-background/80`}>
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{contact?.address ?? ""}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/60">
          <p className={fontSize.body}>© {new Date().getFullYear()} Doosee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
