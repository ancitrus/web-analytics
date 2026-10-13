/**
 * Contact Form Validation & Submission
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const statusEl = document.getElementById('form-status');

  // Validation rules
  const validators = {
    name: (value) => {
      if (!value.trim()) return 'Пожалуйста, введите ваше имя';
      if (value.trim().length < 2) return 'Имя должно содержать минимум 2 символа';
      return '';
    },
    email: (value) => {
      if (!value.trim()) return 'Пожалуйста, введите email';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) return 'Введите корректный email адрес';
      return '';
    },
    message: (value) => {
      if (!value.trim()) return 'Пожалуйста, введите сообщение';
      if (value.trim().length < 10) return 'Сообщение должно содержать минимум 10 символов';
      return '';
    }
  };

  function showError(input, errorEl, message) {
    input.classList.add('error');
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearError(input, errorEl) {
    input.classList.remove('error');
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  function validateField(input, validator) {
    const errorEl = document.getElementById(`${input.id}-error`);
    const error = validator(input.value);
    if (error) {
      showError(input, errorEl, error);
      return false;
    }
    clearError(input, errorEl);
    return true;
  }

  // Real-time validation on blur
  nameInput.addEventListener('blur', () => validateField(nameInput, validators.name));
  emailInput.addEventListener('blur', () => validateField(emailInput, validators.email));
  messageInput.addEventListener('blur', () => validateField(messageInput, validators.message));

  // Clear error on input
  nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) {
      validateField(nameInput, validators.name);
    }
  });
  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
      validateField(emailInput, validators.email);
    }
  });
  messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('error')) {
      validateField(messageInput, validators.message);
    }
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    isValid = validateField(nameInput, validators.name) && isValid;
    isValid = validateField(emailInput, validators.email) && isValid;
    isValid = validateField(messageInput, validators.message) && isValid;

    if (!isValid) {
      statusEl.className = 'form-status error';
      statusEl.textContent = 'Пожалуйста, исправьте ошибки в форме.';
      return;
    }

    // Simulate submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;

    setTimeout(() => {
      statusEl.className = 'form-status success';
      statusEl.textContent = 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.';
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // Hide status after 5 seconds
      setTimeout(() => {
        statusEl.className = 'form-status';
        statusEl.textContent = '';
      }, 5000);
    }, 1500);
  });
});
