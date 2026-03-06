import React, { useState } from "react";
import { useFormValidation } from "../hooks/useFormValidation";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { CheckCircle, XCircle } from "lucide-react";

const Login = () => {
  const { t, i18n } = useTranslation();
  const { error, validateForm, setError } = useFormValidation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({ show: false, type: 'success', message: '' });

  const isAr = i18n.language === 'ar';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(e.currentTarget)) {
      setIsLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000`;
        const response = await fetch(
          `${apiUrl}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          },
        );

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('sanad_uid', data.uid || data.user.id);
          if (data.token) localStorage.setItem('sanad_token', data.token);
          localStorage.setItem('sanad_profile_completed', data.isProfileComplete ? 'true' : 'false');
          navigate('/dashboard');
        } else {
          setNotification({ show: true, type: 'error', message: data.message || (isAr ? 'خطأ في تسجيل الدخول' : 'Login Error') });
        }
      } catch (err) {
        console.error("Login error:", err);
        setNotification({ show: true, type: 'error', message: isAr ? 'تعذر الاتصال بالسيرفر.' : 'Server connection error.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="auth-wrapper" dir={isAr ? "rtl" : "ltr"}>
      <Helmet>
        <title>{t("login.title")}</title>
        <meta name="description" content={t("login.desc")} />
      </Helmet>
      <div className="form-container" style={{ padding: "3rem 2.5rem" }}>
        <div className="form-header">
          <h1 className="form-title">{t("login.pageTitle")}</h1>
          <p className="form-subtitle">{t("login.pageSubtitle")}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ textAlign: isAr ? 'right' : 'left' }}>{t("login.emailLabel")}</label>
            <input
              type="email"
              className="form-input"
              placeholder={t("login.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              maxLength={255}
              required
              style={{ textAlign: isAr ? 'right' : 'left' }}
            />
          </div>
          <div className="form-group">
            <label className="form-label" style={{ textAlign: isAr ? 'right' : 'left' }}>{t("login.passwordLabel")}</label>
            <input
              type="password"
              className="form-input"
              placeholder={t("login.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              maxLength={128}
              required
              style={{ textAlign: isAr ? 'right' : 'left' }}
            />
          </div>

          {error && (
            <div className="error-banner shake" style={{ display: "block" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary btn-full"
            style={{ marginTop: "0.5rem" }}
            disabled={isLoading}
          >
            {isLoading ? (isAr ? "جاري التحميل..." : "Loading...") : t("login.submitBtn")}
          </button>
        </form>

        <div className="auth-separator">
          <span>{t("login.or")}</span>
        </div>

        <div className="social-login">
          <button className="btn-social">
            {/* Google SVG from static */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c3.11 0 5.72-1.03 7.63-2.79l-3.57-2.77c-.99.66-2.26 1.05-4.06 1.05-3.12 0-5.77-2.11-6.72-4.94H2.01v3.06C3.91 19.58 7.69 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.28 13.55c-.24-.72-.38-1.49-.38-2.3s.14-1.58.38-2.3V5.89H2.01C1.28 7.34 1 8.97 1 10.75c0 1.78.28 3.41.73 4.86l3.55-2.06z"
                fill="#FBBC05"
              />
              <path
                d="M12 4.75c1.69 0 3.21.58 4.41 1.72l3.31-3.31C17.71 1.03 15.1 0 12 0 7.69 0 3.91 3.42 2.01 7.69l3.55 3.06c.95-2.83 3.6-4.94 6.72-4.94z"
                fill="#EA4335"
              />
            </svg>
            {t("login.google")}
          </button>
          <button type="button" className="btn-social">
            {/* Microsoft SVG */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 0H0V10H10V0Z" fill="#F25022" />
              <path d="M21 0H11V10H21V0Z" fill="#7FBA00" />
              <path d="M10 11H0V21H10V11Z" fill="#00A4EF" />
              <path d="M21 11H11V21H21V11Z" fill="#FFB900" />
            </svg>
            {t("login.microsoft")}
          </button>
        </div>

        <div className="auth-footer">
          <span>{t("login.noAccount")}</span>{" "}
          <Link
            to="/start"
            className={`text-neon hover:underline font-bold ${isAr ? 'mr-1' : 'ml-1'}`}
          >
            {t("login.createAccount")}
          </Link>
        </div>

        {/* Login notification overlay */}
        {notification.show && (
          <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
            <div className="modal-content slideUp-animation" style={{ background: "var(--bg-glass)", backdropFilter: "blur(16px)", padding: "2rem", borderRadius: "16px", textAlign: "center", border: "1px solid var(--white-10)", maxWidth: '350px' }}>
              <div style={{ color: "#ff4b4b", margin: "0 auto 1.5rem", display: 'flex', justifyContent: 'center' }}><XCircle size={56} /></div>
              <h3 style={{ color: "white", marginBottom: "1rem", fontSize: "1.5rem" }}>{isAr ? "خطأ" : "Error"}</h3>
              <p style={{ color: "var(--white-70)", marginBottom: "1.5rem" }}>{notification.message}</p>
              <button className="btn-glass" style={{ width: '100%' }} onClick={() => setNotification({ ...notification, show: false })}>{isAr ? "إغلاق" : "Close"}</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Login;
