function createLeafBackground() {
  const leafBg = document.createElement('div');
  leafBg.className = 'leaf-bg';

  const leafEmojis = ['🍃', '🌿', '🍀', '🌱', '🍃', '🌿', '🍀', '🌱', '🍃', '🌿'];

  leafEmojis.forEach(function(emoji) {
    const span = document.createElement('span');
    span.textContent = emoji;
    leafBg.appendChild(span);
  });

  document.body.prepend(leafBg);
}

createLeafBackground();


/* ── MOBILE HAMBURGER MENU ─────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', function() {
  const isOpen = mobileNav.classList.contains('open');

  mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', !isOpen);
  mobileNav.setAttribute('aria-hidden', isOpen);
});

// Close when a link is clicked
mobileNav.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', function() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});


/* ── ACTIVE NAV LINK ON SCROLL ─────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function() {
  let current = '';

  sections.forEach(function(section) {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.id;
    }
  });

  navLinks.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});


/* ── SCROLL REVEAL ─────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(function(el) {
  revealObserver.observe(el);
});


/* ── NAVBAR SHADOW ON SCROLL ───────────────────── */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.25)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});


/* ── CONTACT FORM (FORMSPREE AJAX) ─────────────── */
const cafeForm      = document.getElementById('cafeContactForm');
const cafeSubmitBtn = document.getElementById('cafeSubmitBtn');

if (cafeForm) {
  cafeForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Don't submit if using placeholder form ID
    if (cafeForm.action.includes('YOUR_FORM_ID')) {
      cafeSubmitBtn.textContent = 'Add your Formspree ID first!';
      setTimeout(function() {
        cafeSubmitBtn.textContent = 'Send Message';
      }, 3000);
      return;
    }

    // Show loading
    cafeSubmitBtn.textContent = 'Sending...';
    cafeSubmitBtn.disabled = true;

    try {
      const response = await fetch(cafeForm.action, {
        method: 'POST',
        body: new FormData(cafeForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        cafeSubmitBtn.textContent = 'Message Sent ✓';
        cafeSubmitBtn.style.background = '#3a6b4a';
        cafeForm.reset();

        setTimeout(function() {
          cafeSubmitBtn.textContent = 'Send Message';
          cafeSubmitBtn.style.background = '';
          cafeSubmitBtn.disabled = false;
        }, 5000);

      } else {
        cafeSubmitBtn.textContent = 'Error — Try Again';
        cafeSubmitBtn.disabled = false;
      }

    } catch (error) {
      cafeSubmitBtn.textContent = 'Network Error — Try Again';
      cafeSubmitBtn.disabled = false;
    }
  });
}


/* ── MENU CARD HOVER STAGGER ───────────────────── */
// Adds a slight delay to each menu card reveal for a cascading effect
document.querySelectorAll('.menu-card').forEach(function(card, index) {
  card.style.transitionDelay = (index * 0.1) + 's';
});


/* ── PLANT LIST EMOJI RANDOMIZER ───────────────── */
// Randomly picks from a set of plant emojis for variety
const plantEmojis = ['🌿', '🍃', '🌱', '🪴', '🌾'];
document.querySelectorAll('.plant-list li').forEach(function(li) {
  const randomEmoji = plantEmojis[Math.floor(Math.random() * plantEmojis.length)];
  // Applied via CSS ::before, but we set a data attribute for fun
  li.setAttribute('data-plant', randomEmoji);
});