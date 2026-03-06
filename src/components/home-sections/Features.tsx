import React from 'react';
import { Lock, BarChart, Share2, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShinyText from '../ui/ShinyText';
import ScrollFloat from '../ui/ScrollFloat';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();
  return (
    <section className="whats-new-section" id="whats-new">
      <div className="container">
        <div className="whats-new-content">
          <div className="whats-new-text">
            <ScrollFloat
              animationDuration={1}
              ease="power3.out"
              scrollStart="top bottom+=10%"
              scrollEnd="bottom bottom-=20%"
              textClassName="section-title"
            >
              {t('features.title')}
            </ScrollFloat>
            <p className="section-subtitle">{t('features.subtitle')}</p>

            <div className="features-list">
              <div className="feature-item" id="feat-security">
                <div className="feature-item-content">
                  <div className="feat-icon">
                    <Lock size={20} color="var(--neon)" />
                  </div>
                  <div>
                    <h4 className="feat-title">{t('features.list.security.title')}</h4>
                    <p className="feat-desc">{t('features.list.security.desc')}</p>
                  </div>
                </div>
              </div>
              <div className="feature-item" id="feat-reports">
                <div className="feature-item-content">
                  <div className="feat-icon">
                    <BarChart size={20} color="var(--neon)" />
                  </div>
                  <div>
                    <h4 className="feat-title">{t('features.list.reports.title')}</h4>
                    <p className="feat-desc">{t('features.list.reports.desc')}</p>
                  </div>
                </div>
              </div>
              <div className="feature-item" id="feat-integrations">
                <div className="feature-item-content">
                  <div className="feat-icon">
                    <Share2 size={20} color="var(--neon)" />
                  </div>
                  <div>
                    <h4 className="feat-title">{t('features.list.integrations.title')}</h4>
                    <p className="feat-desc">{t('features.list.integrations.desc')}</p>
                  </div>
                </div>
              </div>
              <div className="feature-item" id="feat-api">
                <div className="feature-item-content">
                  <div className="feat-icon">
                    <Code size={20} color="var(--neon)" />
                  </div>
                  <div>
                    <h4 className="feat-title">{t('features.list.api.title')}</h4>
                    <p className="feat-desc">{t('features.list.api.desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="whats-new-visual">
            <div className="new-card">
              <div className="new-card-glow"></div>
              <div className="new-card-content">
              <div className="new-card-badge">{t('features.card.badge')}</div>
              <h3 className="new-card-title" dangerouslySetInnerHTML={{ __html: t('features.card.title') }} />
              <p className="new-card-desc">{t('features.card.desc')}</p>
              <Link to="/start" className="btn-primary" id="btn-new-start">
                <ShinyText text={t('features.card.btn')} disabled={false} speed={3} className="" color="#0f1621" shineColor="#ffffff" pauseOnHover={true} />
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
