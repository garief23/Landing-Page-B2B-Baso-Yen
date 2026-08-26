// Sticky nav shadow on scroll
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 8);
}, { passive: true });

// Mobile menu
const burgerBtn = document.getElementById('burgerBtn');
const closeBurgerBtn = document.getElementById('closeBurgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
function openMenu(){ mobileMenu.classList.add('is-open'); burgerBtn.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; }
function closeMenu(){ mobileMenu.classList.remove('is-open'); burgerBtn.setAttribute('aria-expanded','false'); document.body.style.overflow=''; }
burgerBtn.addEventListener('click', openMenu);
closeBurgerBtn.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Counter count-up
const counters = document.querySelectorAll('.counter');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1200;
      const start = performance.now();
      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => counterIO.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item.is-open').forEach(openItem => {
      if (openItem !== item){
        openItem.classList.remove('is-open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded','false');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      }
    });
    if (isOpen){
      item.classList.remove('is-open');
      btn.setAttribute('aria-expanded','false');
      answer.style.maxHeight = null;
    } else {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded','true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Testimonial carousel
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dotsWrap = document.getElementById('testimonialDots');
const prevBtn = document.querySelector('.testimonial-nav.prev');
const nextBtn = document.querySelector('.testimonial-nav.next');
if (dotsWrap && testimonialSlides.length){
  const dots = [];
  let currentIndex = 0;
  testimonialSlides.forEach((slide, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'testimonial-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Lihat testimoni ${i + 1}`);
    dot.addEventListener('click', () => showTestimonial(i));
    dotsWrap.appendChild(dot);
    dots.push(dot);
  });
  function showTestimonial(index){
    currentIndex = (index + testimonialSlides.length) % testimonialSlides.length;
    testimonialSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === currentIndex));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentIndex));
  }
  if (prevBtn) prevBtn.addEventListener('click', () => showTestimonial(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showTestimonial(currentIndex + 1));
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
