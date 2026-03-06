import React from 'react';
import { DollarSign, TrendingUp, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShinyText from '../ui/ShinyText';
import { useTranslation } from 'react-i18next';

const Specialist = () => {
  const { t } = useTranslation();
  return (
    <section className="trusted-section" id="ai-specialist">
      <div className="container trusted-content">
        <div className="trusted-visual">
          <div className="price-card pc-1">
            <div className="pc-icon" style={{ background: 'rgba(23, 229, 150, 0.12)' }}>
              <DollarSign size={18} color="var(--neon)" />
            </div>
            <div>
              <div className="pc-name">{t('specialist.stats.speed.label')}</div>
              <div className="pc-change up">{t('specialist.stats.speed.value')}</div>
            </div>
          </div>
          <div className="price-card pc-2">
            <div className="pc-chart">
              <svg viewBox="0 0 80 30" width="80" height="30">
                <polyline points="0,25 15,20 25,22 40,12 55,15 65,8 80,10" fill="none" stroke="var(--neon)"
                  strokeWidth="2" />
              </svg>
            </div>
            <div>
              <div className="pc-name">{t('specialist.stats.sales.label')}</div>
              <div className="pc-change up">{t('specialist.stats.sales.value')}</div>
            </div>
          </div>
          <div className="price-card pc-3">
            <div className="pc-icon" style={{ background: 'rgba(23, 229, 150, 0.12)' }}>
              <Users size={18} color="var(--neon)" />
            </div>
            <div>
              <div className="pc-name">{t('specialist.stats.satisfaction.label')}</div>
              <div className="pc-change up">{t('specialist.stats.satisfaction.value')}</div>
            </div>
          </div>
          <div className="trust-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="var(--neon)" stroke="none" />
              ))}
            </div>
            <span className="trust-text">{t('specialist.trustText')}</span>
          </div>
        </div>

        <div className="trusted-text">
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('specialist.title') }} />
          <p className="section-subtitle">{t('specialist.subtitle')}</p>
          <div className="trusted-buttons">
            <Link to="/start" className="btn-primary" id="btn-trusted-learn">
              <ShinyText text={t('specialist.btn')} disabled={false} speed={3} className="" color="#0f1621" shineColor="#ffffff" pauseOnHover={true} />
            </Link>
            <span className="trust-users">{t('specialist.users')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specialist;
