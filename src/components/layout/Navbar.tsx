import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import ShinyText from '../ui/ShinyText';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const isStartPage = location.pathname === '/start';

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      if (targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `/#${targetId}`);
        }
      }
    }
  };

  return (
    <nav className={`navbar flex items-center justify-center p-4 ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container navbar-content w-full flex justify-between items-center max-w-7xl relative">
        <Link className="logo-icon relative z-10" to="/" onClick={(e) => handleNavClick(e, 'top')}>
          <div className="flex items-center">
            <img 
              src="/Assets/Logo-Without.png" 
              alt="Sanad Platform" 
              className="h-10 w-10 object-cover object-right"
              style={{ minWidth: '40px' }}
            />
          </div>
        </Link>
        <div className={`nav-links hidden md:flex md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 gap-6 ${isMenuOpen ? 'flex' : ''}`}>
          <Link to="/" className="nav-link" onClick={(e) => handleNavClick(e, 'top')}>{t('navbar.home')}</Link>
          <Link to="/#solutions" className="nav-link" onClick={(e) => handleNavClick(e, 'solutions')}>{t('navbar.solutions')}</Link>
          <Link to="/#pricing" className="nav-link" onClick={(e) => handleNavClick(e, 'pricing')}>{t('navbar.pricing')}</Link>
        </div>
        <div className="nav-actions flex items-center gap-4 relative z-10">
          {localStorage.getItem('sanad_uid') ? (
            <>
              <Link to="/dashboard" className="btn-primary" id="btn-cta-nav">
                {t('navbar.myAccount')}
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-signin hidden md:block" id="btn-signin">{t('navbar.signin')}</Link>
              {!isStartPage && (
                <Link to="/start" className="btn-primary" id="btn-cta-nav">
                   <ShinyText text={t('navbar.startNow')} disabled={false} speed={3} className="" pauseOnHover={true} />
                </Link>
              )}
            </>
          )}

          <button 
            onClick={toggleLanguage} 
            className="text-white hover:text-[#17e596] transition-colors flex items-center justify-center p-2 rounded-full border border-white/10 bg-white/5"
            aria-label="Toggle language"
            title="تغيير اللغة / Change Language"
          >
            <Globe size={20} className="w-5 h-5 shrink-0" />
          </button>
        </div>
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? (isAr ? 'إغلاق القائمة' : 'Close Menu') : (isAr ? 'فتح القائمة' : 'Open Menu')}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};


