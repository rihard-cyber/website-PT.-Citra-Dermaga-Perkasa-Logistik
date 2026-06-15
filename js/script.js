/**
 * CDP Logistik — PT. Citra Dermaga Perkasa Logistik
 * Premium Corporate Interactions + Mobile UX
 */

document.addEventListener('DOMContentLoaded', function () {

  // === PRELOADER ===
  var preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(function () { preloader.classList.add('hidden'); }, 400);
    });
    setTimeout(function () {
      if (!preloader.classList.contains('hidden')) preloader.classList.add('hidden');
    }, 3500);
  }

  // === NAVBAR ===
  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  var navOverlay = document.getElementById('navOverlay');

  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.pageYOffset > 80);
    }, { passive: true });
  }

  if (navToggle && navLinks) {
    function closeNav() {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      if (navOverlay) navOverlay.classList.remove('show');
      document.body.style.overflow = '';
    }
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.contains('open');
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      if (navOverlay) navOverlay.classList.toggle('show');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
    navLinks.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    if (navOverlay) navOverlay.addEventListener('click', closeNav);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
  }

  // === HERO PARTICLES (fewer on mobile) ===
  var pc = document.getElementById('particles');
  var isMobile = window.innerWidth < 768;
  if (pc) {
    var count = isMobile ? 12 : 35;
    for (var i = 0; i < count; i++) {
      var s = document.createElement('span');
      s.style.left = Math.random() * 100 + '%';
      s.style.animationDelay = Math.random() * 12 + 's';
      s.style.animationDuration = (12 + Math.random() * 10) + 's';
      s.style.width = s.style.height = (2 + Math.random() * 2) + 'px';
      pc.appendChild(s);
    }
  }

  // === HERO LOADED ===
  var hero = document.querySelector('.hero');
  if (hero) {
    setTimeout(function () { hero.classList.add('loaded'); }, 150);
  }

  // === SCROLL REVEAL (IntersectionObserver) ===
  var r = document.querySelectorAll('.r, .r-l, .r-r');
  if (r.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: isMobile ? 0.02 : 0.06, rootMargin: '0px 0px -20px 0px' });
    r.forEach(function (el) { ro.observe(el); });
  }

  // === SMOOTH SCROLL FOR # LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var offset = navbar ? navbar.offsetHeight + 10 : 70;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.pageYOffset - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  // === SCROLL PROGRESS BAR ===
  var progressBar = document.createElement('div');
  progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,var(--royal,#0096C7),var(--gold,#D4AF37));z-index:10001;width:0%;transition:width 0.1s ease-out;';
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', function () {
    var scrollTop = window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docHeight * 100) + '%';
  }, { passive: true });

  // === BACK TO TOP BUTTON ===
  var backBtn = document.createElement('button');
  backBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>';
  backBtn.setAttribute('aria-label', 'Kembali ke atas');
  backBtn.style.cssText = 'position:fixed;bottom:28px;right:28px;width:48px;height:48px;border-radius:50%;background:var(--royal,#0096C7);color:#fff;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(0,150,199,0.35);opacity:0;visibility:hidden;transform:translateY(16px);transition:all 0.4s cubic-bezier(0.16,1,0.3,1);z-index:9999;display:flex;align-items:center;justify-content:center;';
  document.body.appendChild(backBtn);

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 400) {
      backBtn.style.opacity = '1';
      backBtn.style.visibility = 'visible';
      backBtn.style.transform = 'translateY(0)';
    } else {
      backBtn.style.opacity = '0';
      backBtn.style.visibility = 'hidden';
      backBtn.style.transform = 'translateY(16px)';
    }
  }, { passive: true });

  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // === ACTIVE SECTION HIGHLIGHT ON SCROLL ===
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)');

  if (sections.length && navAnchors.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navAnchors.forEach(function (a) {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + id) {
              a.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.15, rootMargin: '-80px 0px 0px 0px' });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  // === COUNTER ANIMATION ===
  var counters = document.querySelectorAll('.counter');
  if (counters.length) {
    var counterDone = false;
    function startCounters() {
      if (counterDone) return;
      counterDone = true;
      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-target'));
        if (isNaN(target)) return;
        var duration = 2000;
        var startTime = performance.now();
        function tick(now) {
          var p = Math.min((now - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(tick);
      });
    }
    var statsSec = document.querySelector('.stats');
    if (statsSec) {
      var so = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { startCounters(); so.unobserve(e.target); } });
      }, { threshold: 0.3 });
      so.observe(statsSec);
    } else {
      setTimeout(startCounters, 1200);
    }
  }

  // === RESPONSIVE RE-INIT on resize ===
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var mobile = window.innerWidth < 768;
      document.querySelectorAll('.r, .r-l, .r-r').forEach(function (el) {
        if (!el.classList.contains('vis')) {
          el.style.transition = 'none';
          setTimeout(function () { el.style.transition = ''; }, 50);
        }
      });
    }, 250);
  });

  // === TOUCH FEEDBACK for mobile ===
  if ('ontouchstart' in window) {
    document.querySelectorAll('.serv-card, .test-card, .why-card, .transport-item, .pc-card, .cert-card, .net-item').forEach(function (card) {
      card.addEventListener('touchstart', function () {
        this.style.transform = 'scale(0.98)';
      }, { passive: true });
      card.addEventListener('touchend', function () {
        this.style.transform = '';
      }, { passive: true });
    });
  }

  // === IMAGE LAZY LOAD ===
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
      img.src = img.src;
    });
  }

  // === LOCALIZATION SYSTEM ===
  function updateLanguage(lang) {
    if (!window.translations) return;
    var dict = window.translations[lang];
    if (!dict) return;

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key];
        } else {
          el.innerHTML = dict[key];
        }
      }
    });

    // Dynamic Metadata Update for SEO
    var title = dict['meta-title'];
    var desc = dict['meta-desc'];
    if (title) document.title = title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && desc) metaDesc.setAttribute('content', desc);
    
    // OG Meta tags
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && title) ogTitle.setAttribute('content', title);
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && desc) ogDesc.setAttribute('content', desc);

    // Switch buttons UI highlight
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    var langSwitch = document.querySelector('.lang-switch');
    if (langSwitch) {
      langSwitch.classList.toggle('en-active', lang === 'en');
      langSwitch.classList.toggle('zh-active', lang === 'zh');
    }
  }

  // Auto-detect & Init Language
  var savedLang = localStorage.getItem('cdp-lang');
  if (!savedLang) {
    var browserLang = navigator.language || navigator.userLanguage || 'id';
    savedLang = browserLang.toLowerCase().indexOf('en') === 0 ? 'en' : 'id';
  }
  updateLanguage(savedLang);

  // Bind Clicks
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = this.getAttribute('data-lang');
      localStorage.setItem('cdp-lang', lang);
      updateLanguage(lang);
    });
  });

  // === MOUSE GLOW COORDINATE TRACKING + WAVE PARALLAX ===
  var hero = document.querySelector('.hero');
  if (hero) {
    var waves = hero.querySelector('.waves');
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      hero.style.setProperty('--mx', x + 'px');
      hero.style.setProperty('--my', y + 'px');
      
      // Interactive ocean wave parallax shift
      if (waves) {
        var shiftX = (x - rect.width / 2) * 0.04;
        var shiftY = (y - rect.height / 2) * 0.02;
        waves.style.transform = 'translate3d(' + shiftX + 'px, ' + shiftY + 'px, 0)';
      }
    });

    // Reset waves position when mouse leaves hero
    hero.addEventListener('mouseleave', function () {
      if (waves) {
        waves.style.transform = 'translate3d(0, 0, 0)';
      }
    });
  }

  // === CTA WAVE PARALLAX ON MOUSEMOVE ===
  var cert = document.querySelector('.cert');
  if (cert) {
    var ctaWaves = cert.querySelector('.cta-waves .waves');
    cert.addEventListener('mousemove', function (e) {
      var rect = cert.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      if (ctaWaves) {
        var shiftX = (x - rect.width / 2) * 0.03;
        var shiftY = (y - rect.height / 2) * 0.015;
        ctaWaves.style.transform = 'translate3d(' + shiftX + 'px, ' + shiftY + 'px, 0)';
      }
    });
    cert.addEventListener('mouseleave', function () {
      if (ctaWaves) {
        ctaWaves.style.transform = 'translate3d(0, 0, 0)';
      }
    });
  }

  // === PARTNERS MARQUEE SPHERICAL GLOBE EFFECT ===
  var marquee = document.querySelector('.partners-marquee');
  var logoItems = document.querySelectorAll('.partner-logo-item');
  if (marquee && logoItems.length) {
    function updateSphericalLogoScale() {
      var mRect = marquee.getBoundingClientRect();
      if (mRect.bottom > 0 && mRect.top < window.innerHeight) {
        var mCenter = mRect.left + mRect.width / 2;
        var halfW = mRect.width / 2;
        
        logoItems.forEach(function (item) {
          var itemRect = item.getBoundingClientRect();
          var itemCenter = itemRect.left + itemRect.width / 2;
          
          var t = (itemCenter - mCenter) / halfW;
          t = Math.max(-1.2, Math.min(1.2, t));
          
          var absT = Math.abs(t);
          var factor = Math.max(0, 1 - absT * absT);
          
          var scale = 0.65 + 0.45 * factor;
          if (item.matches(':hover')) {
            scale *= 1.12;
          }
          
          var opacity = 0.3 + 0.7 * factor;
          var translateY = 16 * (absT * absT);
          var rotateY = t * 25;
          
          item.style.transform = 'translate3d(0, ' + translateY + 'px, 0) scale(' + scale + ') rotateY(' + rotateY + 'deg)';
          item.style.opacity = opacity;
        });
      }
      requestAnimationFrame(updateSphericalLogoScale);
    }
    requestAnimationFrame(updateSphericalLogoScale);
  }

  // === DYNAMIC COMPANY PROFILE PDF EXPORT ===
  window.exportBrochure = function () {
    var element = document.getElementById('brochure-export-template');
    if (!element) return;

    var activeLang = document.documentElement.getAttribute('lang') || 'id';
    var fileNameLangSuffix = activeLang.toUpperCase();
    var pdfFileName = 'Company_Profile_PT_Citra_Dermaga_Perkasa_' + fileNameLangSuffix + '.pdf';

    var dlBtn = document.getElementById('btn-download-brochure');
    var originalHTML = dlBtn ? dlBtn.innerHTML : '';

    function resetBtn() {
      if (dlBtn) {
        dlBtn.disabled = false;
        dlBtn.style.opacity = '';
        dlBtn.innerHTML = originalHTML;
      }
    }

    function showError(msg) {
      if (dlBtn) {
        dlBtn.innerHTML = '<span style="color:#ff6b6b;">' + msg + '</span>';
        setTimeout(resetBtn, 3000);
      }
    }

    // Mark as generating
    if (dlBtn) {
      dlBtn.disabled = true;
      dlBtn.style.opacity = '0.75';
      dlBtn.innerHTML = '<span style="display:inline-block;animation:spin 1s linear infinite;margin-right:6px;vertical-align:middle;">&#8635;</span> Processing...';
    }

    element.style.position = 'relative';
    element.style.left = '0';
    element.style.top = '0';

    // Check if html2pdf is loaded
    if (typeof html2pdf !== 'undefined' && html2pdf) {
      var opt = {
        margin:       0,
        filename:     pdfFileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
          scale: 2, 
          useCORS: true,
          logging: false,
          letterRendering: true,
          allowTaint: true
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save().then(function() {
        element.style.position = 'absolute';
        element.style.left = '-9999px';
        element.style.top = '-9999px';
        resetBtn();
      }).catch(function(err) {
        console.error('PDF Export Error:', err);
        element.style.position = 'absolute';
        element.style.left = '-9999px';
        element.style.top = '-9999px';
        showError('Gagal. Coba metode alternatif...');
        // Fallback to print
        setTimeout(function() { window.print(); }, 500);
      });
    } else {
      // html2pdf not loaded — use print fallback
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.top = '-9999px';
      showError('Gunakan Ctrl+P untuk cetak PDF');
      setTimeout(function() { window.print(); resetBtn(); }, 300);
    }
  };

  // === HERO BACKGROUND SLIDESHOW (Ken Burns effect) ===
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    var currentSlide = 0;
    setInterval(function () {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 6000);
  }

});

