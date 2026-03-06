import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/Assets/Logo-Without.png" alt="سند" height="40" />
            </Link>
            <p className="footer-brand-desc">
              {t('footer.brandDesc')}
            </p>
          </div>

          <div className="footer-col" style={{ gridColumn: 'span 1' }}>
            <h4 className="footer-col-title">{t('footer.cols.solutions.title')}</h4>
            <ul className="footer-links">
              <li><Link to="/#solutions">{t('footer.cols.solutions.l1')}</Link></li>
              <li><Link to="/#solutions">{t('footer.cols.solutions.l2')}</Link></li>
              <li><Link to="/#solutions">{t('footer.cols.solutions.l3')}</Link></li>
              <li><Link to="/#solutions">{t('footer.cols.solutions.l4')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.cols.company.title')}</h4>
            <ul className="footer-links">
              <li><Link to="/about">{t('footer.cols.company.l1')}</Link></li>
              <li><Link to="/success-stories">{t('footer.cols.company.l2')}</Link></li>
              <li><Link to="/blog">{t('footer.cols.company.l3')}</Link></li>
              <li><a href="mailto:info@sanad.ai">{t('footer.cols.company.l4')}</a ></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.cols.resources.title')}</h4>
            <ul className="footer-links">
              <li><Link to="/what-is-rag">{t('footer.cols.resources.l1')}</Link></li>
              <li><Link to="/future-of-automation">{t('footer.cols.resources.l2')}</Link></li>
              <li><Link to="/api-docs">{t('footer.cols.resources.l3')}</Link></li>
              <li><Link to="/help-center">{t('footer.cols.resources.l4')}</Link></li>
            </ul>
          </div>

          <div className="footer-col" style={{ gridColumn: 'span 1.5' }}>
            <h4 className="footer-col-title">{t('footer.cols.newsletter.title')}</h4>
            <p className="footer-newsletter-desc">{t('footer.cols.newsletter.desc')}</p>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); const msg = document.getElementById('form-error-message'); if (msg) { msg.textContent = t('footer.cols.newsletter.success', 'شكراً لاشتراكك! سنوافيك بكل جديد.'); msg.style.color = 'var(--neon)'; msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 3000); } }}>
              <input type="email" placeholder={t('footer.cols.newsletter.placeholder')} className="newsletter-input" id="newsletter-email" aria-label="البريد الإلكتروني" required />
              <button type="submit" className="btn-primary btn-newsletter" id="btn-newsletter" aria-label="الاشتراك في النشرة البريدية">{t('footer.cols.newsletter.btn')}</button>
            </form>
            <div id="form-error-message" className="error-banner" style={{ marginTop: '1rem', width: '100%', display: 'none' }}></div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
