import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, AlertCircle, CheckCircle } from 'lucide-react';
import ShinyText from '../ui/ShinyText';
import TiltedCard from '../ui/TiltedCard';
import ScrollFloat from '../ui/ScrollFloat';
import { useTranslation } from 'react-i18next';

const Steps = () => {
  const { t } = useTranslation();
  return (
    <section className="portfolio-section" id="start">
      <div className="container">
        <div className="section-header">
          <ScrollFloat
            animationDuration={1}
            ease="power3.out"
            scrollStart="top bottom+=10%"
            scrollEnd="bottom bottom-=20%"
            textClassName="section-title"
          >
            {t('steps.title')}
          </ScrollFloat>
          <p className="section-subtitle">{t('steps.subtitle')}</p>
        </div>

        <div className="steps-grid">
          <TiltedCard rotateAmplitude={15} scaleOnHover={1.05}>
            <div className="step-card w-full h-full" id="step-1">
              <div className="step-icon-circle">
                <Zap size={28} color="var(--navy)" />
              </div>
              <h3 className="step-title">{t('steps.step1.title')}</h3>
              <p className="step-desc">{t('steps.step1.desc')}</p>
            </div>
          </TiltedCard>

          <TiltedCard rotateAmplitude={15} scaleOnHover={1.05}>
            <div className="step-card step-featured w-full h-full" id="step-2">
              <div className="step-icon-circle step-icon-primary">
                <AlertCircle size={28} color="var(--navy)" />
              </div>
              <h3 className="step-title">{t('steps.step2.title')}</h3>
              <p className="step-desc">{t('steps.step2.desc')}</p>
              <div className="step-actions mt-12 text-center">
                <Link to="/start" className="btn-primary btn-step" id="btn-step-verify">
                  <ShinyText text={t('steps.step2.btn')} disabled={false} speed={3} className="" color="#0f1621" shineColor="#ffffff" pauseOnHover={true} />
                </Link>
              </div>
            </div>
          </TiltedCard>

          <TiltedCard rotateAmplitude={15} scaleOnHover={1.05}>
            <div className="step-card w-full h-full" id="step-3">
              <div className="step-icon-circle">
                <CheckCircle size={28} color="var(--navy)" />
              </div>
              <h3 className="step-title">{t('steps.step3.title')}</h3>
              <p className="step-desc">{t('steps.step3.desc')}</p>
            </div>
          </TiltedCard>
        </div>
      </div>
    </section>
  );
};

export default Steps;
