import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home-sections/Hero';
import Solutions from '../components/home-sections/Solutions';
import Specialist from '../components/home-sections/Specialist';
import Steps from '../components/home-sections/Steps';
import Features from '../components/home-sections/Features';
import Pricing from '../components/home-sections/Pricing';

import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="home-page">
      <Helmet>
        <title>{t("homeTitle") || "سند | أتمتة الذكاء الاصطناعي لنمو أعمالك"}</title>
        <meta name="description" content={t("homeDesc") || "سند - نظام أتمتة ذكاء اصطناعي متخصص للمنشآت الصغيرة والمتوسطة. نساعدك على النمو وتحسين خدمة العملاء باستخدام أنظمة RAG المتطورة."} />
      </Helmet>
      <Hero />
      <Solutions />
      <Specialist />
      <Steps />
      <Features />
      <Pricing />
    </div>
  );
};

export default Home;
