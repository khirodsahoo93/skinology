(function () {
  var docEl = document.documentElement;
  var body = document.body;
  var header = document.querySelector("[data-header]");
  var navToggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  var yearEl = document.querySelector("[data-year]");
  var cursorGlow = document.getElementById("cursor-glow");
  var heroLayer = document.querySelector("[data-parallax=\"hero\"]");
  var heroImg = heroLayer && heroLayer.querySelector(".hero-img");
  var gallery = document.querySelector("[data-drag-scroll]");
  var tiltEl = document.querySelector("[data-tilt]");

  var THEME_KEY = "skinology-fancy-theme";
  var THEME_COLORS = {
    neon: "#080907",
    forest: "#f6f4f0",
    clinical: "#060a12",
    blush: "#140f11",
  };

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Themes */
  var chips = document.querySelectorAll("[data-set-theme]");
  var metaTheme = document.getElementById("meta-theme-color");

  function closeMobileNav() {
    if (header && navToggle) {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  }

  function applyTheme(name) {
    if (!name || !THEME_COLORS[name]) return;
    docEl.setAttribute("data-theme", name);
    try {
      localStorage.setItem(THEME_KEY, name);
    } catch (e) {}
    chips.forEach(function (btn) {
      var on = btn.getAttribute("data-set-theme") === name;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (metaTheme) {
      metaTheme.setAttribute("content", THEME_COLORS[name]);
    }
  }

  try {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved && THEME_COLORS[saved]) {
      applyTheme(saved);
    }
  } catch (e) {}

  chips.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTheme(btn.getAttribute("data-set-theme"));
      closeMobileNav();
    });
  });

  var scrollTopBtn = document.querySelector("[data-scroll-top]");
  var sectionDock = document.querySelector(".section-dock");

  /* Header + scroll-to-top visibility */
  function onScroll() {
    var y = window.scrollY;
    if (header) {
      header.classList.toggle("is-scrolled", y > 40);
    }
    if (heroImg && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      var py = y * 0.18;
      heroImg.style.transform = "translate3d(0, " + py + "px, 0) scale(1.05)";
    }
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle("is-visible", y > 280);
    }
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      var instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
      if (document.getElementById("top")) {
        try {
          history.replaceState(null, "", "#top");
        } catch (e) {}
      }
    });
  }

  if (sectionDock) {
    sectionDock.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function () {
        closeMobileNav();
      });
    });
  }

  if (navToggle && nav && header) {
    navToggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Cursor glow — reduced motion / touch skips */
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (cursorGlow && finePointer && !reduceMotion) {
    body.classList.add("has-cursor-glow");
    window.addEventListener(
      "mousemove",
      function (e) {
        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
      },
      { passive: true }
    );
  }

  /* Drag-to-scroll gallery */
  if (gallery && finePointer) {
    var down = false;
    var startX = 0;
    var startLeft = 0;

    gallery.addEventListener("mousedown", function (e) {
      down = true;
      gallery.classList.add("is-dragging");
      startX = e.pageX;
      startLeft = gallery.scrollLeft;
    });

    gallery.addEventListener("mouseleave", function () {
      down = false;
      gallery.classList.remove("is-dragging");
    });

    gallery.addEventListener("mouseup", function () {
      down = false;
      gallery.classList.remove("is-dragging");
    });

    gallery.addEventListener("mousemove", function (e) {
      if (!down) return;
      e.preventDefault();
      var walk = (e.pageX - startX) * 1.15;
      gallery.scrollLeft = startLeft - walk;
    });
  }

  /* Subtle tilt on about image */
  if (tiltEl && finePointer && !reduceMotion) {
    tiltEl.addEventListener(
      "mousemove",
      function (e) {
        var r = tiltEl.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        var rx = py * -8;
        var ry = px * 10;
        tiltEl.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) scale3d(1.01,1.01,1)";
      },
      { passive: true }
    );
    tiltEl.addEventListener("mouseleave", function () {
      tiltEl.style.transform = "";
    });
  }

  /* Count-up stats */
  function animateValue(el, target, duration) {
    var start = 0;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(start + (target - start) * eased));
      if (p < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  var statNums = document.querySelectorAll(".stat-num[data-count]");
  if (statNums.length && "IntersectionObserver" in window) {
    var done = false;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || done) return;
          done = true;
          statNums.forEach(function (el) {
            var target = parseInt(el.getAttribute("data-count"), 10);
            if (reduceMotion || isNaN(target)) {
              el.textContent = String(target);
              return;
            }
            el.textContent = "0";
            animateValue(el, target, 1400);
          });
          io.disconnect();
        });
      },
      { threshold: 0.2 }
    );
    var heroStats = document.querySelector(".hero-stats");
    if (heroStats) io.observe(heroStats);
  } else {
    statNums.forEach(function (el) {
      var t = el.getAttribute("data-count");
      if (t) el.textContent = t;
    });
  }
})();
