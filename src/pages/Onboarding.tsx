import React, { useState } from "react";
import { useFormValidation } from "../hooks/useFormValidation";
import { CustomSelect } from "../components/onboarding/OnboardingUI";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";
import ShinyText from "../components/ui/ShinyText";

const Onboarding = () => {
  const { t, i18n } = useTranslation();
  const { error, validateForm, setError } = useFormValidation();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({ show: false, type: 'success', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isLengthValid = formData.password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(formData.password);
  const hasLowerCase = /[a-z]/.test(formData.password);
  const hasNumber = /[0-9]/.test(formData.password);

  const [showPlansModal, setShowPlansModal] = useState(false);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(e.currentTarget)) {
      // Show plans selection instead of immediate submit
      setShowPlansModal(true);
    }
  };

  const submitWithPlan = async (plan: string) => {
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, selectedPlan: plan }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('sanad_uid', data.user.id);
        if (data.token) localStorage.setItem('sanad_token', data.token);
        localStorage.setItem('sanad_profile_completed', 'false');
        
        setShowPlansModal(false);
        setNotification({ show: true, type: 'success', message: 'تم التسجيل بنجاح! جاري التوجيه للوحة التحكم...' });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);

      } else if (response.status === 409) {
        setShowPlansModal(false);
        setNotification({ show: true, type: 'error', message: data?.message || 'هذا البريد الإلكتروني مسجل مسبقاً.' });
      } else {
        setShowPlansModal(false);
        setNotification({ show: true, type: 'error', message: data?.message || 'خطأ في التسجيل' });
      }
    } catch (err) {
      setShowPlansModal(false);
      setNotification({ show: true, type: 'error', message: 'تعذر الاتصال بالسيرفر. تأكد من اتصالك بالإنترنت.' });
    } finally {
      setIsLoading(false);
    }
  };

  const isAr = i18n.language === 'ar';

  return (
    <main className="onboarding-wrapper" dir={isAr ? "rtl" : "ltr"}>
      <Helmet>
        <title>{t("onboarding.title")}</title>
        <meta name="description" content={t("onboarding.desc")} />
      </Helmet>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2rem", color: "white", marginBottom: "0.5rem" }}>
            {t("onboarding.sec1.pageTitle")}
          </h2>
          <p style={{ color: "var(--white-70)" }}>
            {t("onboarding.sec1.pageSubtitle")}
          </p>
        </div>

        <div className="onboarding-form">
          <form id="onboarding-main-form" onSubmit={handleRegister}>
            <div className="form-section active">
              <div className="onboard-grid">
                <div className="form-group onboard-grid-full">
                  <label className="form-label" style={{ textAlign: isAr ? 'right' : 'left' }}>
                    {t("onboarding.sec1.fullNameLabel")}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder={t("onboarding.sec1.fullNamePlaceholder")}
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    required
                    style={{ textAlign: isAr ? 'right' : 'left' }}
                  />
                </div>
                
                <CustomSelect
                  label={t("onboarding.sec1.genderLabel")}
                  options={[
                    { label: t("onboarding.sec1.genderMale"), value: "male" },
                    { label: t("onboarding.sec1.genderFemale"), value: "female" },
                  ]}
                  value={formData.gender}
                  onChange={(val) => updateFormData("gender", val)}
                  required
                />
                
                <div className="form-group">
                  <label className="form-label" style={{ textAlign: isAr ? 'right' : 'left' }}>
                    {t("onboarding.sec1.phoneLabel")}
                  </label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder={t("onboarding.sec1.phonePlaceholder")}
                    value={formData.phoneNumber}
                    onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                    required
                    style={{ textAlign: isAr ? 'right' : 'left' }}
                  />
                </div>
                
                <div className="form-group onboard-grid-full">
                  <label className="form-label" style={{ textAlign: isAr ? 'right' : 'left' }}>
                    {t("onboarding.sec1.emailLabel")}
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder={t("onboarding.sec1.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    required
                    style={{ textAlign: isAr ? 'right' : 'left' }}
                  />
                </div>
                
                <div className="form-group onboard-grid-full">
                  <label className="form-label" style={{ textAlign: isAr ? 'right' : 'left' }}>
                    {t("onboarding.sec1.passwordLabel")}
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-input"
                      placeholder={t("onboarding.sec1.passwordPlaceholder")}
                      value={formData.password}
                      onChange={(e) => updateFormData("password", e.target.value)}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      required
                      style={{ paddingLeft: isAr ? "3rem" : "1rem", paddingRight: isAr ? "1rem" : "3rem", textAlign: isAr ? 'right' : 'left' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ 
                        position: "absolute", 
                        [isAr ? 'left' : 'right']: "1rem", 
                        top: "50%", 
                        transform: "translateY(-50%)", 
                        background: "none", 
                        border: "none", 
                        color: "var(--white-50)", 
                        cursor: "pointer", 
                        display: "flex", 
                        alignItems: "center", 
                        padding: 0 
                      }}
                      aria-label={showPassword ? (isAr ? "إخفاء كلمة المرور" : "Hide password") : (isAr ? "عرض كلمة المرور" : "Show password")}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {isPasswordFocused && (
                    <div style={{ marginTop: "0.5rem", fontSize: "0.85rem", background: "rgba(255, 255, 255, 0.03)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--white-10)" }} className="slideDown-animation password-checklist">
                      <p style={{ color: "var(--white)", marginBottom: "0.5rem", fontWeight: "bold" }}>
                        {isAr ? "يجب أن تحتوي كلمة المرور على:" : "Password must contain:"}
                      </p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        <li style={{ color: isLengthValid ? "var(--neon)" : "var(--white-50)", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem", transition: "color 0.3s ease" }}>
                          {isLengthValid ? <CheckCircle size={14} /> : <div style={{ width: 14, height: 14, borderRadius: "50%", border: "1px solid currentColor" }} />} 
                          {isAr ? "8 أحرف على الأقل" : "At least 8 characters"}
                        </li>
                        <li style={{ color: hasUpperCase ? "var(--neon)" : "var(--white-50)", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem", transition: "color 0.3s ease" }}>
                          {hasUpperCase ? <CheckCircle size={14} /> : <div style={{ width: 14, height: 14, borderRadius: "50%", border: "1px solid currentColor" }} />} 
                          {isAr ? "حرف كبير واحد على الأقل" : "At least one uppercase letter"}
                        </li>
                        <li style={{ color: hasLowerCase ? "var(--neon)" : "var(--white-50)", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem", transition: "color 0.3s ease" }}>
                          {hasLowerCase ? <CheckCircle size={14} /> : <div style={{ width: 14, height: 14, borderRadius: "50%", border: "1px solid currentColor" }} />} 
                          {isAr ? "حرف صغير واحد على الأقل" : "At least one lowercase letter"}
                        </li>
                        <li style={{ color: hasNumber ? "var(--neon)" : "var(--white-50)", display: "flex", alignItems: "center", gap: "0.5rem", transition: "color 0.3s ease" }}>
                          {hasNumber ? <CheckCircle size={14} /> : <div style={{ width: 14, height: 14, borderRadius: "50%", border: "1px solid currentColor" }} />} 
                          {isAr ? "رقم واحد على الأقل" : "At least one number"}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="error-banner shake" style={{ display: "block" }}>
                {error}
              </div>
            )}

            <div className="form-nav-buttons" style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
                style={{ padding: "0.8rem 3rem", width: '100%', maxWidth: '300px', opacity: isLoading ? 0.7 : 1, display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                {isLoading ? (
                  t("onboarding.processing")
                ) : (
                  <ShinyText text={t("onboarding.createAccountBtn")} speed={3} className="" color="#0f1621" shineColor="#3b4252" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {notification.show && (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
          <div className="modal-content slideUp-animation" style={{ background: "var(--bg-glass)", backdropFilter: "blur(16px)", border: "1px solid var(--white-10)", borderRadius: "var(--radius-lg)", padding: "2rem", maxWidth: "400px", width: "90%", textAlign: "center" }}>
            {notification.type === "success" ? (
              <div style={{ color: "var(--neon)", margin: "0 auto 1.5rem", display: "flex", justifyContent: "center" }}>
                <CheckCircle size={56} strokeWidth={1.5} />
              </div>
            ) : (
              <div style={{ color: "#ff4b4b", margin: "0 auto 1.5rem", display: "flex", justifyContent: "center" }}>
                <XCircle size={56} strokeWidth={1.5} />
              </div>
            )}
            <h3 style={{ color: "white", marginBottom: "0.5rem", fontSize: "1.5rem" }}>
              {notification.type === "success" ? (isAr ? "عملية ناجحة" : "Success") : (isAr ? "حدث خطأ" : "Error Occurred")}
            </h3>
            <p style={{ color: "var(--white-70)", marginBottom: "2rem", lineHeight: "1.6" }}>
              {notification.message}
            </p>
            {notification.type !== "success" && (
              <button
                className="btn-glass"
                style={{ width: "100%", padding: "0.875rem", fontSize: "1.1rem" }}
                onClick={() => setNotification({ ...notification, show: false })}
              >
                {isAr ? "إغلاق والمحاولة مجدداً" : "Close and Try Again"}
              </button>
            )}
          </div>
        </div>
      )}

      {showPlansModal && (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999, padding: "1rem" }}>
          <div className="modal-content slideUp-animation" style={{ background: "var(--bg-glass)", backdropFilter: "blur(20px)", border: "1px solid var(--neon)", borderRadius: "var(--radius-lg)", padding: "2.5rem", maxWidth: "800px", width: "100%" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ color: "white", fontSize: "1.8rem" }}>{t("pricing.modalTitle") || (isAr ? "اختر باقتك للبدء" : "Choose your plan to start")}</h2>
              <button onClick={() => setShowPlansModal(false)} style={{ background: 'none', border: 'none', color: 'gray', cursor: 'pointer' }} aria-label={isAr ? "إغلاق" : "Close"}><XCircle size={28} /></button>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {/* Free Plan */}
              <div style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--white-10)", background: "rgba(255,255,255,0.02)", display: "flex", flexDirection: "column" }}>
                <h3 style={{ color: "white", fontSize: "1.5rem", marginBottom: "0.5rem" }}>{t("pricing.plans.basic.name")}</h3>
                <p style={{ color: "var(--white-70)", marginBottom: "1.5rem" }}>{t("pricing.plans.basic.target")}</p>
                <div style={{ fontSize: "2rem", color: "white", fontWeight: "bold", marginBottom: "2rem" }}>$0 <span style={{ fontSize: "1rem", color: "gray" }}>/ {isAr ? "شهر" : "mo"}</span></div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--white-70)", marginBottom: "2rem", flexGrow: 1 }}>
                  <li style={{ marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><CheckCircle size={16} color="var(--neon)" /> {t("pricing.plans.basic.f1")}</li>
                  <li style={{ marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><CheckCircle size={16} color="var(--neon)" /> {t("pricing.plans.basic.f2")}</li>
                  <li style={{ marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><CheckCircle size={16} color="var(--neon)" /> {t("pricing.plans.basic.f3")}</li>
                </ul>
                <button 
                  className="btn-glass" 
                  onClick={() => submitWithPlan('free')}
                  disabled={isLoading}
                  style={{ width: "100%", padding: "1rem", opacity: isLoading ? 0.7 : 1 }}
                >
                  {isLoading ? (isAr ? 'جاري...' : 'Loading...') : (t("pricing.plans.basic.btn"))}
                </button>
              </div>

              {/* Pro Plan */}
              <div style={{ padding: "2rem", borderRadius: "12px", border: "1px solid var(--neon)", background: "rgba(23, 229, 150, 0.05)", display: "flex", flexDirection: "column", position: "relative" }}>
                <div style={{ position: 'absolute', top: '-12px', right: '50%', transform: 'translateX(50%)', background: 'var(--neon)', color: 'black', padding: '0.2rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>{t("pricing.featured")}</div>
                <h3 style={{ color: "white", fontSize: "1.5rem", marginBottom: "0.5rem" }}>{t("pricing.plans.pro.name")}</h3>
                <p style={{ color: "var(--white-70)", marginBottom: "1.5rem" }}>{t("pricing.plans.pro.target")}</p>
                <div style={{ fontSize: "2rem", color: "var(--neon)", fontWeight: "bold", marginBottom: "2rem" }}>$49 <span style={{ fontSize: "1rem", color: "gray" }}>/ {isAr ? "شهر" : "mo"}</span></div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--white-70)", marginBottom: "2rem", flexGrow: 1 }}>
                  <li style={{ marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><CheckCircle size={16} color="var(--neon)" /> {t("pricing.plans.pro.f1")}</li>
                  <li style={{ marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><CheckCircle size={16} color="var(--neon)" /> {t("pricing.plans.pro.f2")}</li>
                  <li style={{ marginBottom: "0.8rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><CheckCircle size={16} color="var(--neon)" /> {t("pricing.plans.pro.f3")}</li>
                </ul>
                <button 
                  className="btn-primary" 
                  onClick={() => submitWithPlan('pro')}
                  disabled={isLoading}
                  style={{ width: "100%", padding: "1rem", opacity: isLoading ? 0.7 : 1 }}
                >
                  {isLoading ? (isAr ? 'جاري...' : 'Loading...') : (t("pricing.plans.pro.btn"))}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Onboarding;
