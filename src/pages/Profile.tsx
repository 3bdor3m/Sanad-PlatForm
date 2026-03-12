import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { 
  User, Mail, MapPin, Smartphone, 
  Briefcase, Target, Languages, 
  Zap, Crown, ChevronLeft, Loader2,
  AlertCircle, LogOut, CheckCircle
} from 'lucide-react';
import ShinyText from '../components/ui/ShinyText';
import { motion } from 'framer-motion';

interface UserData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  plan: string;
  activityName?: string;
  activityDescription?: string;
  activityField?: string;
  toneOfVoice?: string;
  language?: string;
}

const Profile = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const mockUser = {
    displayName: isAr ? 'أحمد محمد' : 'Ahmed Mohamed',
    email: 'admin@sanad.com',
    phoneNumber: '+966 50 000 0000',
    emailVerified: true,
    photoURL: 'https://i.pravatar.cc/150?img=11'
  };

  useEffect(() => {
    const fetchProfile = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const uid = localStorage.getItem('sanad_uid');
      if (!uid) {
        navigate('/login');
        return;
      }

      setUserData({
        fullName: mockUser.displayName || (isAr ? 'المستخدم' : 'User'),
        email: mockUser.email || '',
        phoneNumber: mockUser.phoneNumber || (isAr ? 'غير مضاف' : 'Not added'),
        address: isAr ? 'الرياض, المملكة العربية السعودية' : 'Riyadh, Saudi Arabia',
        plan: 'pro',
        activityName: isAr ? 'مؤسسة الأفق' : 'Horizon Est.',
        activityField: isAr ? 'تقنية المعلومات' : 'IT',
        activityDescription: isAr ? 'خدمات برمجية وحلول ذكية' : 'Software services and smart solutions',
        toneOfVoice: 'professional',
        language: 'mixed',
      });
      setLoading(false);
    };

    fetchProfile();
  }, [navigate, isAr]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      localStorage.removeItem('sanad_uid');
      localStorage.removeItem('sanad_token');
      localStorage.removeItem('sanad_profile_completed');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      setError(isAr ? 'حدث خطأ في تسجيل الخروج' : 'Error logging out');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1621]">
        <Loader2 className="w-10 h-10 text-[#17e596] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1621] p-4 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">{error}</h2>
        <button 
          onClick={() => window.location.reload()}
          className="btn-glass px-6 py-2 mt-4"
        >
          {isAr ? 'إعادة المحاولة' : 'Try Again'}
        </button>
      </div>
    );
  }

  return (
    <main className="page-wrapper min-h-screen bg-[#0f1621] pt-32 pb-20 px-4 sm:px-6 lg:px-8" dir={isAr ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{isAr ? 'حسابي | سند' : 'My Account | Sanad'}</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="mb-8 flex items-center gap-4"
          initial={{ opacity: 0, x: isAr ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className={`w-6 h-6 text-white ${isAr ? 'rotate-180' : ''}`} />
          </button>
          <h1 className="text-3xl font-bold text-white">
            {isAr ? 'الملف الشخصي' : 'My Account'}
          </h1>
          <div className="mr-auto">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
            >
              {isLoggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              {isAr ? 'تسجيل الخروج' : 'Logout'}
            </button>
          </div>
        </motion.div>

        {mockUser?.emailVerified === false && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <p className="text-yellow-400 text-sm">
                {isAr 
                  ? 'لم تقم بتحقق من بريدك الإلكتروني. يرجى التحقق من صندوق الوارد.' 
                  : 'Your email is not verified. Please check your inbox.'}
              </p>
            </div>
          </motion.div>
        )}

        {mockUser?.photoURL && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-4"
          >
            <img 
              src={mockUser.photoURL} 
              alt={isAr ? 'صورة الملف الشخصي' : 'Profile picture'}
              className="w-20 h-20 rounded-full border-2 border-[#17e596]"
            />
            <div>
              <p className="text-white font-medium">
                {mockUser.displayName || (isAr ? 'المستخدم' : 'User')}
              </p>
              <p className="text-white/60 text-sm">
                {mockUser.email}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8"
        >
          <motion.section variants={itemVariants} className="profile-section-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#17e596]/10">
                <User className="w-6 h-6 text-[#17e596]" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {isAr ? 'معلومات الحساب' : 'Account Information'}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="info-group">
                <label className="text-sm text-white/50 mb-1 block">
                  {isAr ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <div className="text-lg font-bold text-white">
                  {userData?.fullName}
                </div>
              </div>

              <div className="info-group">
                <label className="text-sm text-white/50 mb-1 block">
                  {isAr ? 'الباقة الحالية' : 'Current Plan'}
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#17e596]/20 border border-[#17e596]/30">
                    <Zap className="w-4 h-4 text-[#17e596]" />
                    <span className="text-[#17e596] font-medium capitalize">
                      {userData?.plan === 'free' ? (isAr ? 'مجانية' : 'Free') : (userData?.plan || 'Free')}
                    </span>
                  </div>
                  {userData?.plan === 'free' && (
                    <button 
                      onClick={() => alert(isAr ? 'جاري التوجيه لصفحة الباقات...' : 'Redirecting to plans page...')}
                      className="btn-primary py-1 px-4 text-sm bg-yellow-500 hover:bg-yellow-400 text-black border-none"
                    >
                      <Crown className="w-4 h-4 mr-1 inline" />
                      <ShinyText text={isAr ? 'ترقية الحساب' : 'Upgrade Plan'} speed={3} className="text-black font-bold" />
                    </button>
                  )}
                </div>
              </div>

              <div className="info-group">
                <label className="text-sm text-white/50 mb-1 block">
                  {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <div className="flex items-center gap-2 text-white/90">
                  <Mail className="w-4 h-4 text-white/40" />
                  {userData?.email}
                  {mockUser?.emailVerified && (
                    <CheckCircle className="w-4 h-4 text-[#17e596] mr-2" />
                  )}
                </div>
              </div>

              <div className="info-group">
                <label className="text-sm text-white/50 mb-1 block">
                  {isAr ? 'العنوان' : 'Address'}
                </label>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-4 h-4 text-white/40" />
                  {userData?.address || (isAr ? 'غير مضاف' : 'Not added')}
                </div>
              </div>

              <div className="info-group">
                <label className="text-sm text-white/50 mb-1 block">
                  {isAr ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <div className="flex items-center gap-2 text-white/90" dir="ltr">
                  <Smartphone className="w-4 h-4 text-white/40" />
                  {userData?.phoneNumber}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="profile-section-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Briefcase className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {isAr ? 'بيانات النشاط' : 'Business Activity'}
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm text-white/50 mb-1 block">
                  {isAr ? 'اسم النشاط' : 'Business Name'}
                </label>
                <div className="text-white text-lg font-medium">
                  {userData?.activityName || (isAr ? 'غير محدد' : 'Not specified')}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-white/50 mb-1 block">
                    {isAr ? 'مجال النشاط' : 'Activity Field'}
                  </label>
                  <div className="text-white">
                    {userData?.activityField || (isAr ? 'غير محدد' : 'Not specified')}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-white/50 mb-1 block">
                    {isAr ? 'وصف النشاط' : 'Business Description'}
                  </label>
                  <div className="text-white/80 line-clamp-3">
                    {userData?.activityDescription || (isAr ? 'لا يوجد وصف' : 'No description')}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="profile-section-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Target className="w-6 h-6 text-purple-500" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {isAr ? 'تخصيص المساعد الذكي' : 'AI Assistant Customization'}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Languages className="w-4 h-4 text-white/40" />
                  <span className="text-sm font-medium text-white/60">
                    {isAr ? 'لغة التواصل' : 'Communication Language'}
                  </span>
                </div>
                <div className="text-white font-medium">
                  {userData?.language === 'mixed' ? (isAr ? 'مختلط (عربي/إنجليزي)' : 'Mixed (Arabic/English)') : (userData?.language || 'Mixed')}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-white/40" />
                  <span className="text-sm font-medium text-white/60">
                    {isAr ? 'شخصية الخبير' : 'Expert Persona (Tone)'}
                  </span>
                </div>
                <div className="text-white font-medium">
                  {userData?.toneOfVoice === 'professional' ? (isAr ? 'احترافي ورسمي' : 'Professional') : (userData?.toneOfVoice || 'Professional')}
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>

      <style>{`
        .profile-section-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        .profile-section-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }
        .info-group {
          padding: 0.5rem 0;
        }
      `}</style>
    </main>
  );
};

export default Profile;
