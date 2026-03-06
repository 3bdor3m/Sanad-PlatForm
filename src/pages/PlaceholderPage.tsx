import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PlaceholderPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const pageContent: Record<string, { title: string, desc: string }> = {
    '/about': { title: t('placeholder.about.title'), desc: t('placeholder.about.desc') },
    '/success-stories': { title: t('placeholder.success.title'), desc: t('placeholder.success.desc') },
    '/blog': { title: t('placeholder.blog.title'), desc: t('placeholder.blog.desc') },
    '/what-is-rag': { title: t('placeholder.rag.title'), desc: t('placeholder.rag.desc') },
    '/future-of-automation': { title: t('placeholder.future.title'), desc: t('placeholder.future.desc') },
    '/api-docs': { title: t('placeholder.api.title'), desc: t('placeholder.api.desc') },
    '/help-center': { title: t('placeholder.help.title'), desc: t('placeholder.help.desc') },
  };

  const content = pageContent[location.pathname] || { title: t('placeholder.default.title'), desc: t('placeholder.default.desc') };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className="placeholder-page" style={{ 
        minHeight: '70vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '6rem 2rem',
        textAlign: 'center'
      }}>
      <Helmet>
        <title>{`${content.title} - سند`}</title>
        <meta name="description" content={content.desc} />
      </Helmet>
      
      <div className="badge" style={{ marginBottom: '1.5rem' }}>{t('placeholder.badge')}</div>
      <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{content.title}</h1>
      <p className="hero-description" style={{ maxWidth: '600px', margin: '0 auto 2.5rem' }}>
        {content.desc}
      </p>
      
      <Link to="/" className="btn-primary">
        {t('placeholder.backBtn')}
      </Link>
    </main>
  );
};

export default PlaceholderPage;
