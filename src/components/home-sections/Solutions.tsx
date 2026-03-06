import React from 'react';
import { BrainCircuit, Languages, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

import ScrollFloat from '../ui/ScrollFloat';
import { ChromaGrid, ChromaGridItem } from '../ui/ChromaGrid';
import { useTranslation } from 'react-i18next';

const Solutions = () => {
  const { t } = useTranslation();
  return (
    <section className="partner-section" id="solutions">
      <div className="container">
        <div className="section-header">
          <ScrollFloat
            animationDuration={1.2}
            ease="power3.out"
            scrollStart="top bottom+=10%"
            scrollEnd="bottom bottom-=20%"
            textClassName="section-title"
          >
            {t('solutions.title')}
          </ScrollFloat>
          <p className="section-subtitle">{t('solutions.subtitle')}</p>
        </div>

        <ChromaGrid className="partner-cards">
          <ChromaGridItem className="partner-card" id="partner-card-1">
            <span className="partner-num">01.</span>
            <h3 className="partner-card-title">{t('solutions.card1.title')}</h3>
            <p className="partner-card-desc flex-1">{t('solutions.card1.desc')}</p>
            <Link to="/start" className="partner-link">{t('solutions.card1.link')}</Link>
          </ChromaGridItem>
          
          <ChromaGridItem className="partner-card partner-card-featured" id="partner-card-2">
            <span className="partner-num">02.</span>
            <h3 className="partner-card-title">{t('solutions.card2.title')}</h3>
            <p className="partner-card-desc flex-1">{t('solutions.card2.desc')}</p>
            <Link to="/start" className="partner-link">{t('solutions.card2.link')}</Link>
          </ChromaGridItem>

          <ChromaGridItem className="partner-card" id="partner-card-3">
            <span className="partner-num">03.</span>
            <h3 className="partner-card-title">{t('solutions.card3.title')}</h3>
            <p className="partner-card-desc flex-1">{t('solutions.card3.desc')}</p>
            <Link to="/start" className="partner-link">{t('solutions.card3.link')}</Link>
          </ChromaGridItem>
        </ChromaGrid>
      </div>
    </section>
  );
};

export default Solutions;
