import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/doosee-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Doosee Logo"
            className="h-9 md:h-11 w-auto scale-150 origin-left"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
            功能介紹
          </a>
          <a href="#mission" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
            關於我們
          </a>
          <a href="#contact" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
            聯絡我們
          </a>
          <Button
            variant="secondary"
            className="font-semibold"
          >
            立即體驗
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-primary border-t border-primary-foreground/20 py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <a
              href="#features"
              className="text-primary-foreground/90 hover:text-primary-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              功能介紹
            </a>
            <a
              href="#mission"
              className="text-primary-foreground/90 hover:text-primary-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              關於我們
            </a>
            <a
              href="#contact"
              className="text-primary-foreground/90 hover:text-primary-foreground transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              聯絡我們
            </a>
            <Button
              variant="secondary"
              className="font-semibold w-full"
            >
              立即體驗
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
