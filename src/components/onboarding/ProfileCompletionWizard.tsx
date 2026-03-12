import React, { useState } from "react";
import { useFormValidation } from "../../hooks/useFormValidation";
import { CustomSelect, ToggleGroup } from "./OnboardingUI";
import { ScheduleGrid } from "./ScheduleGrid";
import {
  Upload,
  User,
  MessageCircle,
  HelpCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProfileCompletionWizardProps {
  uid: string;
  onComplete: () => void;
}

const ProfileCompletionWizard: React.FC<ProfileCompletionWizardProps> = ({ uid, onComplete }) => {
  const { t, i18n } = useTranslation();
  const { error, validateForm, setError } = useFormValidation();
  const [currentStep, setCurrentStep] = useState(1); // Maps to Step 2, 3, 4 visually
  const [notification, setNotification] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({ show: false, type: 'success', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    businessCategory: "commercial",
    businessName: "",
    businessType: "",
    businessAge: "",
    presence: "",
    businessDescription: "",
    businessAddress: "",
    schedule: [
      { day: "sunday", name: "الأحد", isHoliday: false, from: "09:00", to: "22:00" },
      { day: "monday", name: "الاثنين", isHoliday: false, from: "09:00", to: "22:00" },
      { day: "tuesday", name: "الثلاثاء", isHoliday: false, from: "09:00", to: "22:00" },
      { day: "wednesday", name: "الأربعاء", isHoliday: false, from: "09:00", to: "22:00" },
      { day: "thursday", name: "الخميس", isHoliday: false, from: "09:00", to: "22:00" },
      { day: "friday", name: "الجمعة", isHoliday: true, from: "09:00", to: "22:00" },
      { day: "saturday", name: "السبت", isHoliday: false, from: "09:00", to: "22:00" },
    ],
    inventory: "no",
    orderSystem: "no",
    socialUrl: "",
    businessEmail: "",
    targetAudience: "",
    knowledgeSource: "template",
    persona: "formal",
    language: "",
    targetGroup: "all",
    activeChannels: ["whatsapp", "site"],
    fallbackAction: "",
    forbiddenWords: "غير قانوني، سياسية، منافس، اختراق، كود، تخفيض غير مصرح به",
    creativity: 80,
    notifications: ["new_request", "daily_report"],
  });

  const handleNext = () => {
    const form = document.querySelector("#profile-completion-form") as HTMLFormElement;
    if (validateForm(form)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleChannel = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      activeChannels: prev.activeChannels.includes(channel)
        ? prev.activeChannels.filter((c) => c !== channel)
        : [...prev.activeChannels, channel],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentStep < 3) {
      if (validateForm(e.currentTarget)) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo(0, 0);
      }
      return; 
    }

    if (validateForm(e.currentTarget)) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setNotification({ show: true, type: 'success', message: 'تم استكمال إعداد الخبير الذكي بنجاح!' });
        setTimeout(() => {
          onComplete();
        }, 2000);
      } catch (err) {
        setNotification({ show: true, type: 'error', message: 'تعذر الاتصال بالسيرفر.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isAr = i18n.language === 'ar';

  return (
    <div className="onboarding-wrapper" style={{ minHeight: 'auto', paddingTop: '2rem' }} dir={isAr ? "rtl" : "ltr"}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.8rem", color: "white", marginBottom: "0.5rem" }}>
            {t("onboarding.title")}
          </h2>
          <p style={{ color: "var(--white-70)" }}>
            {t("onboarding.desc")}
          </p>
        </div>

        {/* Stepper */}
        <div className="stepper-container" style={{ marginBottom: "2rem" }}>
          {[
            { id: 1, label: t("onboarding.steps.business") },
            { id: 2, label: t("onboarding.steps.tech") },
            { id: 3, label: t("onboarding.steps.behavior") },
          ].map((step) => (
            <div
              key={step.id}
              className={`step-item ${currentStep === step.id ? "active" : ""} ${currentStep > step.id ? "completed" : ""}`}
            >
              <div className="step-dot">{step.id}</div>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>

        <div className="onboarding-form" style={{ background: "var(--bg-card)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--white-10)" }}>
          <form id="profile-completion-form" onSubmit={handleSubmit}>
            {/* STEP 1 (BUSINESS) */}
            {currentStep === 1 && (
              <div className="form-section active">
                <h2 className="section-title-onboard">{t("onboarding.sec2.title")}</h2>
                <ToggleGroup
                  label={t("onboarding.sec2.catLabel")}
                  options={[
                    { label: t("onboarding.sec2.catComm"), value: "commercial" },
                    { label: t("onboarding.sec2.catInd"), value: "industrial" },
                  ]}
                  value={formData.businessCategory}
                  onChange={(val) => updateFormData("businessCategory", val)}
                />
                <div className="onboard-grid">
                  <div className="form-group">
                    <label className="form-label">{t("onboarding.sec2.nameLabel")}</label>
                    <input type="text" className="form-input" value={formData.businessName} onChange={(e) => updateFormData("businessName", e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("onboarding.sec2.typeLabel")}</label>
                    <input type="text" className="form-input" value={formData.businessType} onChange={(e) => updateFormData("businessType", e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("onboarding.sec2.ageLabel")}</label>
                    <input type="text" className="form-input" value={formData.businessAge} onChange={(e) => updateFormData("businessAge", e.target.value)} />
                  </div>
                  <CustomSelect
                    label={t("onboarding.sec2.presenceLabel")}
                    options={[
                      { label: t("onboarding.sec2.presOnline"), value: "online" },
                      { label: t("onboarding.sec2.presLocal"), value: "local" },
                      { label: t("onboarding.sec2.presBoth"), value: "both" },
                    ]}
                    value={formData.presence}
                    onChange={(val) => updateFormData("presence", val)}
                  />
                  <div className="form-group onboard-grid-full">
                    <label className="form-label">{t("onboarding.sec2.descLabel")}</label>
                    <textarea className="form-input" style={{ height: "80px" }} value={formData.businessDescription} onChange={(e) => updateFormData("businessDescription", e.target.value)} required></textarea>
                  </div>
                  <div className="form-group onboard-grid-full">
                    <label className="form-label">{t("onboarding.sec2.addressLabel")}</label>
                    <input type="text" className="form-input" value={formData.businessAddress} onChange={(e) => updateFormData("businessAddress", e.target.value)} required />
                  </div>

                  <ScheduleGrid
                    schedule={formData.schedule.map((d) => ({
                      ...d,
                      name: t(`onboarding.sec2.scheduleDays.${d.day}`),
                    }))}
                    onChange={(val) => updateFormData("schedule", val)}
                  />

                  <CustomSelect
                    label={t("onboarding.sec2.invLabel")}
                    options={[
                      { label: t("onboarding.sec2.no"), value: "no" },
                      { label: t("onboarding.sec2.yes"), value: "yes" },
                    ]}
                    value={formData.inventory}
                    onChange={(val) => updateFormData("inventory", val)}
                  />
                  <CustomSelect
                    label={t("onboarding.sec2.ordLabel")}
                    options={[
                      { label: t("onboarding.sec2.no"), value: "no" },
                      { label: t("onboarding.sec2.yes"), value: "yes" },
                    ]}
                    value={formData.orderSystem}
                    onChange={(val) => updateFormData("orderSystem", val)}
                  />
                  <div className="form-group">
                    <label className="form-label">{t("onboarding.sec2.socialLabel")}</label>
                    <input type="text" className="form-input" placeholder="https://instagram.com/..." value={formData.socialUrl} onChange={(e) => updateFormData("socialUrl", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("onboarding.sec2.busEmailLabel")}</label>
                    <input type="email" className="form-input" value={formData.businessEmail} onChange={(e) => updateFormData("businessEmail", e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("onboarding.sec2.targetLabel")}</label>
                    <input type="text" className="form-input" value={formData.targetAudience} onChange={(e) => updateFormData("targetAudience", e.target.value)} required />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 (TECH) */}
            {currentStep === 2 && (
              <div className="form-section active">
                <h2 className="section-title-onboard">{t("onboarding.sec3.title")}</h2>
                <ToggleGroup
                  label={t("onboarding.sec3.srcLabel")}
                  options={[
                    { label: t("onboarding.sec3.srcTemp"), value: "template" },
                    { label: t("onboarding.sec3.srcUp"), value: "upload" },
                  ]}
                  value={formData.knowledgeSource}
                  onChange={(val) => updateFormData("knowledgeSource", val)}
                />

                <div className="form-group">
                  <label className="form-label">{t("onboarding.sec3.personaLabel")}</label>
                  <div className="selection-cards">
                    {[
                      { id: "formal", label: t("onboarding.sec3.personaFormal"), icon: <User size={24} /> },
                      { id: "friendly", label: t("onboarding.sec3.personaFriendly"), icon: <MessageCircle size={24} /> },
                      { id: "helpful", label: t("onboarding.sec3.personaHelpful"), icon: <HelpCircle size={24} /> },
                    ].map((p) => (
                      <div key={p.id} className={`selection-card ${formData.persona === p.id ? "active" : ""}`} onClick={() => updateFormData("persona", p.id)}>
                        {p.icon}<div>{p.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="onboard-grid">
                  <CustomSelect
                    label={t("onboarding.sec3.langLabel")}
                    options={[
                      { label: t("onboarding.sec3.langFusha"), value: "fusha" },
                      { label: t("onboarding.sec3.langAmmiya"), value: "ammiya" },
                      { label: t("onboarding.sec3.langMixed"), value: "mixed" },
                    ]}
                    value={formData.language}
                    onChange={(val) => updateFormData("language", val)}
                  />
                  <CustomSelect
                    label={t("onboarding.sec3.groupLabel")}
                    options={[
                      { label: t("onboarding.sec3.groupAll"), value: "all" },
                      { label: t("onboarding.sec3.groupFemales"), value: "females" },
                      { label: t("onboarding.sec3.groupMales"), value: "males" },
                    ]}
                    value={formData.targetGroup}
                    onChange={(val) => updateFormData("targetGroup", val)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t("onboarding.sec3.channelsLabel")}</label>
                  <div className="chips">
                    {[
                      { id: "whatsapp", label: t("onboarding.sec3.chWhatsApp") },
                      { id: "site", label: t("onboarding.sec3.chSite") },
                      { id: "instagram", label: t("onboarding.sec3.chInstagram") },
                    ].map((ch) => (
                      <label key={ch.id} className="chip">
                        <input type="checkbox" checked={formData.activeChannels.includes(ch.id)} onChange={() => toggleChannel(ch.id)} /> {ch.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 (BEHAVIOR) */}
            {currentStep === 3 && (
              <div className="form-section active">
                <h2 className="section-title-onboard">{t("onboarding.sec4.title")}</h2>
                <CustomSelect
                  label={t("onboarding.sec4.fallbackLabel")}
                  options={[
                    { label: t("onboarding.sec4.fbText"), value: "fallback_text" },
                    { label: t("onboarding.sec4.fbHuman"), value: "redirect_human" },
                  ]}
                  value={formData.fallbackAction}
                  onChange={(val) => updateFormData("fallbackAction", val)}
                />
                <div className="form-group">
                  <label className="form-label">{t("onboarding.sec4.forbiddenLabel")}</label>
                  <textarea className="form-input" style={{ height: "100px" }} value={formData.forbiddenWords} onChange={(e) => updateFormData("forbiddenWords", e.target.value)}></textarea>
                </div>

                <div className="range-config">
                  <div className="range-header">
                    <label className="form-label">{t("onboarding.sec4.creativityLabel")}</label>
                    <span className="range-value-badge">{formData.creativity}%</span>
                  </div>
                  <input type="range" min="1" max="100" value={formData.creativity} onChange={(e) => updateFormData("creativity", parseInt(e.target.value))} style={{width:'100%'}}/>
                </div>

                <div className="form-group" style={{marginTop:'1.5rem'}}>
                  <label className="form-label">{t("onboarding.sec4.notifLabel")}</label>
                  <div className="chips">
                    {[
                      { id: "new_request", label: t("onboarding.sec4.notifNew") },
                      { id: "daily_report", label: t("onboarding.sec4.notifDaily") },
                    ].map((n) => (
                      <label key={n.id} className="chip">
                        <input type="checkbox" checked={formData.notifications.includes(n.id)} onChange={() => {
                          const newNotifs = formData.notifications.includes(n.id) ? formData.notifications.filter(x => x !== n.id) : [...formData.notifications, n.id];
                          updateFormData("notifications", newNotifs);
                        }} /> {n.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {error && <div className="error-banner shake" style={{ display: "block", marginTop:'1rem' }}>{error}</div>}

            <div className="form-nav-buttons" style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
              <div>
                {currentStep > 1 && (
                  <button type="button" className="btn-glass" onClick={handlePrev} style={{ padding: "0.625rem 1.5rem" }}>
                    {t("onboarding.nav.prev")}
                  </button>
                )}
              </div>
              {currentStep < 3 ? (
                <button type="button" className="btn-primary" onClick={handleNext} style={{ padding: "0.625rem 2.5rem" }}>
                  {t("onboarding.nav.next")}
                </button>
              ) : (
                <button type="submit" className="btn-primary" disabled={isLoading} style={{ padding: "0.625rem 2.5rem", opacity: isLoading ? 0.7 : 1 }}>
                  {isLoading ? (isAr ? "جاري الحفظ..." : "Saving...") : t("onboarding.nav.submit")}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      
      {/* Notification Modal */}
      {notification.show && (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
          <div className="modal-content slideUp-animation" style={{ background: "var(--bg-glass)", backdropFilter: "blur(16px)", padding: "2rem", borderRadius: "16px", textAlign: "center", border: "1px solid var(--white-10)" }}>
             {notification.type === "success" ? (
              <div style={{ color: "var(--neon)", margin: "0 auto 1.5rem" }}><CheckCircle size={56} /></div>
            ) : (
              <div style={{ color: "#ff4b4b", margin: "0 auto 1.5rem" }}><XCircle size={56} /></div>
            )}
            <h3 style={{ color: "white", marginBottom: "1rem", fontSize: "1.5rem" }}>
              {notification.type === "success" ? (isAr ? "اكتمل بنجاح" : "Completed Successfully") : (isAr ? "حدث خطأ" : "Error Occurred")}
            </h3>
            <p style={{ color: "var(--white-70)", marginBottom: "1.5rem" }}>{notification.message}</p>
            {notification.type === 'error' && (
              <button className="btn-glass" onClick={() => setNotification({ ...notification, show: false })}>{isAr ? "إغلاق" : "Close"}</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCompletionWizard;
