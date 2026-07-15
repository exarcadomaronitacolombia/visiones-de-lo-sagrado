const form = document.querySelector('#registrationForm');
const courseSelect = document.querySelector('#course');
const registrationSection = document.querySelector('#inscripcion');

const courseAliases = {
  'Un curso individual': 'Necesito orientación para elegir'
};

document.querySelectorAll('.choose-course').forEach((button) => {
  button.addEventListener('click', () => {
    const selected = courseAliases[button.dataset.course] || button.dataset.course;
    const matchingOption = [...courseSelect.options].find((option) => option.text === selected);
    if (matchingOption) courseSelect.value = matchingOption.value;
    registrationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => document.querySelector('#name').focus({ preventScroll: true }), 650);
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const advisor = data.get('advisor');
  const message = [
    'Hola, quisiera inscribirme en *Visiones de lo Sagrado*.',
    '',
    `*Nombre:* ${data.get('name')}`,
    `*Ciudad:* ${data.get('city')}`,
    `*Teléfono:* ${data.get('phone')}`,
    `*Curso de interés:* ${data.get('course')}`,
    `*Modalidad:* ${data.get('modality')}`,
    '',
    'Agradezco que me confirmen disponibilidad, sede, horario y forma de pago.'
  ].join('\n');

  window.open(`https://wa.me/${advisor}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
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
