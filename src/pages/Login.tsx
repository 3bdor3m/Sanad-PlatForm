import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { XCircle, CheckCircle, Loader2, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [notification, setNotification] = useState<{ 
    show: boolean; 
    type: 'success' | 'error'; 
    message: string 
  }>({ show: false, type: 'success', message: '' });

  const isAr = i18n.language === 'ar';
  const from = location.state?.from?.pathname || '/dashboard';

  const getErrorMessage = (error: any): string => {
    return isAr ? 'حدث خطأ في تسجيل الدخول' : 'Login error occurred';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      setNotification({ 
        show: true, 
        type: 'error', 
        message: isAr ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter email and password' 
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('sanad_uid', email);
      setNotification({ 
        show: true, 
        type: 'success', 
        message: isAr ? 'تم تسجيل الدخول بنجاح!' : 'Logged in successfully!' 
      });
      
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      setNotification({ 
        show: true, 
        type: 'error', 
        message: isAr ? 'حدث خطأ في تسجيل الدخول' : 'Login error occurred' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('sanad_uid', 'google-test-user-id');
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setNotification({ 
        show: true, 
        type: 'error', 
        message: isAr ? 'يرجى إدخال بريدك الإلكتروني أولاً' : 'Please enter your email first' 
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotification({ 
        show: true, 
        type: 'success', 
        message: isAr 
          ? 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني' 
          : 'Password reset link sent to your email' 
      });
      setShowForgotPassword(false);
    } catch (error) {
      console.error("Reset password error:", error);
      setNotification({ 
        show: true, 
        type: 'error', 
        message: isAr 
          ? 'حدث خطأ في إرسال رابط إعادة التعيين' 
          : 'Error sending reset link' 
      });
    } finally {
      setIsLoading(false);
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
            <label className="form-label" style={{ textAlign: isAr ? 'right' : 'left' }}>
              {t("login.emailLabel")}
            </label>
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
            <label className="form-label" style={{ textAlign: isAr ? 'right' : 'left' }}>
              {t("login.passwordLabel")}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder={t("login.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                maxLength={128}
                required
                style={{ 
                  textAlign: isAr ? 'right' : 'left',
                  paddingRight: '3rem'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  [isAr ? 'left' : 'right']: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--white-40)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-neon hover:underline"
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                color: 'var(--neon-green)'
              }}
            >
              {isAr ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
            </button>
          </div>

          <button
            type="submit"
            className="btn-primary btn-full"
            style={{ marginTop: "0.5rem" }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Loader2 className="animate-spin" size={18} />
                {isAr ? 'جاري تسجيل الدخول...' : 'Logging in...'}
              </span>
            ) : (
              t("login.submitBtn")
            )}
          </button>
        </form>

        <div className="auth-separator">
          <span>{t("login.or")}</span>
        </div>

        <div className="social-login">
          <button 
            className="btn-social"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
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

        {notification.show && (
          <div className="modal-overlay" style={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: "rgba(0,0,0,0.7)", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            zIndex: 9999 
          }}>
            <div className="modal-content slideUp-animation" style={{ 
              background: "var(--bg-glass)", 
              backdropFilter: "blur(16px)", 
              padding: "2rem", 
              borderRadius: "16px", 
              textAlign: "center", 
              border: "1px solid var(--white-10)", 
              maxWidth: '350px' 
            }}>
              <div style={{ 
                color: notification.type === 'error' ? "#ff4b4b" : "#17e596", 
                margin: "0 auto 1.5rem", 
                display: 'flex', 
                justifyContent: 'center' 
              }}>
                {notification.type === 'error' ? <XCircle size={56} /> : <CheckCircle size={56} />}
              </div>
              <h3 style={{ 
                color: "white", 
                marginBottom: "1rem", 
                fontSize: "1.5rem" 
              }}>
                {notification.type === 'error' 
                  ? (isAr ? "خطأ" : "Error") 
                  : (isAr ? "نجاح" : "Success")
                }
              </h3>
              <p style={{ 
                color: "var(--white-70)", 
                marginBottom: "1.5rem" 
              }}>
                {notification.message}
              </p>
              <button 
                className="btn-glass" 
                style={{ width: '100%' }} 
                onClick={() => setNotification({ ...notification, show: false })}
              >
                {isAr ? "إغلاق" : "Close"}
              </button>
            </div>
          </div>
        )}

        {showForgotPassword && (
          <div className="modal-overlay" style={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: "rgba(0,0,0,0.7)", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            zIndex: 9999 
          }}>
            <div className="modal-content slideUp-animation" style={{ 
              background: "var(--bg-glass)", 
              backdropFilter: "blur(16px)", 
              padding: "2rem", 
              borderRadius: "16px", 
              textAlign: "center", 
              border: "1px solid var(--white-10)", 
              maxWidth: '350px' 
            }}>
              <h3 style={{ 
                color: "white", 
                marginBottom: "1rem", 
                fontSize: "1.5rem" 
              }}>
                {isAr ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}
              </h3>
              <p style={{ 
                color: "var(--white-70)", 
                marginBottom: "1.5rem" 
              }}>
                {isAr 
                  ? 'سيتم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني' 
                  : 'A password reset link will be sent to your email'}
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  className="btn-glass" 
                  style={{ flex: 1 }} 
                  onClick={() => setShowForgotPassword(false)}
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button 
                  className="btn-primary" 
                  style={{ flex: 1 }} 
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={18} style={{ margin: '0 auto' }} />
                  ) : (
                    isAr ? 'إرسال' : 'Send'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Login;
