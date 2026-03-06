import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCompletionWizard from '../components/onboarding/ProfileCompletionWizard';
import { Bot, Settings, Edit3, X, Building, Target, Zap, Lock, Save, AlertTriangle, CheckCircle, Smartphone, Mail, Briefcase, Globe, Camera, Crown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import ShinyText from '../components/ui/ShinyText';
import { useTranslation } from 'react-i18next'; // Add this

const Dashboard = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Add this
  const isRTL = i18n.language === 'ar'; // Add this
  const [uid, setUid] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(true);
  const [showCompletionWizard, setShowCompletionWizard] = useState(false);
  
  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{show: boolean, type: string, message: string}>({show: false, type: '', message: ''});

  // Avatar Cropper State
  const [showCropper, setShowCropper] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl as string);
      setShowCropper(true);
    }
  };

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const handleCropImage = async () => {
    try {
      if (imageSrc && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          imageSrc,
          croppedAreaPixels,
          0
        );
        // Save base64 to editData immediately 
        setEditData({ ...editData, avatar: croppedImage });
        setShowCropper(false);
      }
    } catch (e) {
      console.error(e);
      setNotification({ show: true, type: 'error', message: 'فشل في قص الصورة' });
    }
  };

  const fetchUserData = async (currentUid: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000`;
      const res = await fetch(`${apiUrl}/api/user-profile/${currentUid}`);
      const json = await res.json();
      if (json.success && json.data) {
        setUserData(json.data);
        setEditData(json.data);
        if (!json.data.businessName || json.data.businessName.trim() === '') {
          setIsProfileComplete(false);
        } else {
          setIsProfileComplete(true);
        }
      }
    } catch (e) {
      console.error("Error fetching user data", e);
    }
  };

  useEffect(() => {
    const storedUid = localStorage.getItem('sanad_uid');
    
    if (!storedUid) {
      navigate('/login');
    } else {
      setUid(storedUid);
      fetchUserData(storedUid);
    }
  }, [navigate, showCompletionWizard]);

  const handleProfileCompleted = () => {
    localStorage.setItem('sanad_profile_completed', 'true');
    setIsProfileComplete(true);
    setShowCompletionWizard(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('sanad_uid');
    localStorage.removeItem('sanad_profile_completed');
    navigate('/');
  };

  const handleSave = async () => {
    if (!passwordConfirm) {
      setNotification({ show: true, type: 'error', message: 'الرجاء إدخال كلمة المرور لتأكيد التعديلات.' });
      setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
      return;
    }

    setSaving(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000`;
      const response = await fetch(`${apiUrl}/api/update-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid,
          password: passwordConfirm,
          updateData: editData
        })
      });
      
      const resData = await response.json();
      if (response.ok && resData.success) {
        setNotification({ show: true, type: 'success', message: 'تم تحديث البيانات بنجاح.' });
        setUserData(editData);
        setIsEditing(false);
        setPasswordConfirm('');
        setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
      } else {
        setNotification({ show: true, type: 'error', message: resData.message || 'فشل التحديث، تأكد من كلمة المرور.' });
        setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
      }
    } catch (err) {
      setNotification({ show: true, type: 'error', message: 'خطأ في الاتصال بالخادم.' });
      setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (!uid) return null;

  return (
    <main className="page-wrapper" style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <Helmet>
        <title>لوحة التحكم | سند</title>
      </Helmet>

      {/* Completion Wizard Modal Overlay */}
      {showCompletionWizard && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, overflowY: 'auto', paddingTop: '4rem' }}>
           <button 
             onClick={() => setShowCompletionWizard(false)}
             style={{ position: 'absolute', top: '2rem', left: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 1001 }}
           >
             <X size={32} />
           </button>
           <ProfileCompletionWizard uid={uid} onComplete={handleProfileCompleted} />
        </div>
      )}

      <div className="container" style={{ padding: '0 1rem 3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{t('dashboard.welcome', { name: userData?.fullName })}</h1>
            <p style={{ color: 'var(--white-50)' }}>{t('dashboard.subtitle')}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {isProfileComplete && !isEditing && (
               <button onClick={() => setIsEditing(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem' }}>
                 <Edit3 size={18} /> {t('dashboard.editBtn')}
               </button>
            )}
            {isEditing && (
               <button onClick={() => setIsEditing(false)} className="btn-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem' }}>
                 <X size={18} /> {t('dashboard.cancelEditBtn')}
               </button>
            )}
            <button onClick={handleLogout} className="btn-glass" style={{ padding: '0.6rem 1.2rem' }}>{t('dashboard.logoutBtn')}</button>
          </div>
        </div>

        {/* Global Notifications */}
        {notification.show && (
          <div style={{ marginBottom: '2rem', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem', background: notification.type === 'error' ? 'rgba(255, 75, 75, 0.1)' : 'rgba(23, 229, 150, 0.1)', border: `1px solid ${notification.type === 'error' ? '#ff4b4b' : 'var(--neon)'}`, color: 'white' }}>
             {notification.type === 'error' ? <AlertTriangle color="#ff4b4b" /> : <CheckCircle color="var(--neon)" />}
             {notification.message}
          </div>
        )}

        {/* Profile Completion Alert */}
        {!isProfileComplete && !showCompletionWizard && (
          <div style={{ background: 'rgba(255, 185, 0, 0.1)', border: '1px solid #FFB900', borderRadius: '16px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <AlertTriangle color="#FFB900" size={32} />
              <div>
                <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '0.3rem' }}>{t('dashboard.incompleteAlertTitle')}</h3>
                <p style={{ color: 'var(--white-70)' }}>{t('dashboard.incompleteAlertDesc')}</p>
              </div>
            </div>
            <button onClick={() => setShowCompletionWizard(true)} className="btn-primary" style={{ padding: '0.8rem 1.5rem', background: '#FFB900', color: 'black' }}>
              {t('dashboard.completeNowBtn')}
            </button>
          </div>
        )}

        {/* Dashboard Content */}
        {userData && (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Section 1: Basic Info */}
            <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--white-10)' }}>
              
              {/* Header Profile Section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--neon)', background: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                   {editData.avatar || userData.avatar ? (
                     <img src={editData.avatar || userData.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   ) : (
                     <Bot size={48} color="var(--white-50)" />
                   )}
                   {isEditing && (
                     <>
                       <div 
                         style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                         onClick={() => fileInputRef.current?.click()}
                       >
                         <Camera color="white" />
                       </div>
                       <input 
                          type="file" 
                          ref={fileInputRef} 
                          style={{ display: 'none' }} 
                          accept="image/*"
                          onChange={handleFileChange}
                       />
                     </>
                   )}
                </div>
                <div style={{ flexGrow: 1 }}>
                   <h2 style={{ color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.4rem' }}>
                     <Settings color="var(--neon)" /> {t('dashboard.accountInfo')}
                   </h2>
                   <div style={{ color: 'var(--white-70)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 1rem', borderRadius: '20px' }}>
                        <Zap size={16} color="var(--neon)" /> 
                        <span style={{ color: 'var(--neon)' }}>{userData.selectedPlan === 'pro' ? t('dashboard.proPlan') : t('dashboard.freePlan')}</span>
                      </div>
                      {userData.selectedPlan === 'free' && (
                         <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer' }}>
                            <Crown size={16} /> 
                            <ShinyText text={t('dashboard.upgradeAccount')} disabled={false} speed={3} className="" pauseOnHover={true} />
                         </button>
                      )}
                   </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div>
                   <label style={{ display: 'block', color: 'var(--white-50)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>الاسم الكامل</label>
                   {isEditing ? (
                     <input type="text" className="form-input" value={editData.fullName || ''} onChange={e => setEditData({...editData, fullName: e.target.value})} />
                   ) : (
                     <div style={{ color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bot size={18} opacity={0.5} /> {userData.fullName}</div>
                   )}
                </div>
                <div>
                   <label style={{ display: 'block', color: 'var(--white-50)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>الهاتف</label>
                   {isEditing ? (
                     <input type="text" className="form-input" value={editData.phone || ''} onChange={e => setEditData({...editData, phone: e.target.value})} />
                   ) : (
                     <div style={{ color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Smartphone size={18} opacity={0.5} /> <span dir="ltr">{userData.phone}</span></div>
                   )}
                </div>
                <div>
                   <label style={{ display: 'block', color: 'var(--white-50)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>البريد الإلكتروني</label>
                   <div style={{ color: 'var(--white-70)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={18} opacity={0.5} /> {userData.personalEmail}</div>
                </div>
              </div>
            </div>

            {/* Section 2: Business Info */}
               <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--white-10)' }}>
                 <h2 style={{ color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.4rem' }}>
                   <Briefcase color="#a855f7" /> بيانات النشاط
                 </h2>
                 {isProfileComplete ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                      <div style={{ gridColumn: '1 / -1' }}>
                         <label style={{ display: 'block', color: 'var(--white-50)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>وصف النشاط</label>
                         {isEditing ? (
                           <textarea className="form-input" rows={3} value={editData.businessDescription || ''} onChange={e => setEditData({...editData, businessDescription: e.target.value})} />
                         ) : (
                           <div style={{ color: 'white', fontSize: '1rem', lineHeight: '1.6', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>{userData.businessDescription || 'غير محدد'}</div>
                         )}
                      </div>
                      <div>
                         <label style={{ display: 'block', color: 'var(--white-50)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>اسم النشاط</label>
                         {isEditing ? (
                           <input type="text" className="form-input" value={editData.businessName || ''} onChange={e => setEditData({...editData, businessName: e.target.value})} />
                         ) : (
                           <div style={{ color: 'white', fontSize: '1.1rem' }}>{userData.businessName || 'غير محدد'}</div>
                         )}
                      </div>
                      <div>
                         <label style={{ display: 'block', color: 'var(--white-50)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>مجال النشاط</label>
                         {isEditing ? (
                           <input type="text" className="form-input" value={editData.businessCategory || ''} onChange={e => setEditData({...editData, businessCategory: e.target.value})} />
                         ) : (
                           <div style={{ color: 'white', fontSize: '1.1rem' }}>{userData.businessCategory || 'غير محدد'}</div>
                         )}
                      </div>
                      <div>
                         <label style={{ display: 'block', color: 'var(--white-50)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>الموقع / الروابط</label>
                         {isEditing ? (
                           <input type="text" className="form-input" value={editData.socialUrl || ''} onChange={e => setEditData({...editData, socialUrl: e.target.value})} />
                         ) : (
                           <div style={{ color: '#3b82f6', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} dir="ltr"><Globe size={18} /> {userData.socialUrl || 'لا يوجد رابط'}</div>
                         )}
                      </div>
                    </div>
                 ) : (
                    <p style={{ color: 'var(--white-50)' }}>البيانات غير مكتملة بعد.</p>
                 )}
               </div>

            {/* Section 3: AI Bot Setup */}
               <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--white-10)' }}>
                 <h2 style={{ color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.4rem' }}>
                   <Target color="#3b82f6" /> تخصيص المساعد الذكي
                 </h2>
                 {isProfileComplete ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                      <div style={{ gridColumn: '1 / -1' }}>
                         <label style={{ display: 'block', color: 'var(--white-50)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>شخصية الخبير (Tone of voice)</label>
                         {isEditing ? (
                           <select className="form-input" value={editData.persona || ''} onChange={e => setEditData({...editData, persona: e.target.value})}>
                             <option value="formal">احترافي ورسمي</option>
                             <option value="friendly">ودود ومبادر</option>
                             <option value="humorous">مرح وفكاهي</option>
                             <option value="tech">تقني ومباشر</option>
                           </select>
                         ) : (
                           <div style={{ color: 'white', fontSize: '1.1rem' }}>{userData.persona === 'formal' ? 'احترافي ورسمي' : userData.persona === 'friendly' ? 'ودود ومبادر' : userData.persona === 'humorous' ? 'مرح وفكاهي' : userData.persona === 'tech' ? 'تقني ومباشر' : userData.persona || 'غير محدد'}</div>
                         )}
                      </div>
                      <div>
                         <label style={{ display: 'block', color: 'var(--white-50)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>لغة التواصل</label>
                         {isEditing ? (
                           <input type="text" className="form-input" value={editData.language || ''} onChange={e => setEditData({...editData, language: e.target.value})} />
                         ) : (
                           <div style={{ color: 'white', fontSize: '1.1rem' }}>{userData.language || 'غير محدد'}</div>
                         )}
                      </div>
                      <div>
                         <label style={{ display: 'block', color: 'var(--white-50)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>الكلمات المحظورة</label>
                         {isEditing ? (
                           <input type="text" className="form-input" value={editData.forbiddenWords || ''} onChange={e => setEditData({...editData, forbiddenWords: e.target.value})} />
                         ) : (
                           <div style={{ color: '#ff4b4b', fontSize: '1.1rem' }}>{userData.forbiddenWords || 'لا يوجد'}</div>
                         )}
                      </div>
                    </div>
                 ) : (
                    <p style={{ color: 'var(--white-50)' }}>البيانات غير مكتملة بعد.</p>
                 )}
               </div>

            {/* Save Controls */}
            {isEditing && (
               <div className="slideUp-animation" style={{ background: 'rgba(23, 229, 150, 0.05)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--neon)', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
                 <div>
                   <h3 style={{ color: 'var(--neon)', fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Lock size={20} /> تأكيد الهوية</h3>
                   <p style={{ color: 'var(--white-70)' }}>لحفظ التعديلات يرجى إدخال كلمة المرور الحالية.</p>
                 </div>
                 <div style={{ display: 'flex', gap: '1rem', width: '100%', flexWrap: 'wrap' }}>
                   <div style={{ flexGrow: 1, position: 'relative', maxWidth: '400px' }}>
                     <Lock size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--white-50)' }} />
                     <input 
                       type="password" 
                       className="form-input" 
                       placeholder="كلمة المرور..." 
                       value={passwordConfirm}
                       onChange={e => setPasswordConfirm(e.target.value)}
                       style={{ paddingRight: '3rem' }}
                     />
                   </div>
                   <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ padding: '0 2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: saving ? 0.7 : 1 }}>
                     {saving ? 'جاري الحفظ...' : <><Save size={18} /> حفظ التعديلات</>}
                   </button>
                 </div>
               </div>
            )}
          </div>
        )}
      </div>

      {/* Image Cropper Modal */}
      {showCropper && (
         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, background: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', height: '60%', maxWidth: '600px', background: '#333' }}>
              <Cropper
                image={imageSrc || ''}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div style={{ padding: '2rem', display: 'flex', gap: '1rem' }}>
              <button className="btn-primary" onClick={handleCropImage}>قص وحفظ</button>
              <button className="btn-glass" onClick={() => setShowCropper(false)}>إلغاء</button>
            </div>
         </div>
      )}
    </main>
  );
};

export default Dashboard;
