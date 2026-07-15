const CONFIG = {
  LEAD_ENDPOINT: 'https://script.google.com/macros/s/AKfycbxwmMRbL4h5hToGS-W22TAGhYAjJF_5uIJq4fGJoQOmm-_5iZAOBSdoroaNvKcCa8go/exec',
  SUBMISSION_TIMEOUT_MS: 12000
};

const form = document.querySelector('#registrationForm');
const courseSelect = document.querySelector('#course');
const advisorSelect = document.querySelector('#advisor');
const registrationSection = document.querySelector('#inscripcion');
const submitButton = document.querySelector('#submitButton');
const submitLabel = submitButton?.querySelector('.button-label');
const formStatus = document.querySelector('#formStatus');
const leadFrame = document.querySelector('#leadCaptureFrame');
const setupAlert = document.querySelector('#setupAlert');

const courseAliases = {
  'Un curso individual': 'Necesito orientación para elegir'
};

const endpointIsConfigured = /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec(?:\?.*)?$/.test(CONFIG.LEAD_ENDPOINT);

if (!endpointIsConfigured && setupAlert) {
  setupAlert.hidden = false;
}

function setStatus(message, type = '') {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.className = `form-status field-full ${type}`.trim();
}

function setSubmitting(isSubmitting) {
  if (!submitButton) return;
  submitButton.disabled = isSubmitting;
  submitButton.classList.toggle('is-loading', isSubmitting);
  if (submitLabel) {
    submitLabel.textContent = isSubmitting ? 'Guardando tus datos…' : 'Guardar datos y continuar por WhatsApp';
  }
}

function getSelectedAdvisorName() {
  const selectedOption = advisorSelect?.selectedOptions?.[0];
  return selectedOption?.dataset.advisorName || selectedOption?.textContent?.trim() || '';
}

function populateTrackingFields() {
  const params = new URLSearchParams(window.location.search);
  document.querySelector('#advisorName').value = getSelectedAdvisorName();
  document.querySelector('#pageUrl').value = window.location.href;
  document.querySelector('#utmSource').value = params.get('utm_source') || '';
  document.querySelector('#utmMedium').value = params.get('utm_medium') || '';
  document.querySelector('#utmCampaign').value = params.get('utm_campaign') || '';
}

function buildWhatsAppUrl(data) {
  const advisor = data.get('advisor');
  const message = [
    'Hola, quisiera inscribirme en *Visiones de lo Sagrado*.',
    '',
    `*Nombre:* ${data.get('name')}`,
    `*Ciudad:* ${data.get('city')}`,
    `*Correo:* ${data.get('email')}`,
    `*Teléfono:* ${data.get('phone')}`,
    `*Curso de interés:* ${data.get('course')}`,
    `*Modalidad:* ${data.get('modality')}`,
    '',
    'Ya completé el formulario de registro. Agradezco que me confirmen disponibilidad y forma de pago.'
  ].join('\n');

  return `https://wa.me/${advisor}?text=${encodeURIComponent(message)}`;
}

function markInvalidFields() {
  form.querySelectorAll('input, select').forEach((field) => {
    if (field.type === 'hidden' || field.id === 'website') return;
    field.setAttribute('aria-invalid', field.checkValidity() ? 'false' : 'true');
  });
}

form?.querySelectorAll('input, select').forEach((field) => {
  field.addEventListener('input', () => field.setAttribute('aria-invalid', 'false'));
  field.addEventListener('change', () => field.setAttribute('aria-invalid', 'false'));
});

document.querySelectorAll('.choose-course').forEach((button) => {
  button.addEventListener('click', () => {
    const selected = courseAliases[button.dataset.course] || button.dataset.course;
    const matchingOption = [...courseSelect.options].find((option) => option.text === selected);
    if (matchingOption) courseSelect.value = matchingOption.value;
    registrationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => document.querySelector('#name').focus({ preventScroll: true }), 650);
  });
});

let submissionInProgress = false;
let whatsappOpened = false;
let whatsappWindow = null;
let fallbackTimer = null;
let pendingWhatsAppUrl = '';

function openWhatsAppAfterSave() {
  if (whatsappOpened || !pendingWhatsAppUrl) return;
  whatsappOpened = true;
  window.clearTimeout(fallbackTimer);
  setSubmitting(false);
  setStatus('Datos registrados. Abriendo WhatsApp para completar tu inscripción…', 'success');

  if (whatsappWindow && !whatsappWindow.closed) {
    whatsappWindow.location.href = pendingWhatsAppUrl;
  } else {
    window.location.href = pendingWhatsAppUrl;
  }

  window.setTimeout(() => {
    form.reset();
    submissionInProgress = false;
  }, 1200);
}

leadFrame?.addEventListener('load', () => {
  if (!submissionInProgress) return;
  openWhatsAppAfterSave();
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  setStatus('');
  markInvalidFields();

  if (!form.reportValidity()) {
    setStatus('Revisa los campos marcados antes de continuar.', 'error');
    return;
  }

  if (!endpointIsConfigured) {
    setStatus('El formulario aún no está conectado con la tabla de leads. Configura la URL de Google Apps Script antes de publicarlo.', 'error');
    setupAlert.hidden = false;
    return;
  }

  if (document.querySelector('#website').value) {
    setStatus('No fue posible procesar el formulario.', 'error');
    return;
  }

  populateTrackingFields();
  const data = new FormData(form);
  pendingWhatsAppUrl = buildWhatsAppUrl(data);

  submissionInProgress = true;
  whatsappOpened = false;
  setSubmitting(true);
  setStatus('Guardando tus datos de forma segura…');

  // Se abre una pestaña vacía en el clic del usuario para evitar bloqueadores de ventanas.
  whatsappWindow = window.open('', '_blank');
  if (whatsappWindow) {
    whatsappWindow.document.write('<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Procesando inscripción</title></head><body style="font-family:system-ui;padding:2rem;text-align:center"><p>Estamos guardando tus datos y preparando WhatsApp…</p></body></html>');
  }

  form.action = CONFIG.LEAD_ENDPOINT;
  HTMLFormElement.prototype.submit.call(form);

  fallbackTimer = window.setTimeout(() => {
    if (!whatsappOpened) {
      setStatus('El registro fue enviado. Abriremos WhatsApp para que continúes con el equipo.', 'success');
      openWhatsAppAfterSave();
    }
  }, CONFIG.SUBMISSION_TIMEOUT_MS);
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}
