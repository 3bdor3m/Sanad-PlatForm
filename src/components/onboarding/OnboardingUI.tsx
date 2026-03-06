import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// --- Custom Select ---
interface CustomSelectProps {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className={`custom-select-wrapper ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <div className="custom-select-trigger">
          <span>{selectedOption ? selectedOption.label : (t('onboarding.selectPlaceholder') || 'اختر...')}</span>
          <ChevronDown size={16} />
        </div>
        {isOpen && (
          <div className="custom-options">
            {options.map(opt => (
              <div 
                key={opt.value} 
                className={`custom-option ${value === opt.value ? 'selected' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Toggle Group ---
interface ToggleGroupProps {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="toggle-group">
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            className={`toggle-btn ${value === opt.value ? 'active' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};
