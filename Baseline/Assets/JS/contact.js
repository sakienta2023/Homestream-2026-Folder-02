/* =========================================================
   CONTACT PAGE — Form Validation & Submission
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const btnText    = document.getElementById('btnText');
  const btnIcon    = document.getElementById('btnIcon');
  const feedback   = document.getElementById('formFeedback');

  if (!form) return;

  /* ── Field references ── */
  const fields = {
    fullName : document.getElementById('fullName'),
    phone    : document.getElementById('phone'),
    email    : document.getElementById('email'),
    subject  : document.getElementById('subject'),
    message  : document.getElementById('message'),
  };
  const errors = {
    fullName : document.getElementById('nameError'),
    phone    : document.getElementById('phoneError'),
    subject  : document.getElementById('subjectError'),
    message  : document.getElementById('messageError'),
  };

  /* ── Helpers ── */
  function setError(field, msg) {
    field.classList.add('error');
    if (errors[field.id]) errors[field.id].textContent = msg;
  }

  function clearError(field) {
    field.classList.remove('error');
    if (errors[field.id]) errors[field.id].textContent = '';
  }

  function isValidPhone(v) {
    return /^[\d\s\+\-\(\)]{7,20}$/.test(v.trim());
  }

  function isValidEmail(v) {
    return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  /* Live validation — clear errors as user types */
  Object.values(fields).forEach(f => {
    if (!f) return;
    f.addEventListener('input', () => clearError(f));
    f.addEventListener('change', () => clearError(f));
  });

  /* ── Validate all ── */
  function validate() {
    let valid = true;

    if (!fields.fullName.value.trim()) {
      setError(fields.fullName, 'Please enter your full name.');
      valid = false;
    }

    if (!fields.phone.value.trim()) {
      setError(fields.phone, 'Please enter your phone number.');
      valid = false;
    } else if (!isValidPhone(fields.phone.value)) {
      setError(fields.phone, 'Enter a valid phone number.');
      valid = false;
    }

    if (!isValidEmail(fields.email.value)) {
      setError(fields.email, 'Enter a valid email address.');
      valid = false;
    }

    if (!fields.subject.value) {
      setError(fields.subject, 'Please select an option.');
      valid = false;
    }

    if (!fields.message.value.trim()) {
      setError(fields.message, 'Please write a message.');
      valid = false;
    } else if (fields.message.value.trim().length < 10) {
      setError(fields.message, 'Message is too short (minimum 10 characters).');
      valid = false;
    }

    return valid;
  }

  /* ── Submit handler ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    feedback.className = 'form-feedback';
    feedback.style.display = 'none';

    if (!validate()) return;

    /* Loading state */
    submitBtn.disabled = true;
    btnText.textContent = 'Sending…';
    btnIcon.className = 'fas fa-spinner fa-spin';

    /* Real Formspree AJAX Submission */
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showSuccess();
      } else {
        showError();
      }
    } catch (error) {
      console.error('Form submission network error:', error);
      showError();
    }
  });

  function showSuccess() {
    submitBtn.disabled = false;
    btnText.textContent = 'Send Message';
    btnIcon.className = 'fas fa-paper-plane';

    feedback.className = 'form-feedback success';
    feedback.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We\'ll get back to you shortly. Or <a href="https://wa.me/256706002812" target="_blank" style="color:inherit;font-weight:600;text-decoration:underline;">chat on WhatsApp</a> for a faster reply.';

    form.reset();

    /* Scroll feedback into view */
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function showError() {
    submitBtn.disabled = false;
    btnText.textContent = 'Send Message';
    btnIcon.className = 'fas fa-paper-plane';

    feedback.className = 'form-feedback error-msg';
    feedback.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again or <a href="https://wa.me/256706002812" target="_blank" style="color:inherit;font-weight:600;text-decoration:underline;">contact us on WhatsApp</a>.';
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

});