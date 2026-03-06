import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShinyText from '../ui/ShinyText';
import Magnet from '../ui/Magnet';
import StarBorder from '../ui/StarBorder';
import ScrollFloat from '../ui/ScrollFloat';
import { useTranslation } from 'react-i18next';

const Pricing = () => {
  const { t } = useTranslation();
  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="section-header">
          <ScrollFloat
            animationDuration={1.2}
            ease="power3.out"
            scrollStart="top bottom+=10%"
            scrollEnd="bottom bottom-=20%"
            textClassName="section-title"
          >
            {t('pricing.title')}
          </ScrollFloat>
          <p className="section-subtitle">{t('pricing.subtitle')}</p>
        </div>

        <div className="pricing-grid">
          {/* Basic Plan */}
          <div className="pricing-card">
            <div className="pricing-header">
              <h3 className="plan-name">{t('pricing.plans.basic.name')}</h3>
              <div className="plan-price">99 <span className="currency">{t('pricing.currency')}</span><span className="period">{t('pricing.period')}</span></div>
              <p className="plan-target">{t('pricing.plans.basic.target')}</p>
            </div>
            <ul className="plan-features">
              <li><Check size={18} color="var(--neon)" /> <span>{t('pricing.plans.basic.f1')}</span></li>
              <li><Check size={18} color="var(--neon)" /> <span>{t('pricing.plans.basic.f2')}</span></li>
              <li><Check size={18} color="var(--neon)" /> <span>{t('pricing.plans.basic.f3')}</span></li>
              <li><Check size={18} color="var(--neon)" /> <span>{t('pricing.plans.basic.f4')}</span></li>
            </ul>
            <Magnet padding={20} magnetStrength={3} className="w-100">
              <Link to="/start" className="btn-glass-secondary w-100 block text-center">{t('pricing.plans.basic.btn')}</Link>
            </Magnet>
          </div>

          {/* Pro Plan (Featured) */}
          <div className="pricing-card featured">
            <div className="featured-badge">{t('pricing.featured')}</div>
            <div className="pricing-header">
              <h3 className="plan-name">{t('pricing.plans.pro.name')}</h3>
              <div className="plan-price">299 <span className="currency">{t('pricing.currency')}</span><span className="period">{t('pricing.period')}</span></div>
              <p className="plan-target">{t('pricing.plans.pro.target')}</p>
            </div>
            <ul className="plan-features">
              <li><Check size={18} color="var(--navy)" /> <span>{t('pricing.plans.pro.f1')}</span></li>
              <li><Check size={18} color="var(--navy)" /> <span>{t('pricing.plans.pro.f2')}</span></li>
              <li><Check size={18} color="var(--navy)" /> <span>{t('pricing.plans.pro.f3')}</span></li>
              <li><Check size={18} color="var(--navy)" /> <span>{t('pricing.plans.pro.f4')}</span></li>
              <li><Check size={18} color="var(--navy)" /> <span>{t('pricing.plans.pro.f5')}</span></li>
            </ul>
            <Magnet padding={20} magnetStrength={3} className="w-100">
              <StarBorder as={Link} to="/start" className="w-100 block">
                <div className="text-center w-full">
                  <ShinyText text={t('pricing.plans.pro.btn')} disabled={false} speed={3} className="" pauseOnHover={true} />
                </div>
              </StarBorder>
            </Magnet>
          </div>

          {/* Enterprise Plan */}
          <div className="pricing-card">
            <div className="pricing-header">
              <h3 className="plan-name">{t('pricing.plans.enterprise.name')}</h3>
              <div className="plan-price">{t('pricing.custom')}</div>
              <p className="plan-target">{t('pricing.plans.enterprise.target')}</p>
            </div>
            <ul className="plan-features">
              <li><Check size={18} color="var(--neon)" /> <span>{t('pricing.plans.enterprise.f1')}</span></li>
              <li><Check size={18} color="var(--neon)" /> <span>{t('pricing.plans.enterprise.f2')}</span></li>
              <li><Check size={18} color="var(--neon)" /> <span>{t('pricing.plans.enterprise.f3')}</span></li>
              <li><Check size={18} color="var(--neon)" /> <span>{t('pricing.plans.enterprise.f4')}</span></li>
            </ul>
            <Magnet padding={20} magnetStrength={3} className="w-100">
              <Link to="/start" className="btn-glass-secondary w-100 block text-center">{t('pricing.plans.enterprise.btn')}</Link>
            </Magnet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
