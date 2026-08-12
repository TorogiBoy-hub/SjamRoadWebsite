  const menuBtn = document.getElementById('menuBtn');
  const navList = document.getElementById('navList');
  menuBtn.addEventListener('click', () => navList.classList.toggle('open'));
  navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navList.classList.remove('open')));

  // Smooth scroll with easing for nav links, offset for the sticky header
  function smoothScrollTo(targetY, duration = 800){
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    let startTime = null;
    function easeInOutQuad(t){ return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2; }
    function step(timestamp){
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + diff * easeInOutQuad(progress));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
      smoothScrollTo(targetY);
    });
  });

  // Lightbox: click a photo/video slot to view it bigger
  const lightbox = document.getElementById('lightbox');
  const lightboxInner = document.getElementById('lightboxInner');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, type){
    lightboxInner.innerHTML = type === 'video'
      ? `<video src="${src}" controls autoplay playsinline></video>`
      : `<img src="${src}" alt="S-JAM Road">`;
    lightbox.classList.add('open');
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    lightboxInner.innerHTML = '';
  }
  document.querySelectorAll('.gallery-slot.has-media').forEach(slot => {

      slot.addEventListener('click', (e) => {
    // If they clicked a video element or its controls, do nothing and return
    if (e.target.tagName === 'VIDEO') return;

    openLightbox(slot.dataset.full, slot.dataset.type);
  });

  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});
