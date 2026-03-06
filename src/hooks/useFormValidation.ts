import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useFormValidation = () => {
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const validateForm = (formElement: HTMLFormElement) => {
    const inputs = formElement.querySelectorAll('input, textarea');
    let isValid = true;
    let errorType: 'missing' | 'email' | 'url' | 'password' | null = null;

    inputs.forEach((inputNode) => {
      const input = inputNode as HTMLInputElement | HTMLTextAreaElement;
      const isRequired = input.hasAttribute('required');
      const isEmpty = !input.value.trim();
      const isEmail = input.type === 'email';
      const isUrl = input.type === 'url';
      const isPassword = input.type === 'password';

      let fieldValid = true;

      if (isRequired && isEmpty) {
        fieldValid = false;
        if (!errorType) errorType = 'missing';
      } else if (!isEmpty && isEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          fieldValid = false;
          if (!errorType) errorType = 'email';
        }
      } else if (!isEmpty && isUrl && !input.checkValidity()) {
        fieldValid = false;
        if (!errorType) errorType = 'url';
      } else if (!isEmpty && isPassword) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
        if (!passwordRegex.test(input.value)) {
          fieldValid = false;
          if (!errorType) errorType = 'password';
        }
      }

      if (!fieldValid) {
        isValid = false;
        input.style.borderColor = '#ff4b4b';
        
        const handleInput = () => {
          input.style.borderColor = '';
          setError(null);
          input.removeEventListener('input', handleInput);
        };
        input.addEventListener('input', handleInput);
      }
    });

    if (!isValid) {
      let message = t('validation.missing', 'يرجى ملء جميع الحقول المطلوبة.');
      if (errorType === 'email') message = t('validation.email', 'يرجى كتابة بريد إلكتروني صحيح (يجب أن يحتوي على رمز @ ومزود خدمة مثل gmail.com أو hotmail.com).');
      if (errorType === 'url') message = t('validation.url', 'يرجى إدخال رابط (URL) صحيح بدقة.');
      if (errorType === 'password') message = t('validation.password', 'كلمة المرور يجب أن لا تقل عن 8 أحرف وتحتوي على حرف كبير، حرف صغير، ورقم.');
      setError(message);
    } else {
      setError(null);
    }

    return isValid;
  };

  return { error, validateForm, setError };
};
