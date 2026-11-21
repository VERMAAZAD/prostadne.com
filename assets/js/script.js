
// Nav burger
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.querySelector('i').className = navLinks.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

// Bundle selection
const bundles = [
  { id: 'b1', total: '$55.10' },
  { id: 'b2', total: '$124.95' },
  { id: 'b3', total: '$198.90' }
];
function selectBundle(idx) {
  bundles.forEach((b, i) => {
    const el = document.getElementById(b.id);
    el.classList.toggle('selected', i === idx);
  });
  document.getElementById('totalPrice').textContent = bundles[idx].total;
}

// FAQ
function toggleFaq(btn) {
  const ans = btn.nextElementSibling;
  const isOpen = ans.classList.contains('open');
  document.querySelectorAll('.faq-answer.open').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-btn.open').forEach(b => b.classList.remove('open'));
  if (!isOpen) { ans.classList.add('open'); btn.classList.add('open'); }
}

// Root cause responsive layout fix
function fixRootLayout() {
  const rootSteps = document.querySelector('.root-steps') || document.querySelector('[style*="grid-template-columns:1fr auto 1fr auto 1fr"]');
  const wrap = document.querySelector('.root-section .section-inner > div[style]');
  if (wrap && window.innerWidth < 900) {
    wrap.style.gridTemplateColumns = '1fr';
    wrap.querySelectorAll('.root-arrow').forEach(a => a.style.display = 'none');
  } else if (wrap) {
    wrap.style.gridTemplateColumns = '1fr auto 1fr auto 1fr';
    wrap.querySelectorAll('.root-arrow').forEach(a => a.style.display = 'flex');
  }
}
window.addEventListener('resize', fixRootLayout);
fixRootLayout();

  /* Animated progress bars on scroll into view */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-bar-fill').forEach(b => {
          b.style.width = b.dataset.w;
        });
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  const box = document.getElementById('statBox');
  if (box) observer.observe(box);

  /* Hover highlight on benefit cards */
  document.querySelectorAll('.ben-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      document.querySelectorAll('.ben-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });


(function () {

  var selectedStar = 0;


  /* Public: submit review */
  window.revSubmit = function () {
    var txt = document.getElementById('revWriteText').value.trim();
    if (!selectedStar) { alert('Please pick a star rating first!'); return; }
    if (!txt) { alert('Please write a short review!'); return; }
    alert('Thank you! Your review will appear after verification.');
    document.getElementById('revWriteText').value = '';
    selectedStar = 0;
  };


  /* Animated rating bars — triggers on scroll into view */
  function initBarAnimation() {
    var bar = document.getElementById('revSummaryBar');
    if (!bar || !window.IntersectionObserver) {
      if (bar) {
        var fills = bar.querySelectorAll('.rev-bar-fill');
        for (var i = 0; i < fills.length; i++) {
          fills[i].style.width = fills[i].getAttribute('data-w');
        }
      }
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var fills = e.target.querySelectorAll('.rev-bar-fill');
          for (var i = 0; i < fills.length; i++) {
            fills[i].style.width = fills[i].getAttribute('data-w');
          }
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(bar);
  }

  initBarAnimation();

})();