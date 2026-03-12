import React from 'react';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';
import { Link } from 'react-router-dom';
import ShinyText from '../ui/ShinyText';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-section" id="hero">

      <div className="hero-glow"></div>

      <div className="container hero-content-centered items-center text-center justify-center">
        <div className="hero-text-block items-center">
          <div className="badge">
            <span className="ping-container">
              <span className="ping-effect"></span>
              <span className="ping-dot"></span>
            </span>
            {t('hero.badge')}
          </div>
          <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t('hero.title') }} />
          <p className="hero-description mx-auto">
            {t('hero.description')}
          </p>

          <div className="user-stats justify-center">
            <div className="avatar-group">
              <div className="avatar"><img src="https://i.pravatar.cc/100?img=11" alt="مستخدم يستفيد من أنظمة سند الذكية" width="50" height="50" /></div>
              <div className="avatar"><img src="https://i.pravatar.cc/100?img=12" alt="رائد أعمال استخدم RAG في منصته" width="50" height="50" /></div>
              <div className="avatar"><img src="https://i.pravatar.cc/100?img=13" alt="عميل سند للذكاء الاصطناعي" width="50" height="50" /></div>
              <div className="avatar"><img src="https://i.pravatar.cc/100?img=14" alt="صاحب منشأة حقق نمواً عبر الأتمتة" width="50" height="50" /></div>
              <div className="avatar"><img src="https://i.pravatar.cc/100?img=15" alt="مستخدم سعيد بخدمات المنصة" width="50" height="50" /></div>
            </div>
            <div className="stats-info">
              <span className="highlight">500+</span>
              <span className="stats-text">{t('hero.statsText')}</span>
            </div>
          </div>

          <div className="hero-buttons flex items-center justify-center gap-4">
            <Link to="/start" id="btn-hero-start" aria-label={t('hero.startBtn') || 'ابدأ الآن'}>
              <InteractiveHoverButton text={t('hero.startBtn')} className="w-[200px] sm:w-[240px]" />
            </Link>
            <button 
              className="btn-glass btn-large" 
              id="btn-hero-demo"
              aria-label={t('hero.demoBtn') || 'احجز عرضاً تجريبياً'}
              onClick={() => {
                const element = document.getElementById('solutions');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <ShinyText text={t('hero.demoBtn')} disabled={false} speed={3} className="" pauseOnHover={true} />
            </button>
          </div>
        </div>
      </div>

      <div className="hero-bottom-glow"></div>
    </section>
  );
};

export default Hero;
