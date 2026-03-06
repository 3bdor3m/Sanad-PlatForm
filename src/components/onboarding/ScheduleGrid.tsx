import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DaySchedule {
  day: string;
  name: string;
  isHoliday: boolean;
  from: string;
  to: string;
}

interface ScheduleGridProps {
  schedule: DaySchedule[];
  onChange: (schedule: DaySchedule[]) => void;
}

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({ schedule, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleToggleHoliday = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].isHoliday = !newSchedule[index].isHoliday;
    onChange(newSchedule);
  };

  const handleTimeChange = (index: number, field: 'from' | 'to', value: string) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    onChange(newSchedule);
  };

  return (
    <div className="form-group onboard-grid-full">
      <div 
        className="form-label flex justify-between items-center cursor-pointer p-4 rounded-lg mb-2" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          userSelect: 'none', 
          background: 'rgba(255, 255, 255, 0.03)', 
          border: '1px solid rgba(255, 255, 255, 0.06)' 
        }}
      >
        <span>{t('onboarding.scheduleGrid.title')}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {isOpen && (
        <div className="schedule-grid" style={{ marginTop: '1rem' }}>
          {schedule.map((row, i) => (
            <div key={row.day} className="schedule-row" data-day={row.day}>
              <span className="day-name">{row.name}</span>
              <label className="holiday-toggle">
                <input 
                  type="checkbox" 
                  className="schedule-holiday" 
                  checked={row.isHoliday} 
                  onChange={() => handleToggleHoliday(i)} 
                />
                  <div className="toggle-switch"></div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--white-40)' }}>{t('onboarding.scheduleGrid.holiday')}</span>
                </label>
                <div className={`time-range ${row.isHoliday ? 'opacity-20 pointer-events-none' : ''}`}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--white-40)' }}>{t('onboarding.scheduleGrid.from')}</span>
                  <input 
                  type="time" 
                  value={row.from} 
                  onChange={(e) => handleTimeChange(i, 'from', e.target.value)} 
                />
                </div>
                <div className={`time-range ${row.isHoliday ? 'opacity-20 pointer-events-none' : ''}`}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--white-40)' }}>{t('onboarding.scheduleGrid.to')}</span>
                  <input 
                    type="time" 
                  value={row.to} 
                  onChange={(e) => handleTimeChange(i, 'to', e.target.value)} 
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
