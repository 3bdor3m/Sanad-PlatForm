import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Booking = () => {
  const { t } = useTranslation();
  const { error, validateForm } = useFormValidation();
  const [selectedDay, setSelectedDay] = useState(22);
  const [selectedSlot, setSelectedSlot] = useState('10:30 ص');
  const [notes, setNotes] = useState('');

  const days = [
    { num: 26, disabled: true }, { num: 27, disabled: true }, { num: 28, disabled: true },
    { num: 29, disabled: true }, { num: 30, disabled: true }, { num: 31, disabled: true },
    { num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }, { num: 6 }, { num: 7 },
    { num: 8 }, { num: 9 }, { num: 10 }, { num: 11 }, { num: 12 }, { num: 13 }, { num: 14 },
    { num: 15 }, { num: 16 }, { num: 17 }, { num: 18 }, { num: 19 }, { num: 20 }, { num: 21 },
    { num: 22 }, { num: 23 }, { num: 24 }, { num: 25 }, { num: 26 }, { num: 27 }, { num: 28 }
  ];

  const slots = ['09:00 ص', '10:30 ص', '01:00 م', '02:30 م', '04:00 م'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(e.currentTarget)) {
      console.log('Booking confirmed:', { selectedDay, selectedSlot, notes });
      // Proceed with booking logic
    }
  };

  return (
    <main className="booking-wrapper">
      <Helmet>
        <title>{t('booking.title')}</title>
        <meta name="description" content={t('booking.desc')} />
      </Helmet>
      <div className="container booking-container">
        <div className="form-header">
          <h1 className="form-title" dangerouslySetInnerHTML={{ __html: t('booking.pageTitle') }} />
          <p className="form-subtitle">{t('booking.pageSubtitle')}</p>
        </div>

        <div className="booking-grid">
          <div className="booking-main">
            <div className="calendar-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{t('booking.month')}</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-social" style={{ padding: '0.4rem', width: 'auto' }}><ChevronRight size={18} /></button>
                <button className="btn-social" style={{ padding: '0.4rem', width: 'auto' }}><ChevronLeft size={18} /></button>
              </div>
            </div>

            <div className="calendar-grid">
              {(t('booking.days', { returnObjects: true }) as string[]).map(d => (
                <div key={d} className="calendar-day-label">{d}</div>
              ))}
              {days.map((d, i) => (
                <div 
                  key={i} 
                  className={`calendar-day ${d.disabled ? 'disabled' : ''} ${selectedDay === d.num && !d.disabled ? 'active' : ''}`}
                  onClick={() => !d.disabled && setSelectedDay(d.num)}
                >
                  {d.num}
                </div>
              ))}
            </div>

            <div className="slots-title">{t('booking.slotsTitle')}</div>
            <div className="slots-grid">
              {slots.map(s => (
                <button 
                  key={s} 
                  className={`slot-btn ${selectedSlot === s ? 'selected' : ''}`}
                  onClick={() => setSelectedSlot(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: '2.5rem' }}>
              <div className="form-group">
                <label className="form-label">{t('booking.notesLabel')}</label>
                <textarea 
                  className="form-input" 
                  style={{ height: '100px', resize: 'none' }}
                  placeholder={t('booking.notesPlaceholder')}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              {error && (
                <div className="error-banner shake" style={{ display: 'block' }}>
                  {error}
                </div>
              )}

              <button type="submit" className="btn-primary btn-full">{t('booking.submitBtn')}</button>
            </form>
          </div>

          <div className="booking-summary">
            <h3 className="summary-title">{t('booking.summaryTitle')}</h3>

            <div className="summary-item">
              <span className="summary-label">{t('booking.serviceTypeLabel')}</span>
              <span className="summary-value">{t('booking.serviceTypeValue')}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">{t('booking.dateLabel')}</span>
              <span className="summary-value sum-date-val">{selectedDay} {t('booking.dateSuffix')}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">{t('booking.timeLabel')}</span>
              <span className="summary-value">{selectedSlot}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">{t('booking.durationLabel')}</span>
              <span className="summary-value">{t('booking.durationValue')}</span>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--white-10)' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--white-40)', lineHeight: '1.6' }}>
                {t('booking.footerNote')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Booking;
