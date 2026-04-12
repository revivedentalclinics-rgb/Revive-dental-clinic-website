(function () {
  try {
    if (window.location.search.indexOf("sent=1") !== -1) {
      var ok = document.getElementById("form-success");
      if (ok) {
        if (!ok.textContent.trim()) {
          ok.textContent =
            "Thank you — your appointment request was sent. We’ll contact you soon.";
        }
        ok.classList.add("is-visible");
        ok.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  } catch (e) {}

  (function formSubmitThankYou() {
    function thankYouHref() {
      if (
        typeof window.REVIVE_THANK_YOU_URL === "string" &&
        window.REVIVE_THANK_YOU_URL.indexOf("http") === 0
      ) {
        return window.REVIVE_THANK_YOU_URL;
      }
      try {
        return new URL("contact.html?sent=1", window.location.href).href;
      } catch (err) {
        return "";
      }
    }
    var nextInput = document.getElementById("formsubmit-next");
    var bookingForm = document.getElementById("booking-request-form");
    function syncNext() {
      if (!nextInput) return;
      var href = thankYouHref();
      if (href) nextInput.value = href;
    }
    if (bookingForm && nextInput) {
      syncNext();
      bookingForm.addEventListener("submit", syncNext);
    }
  })();

  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");
  var header = document.querySelector(".site-header");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (toggle && nav && header) {
    function setOpen(open) {
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 899px)").matches) {
          setOpen(false);
        }
      });
    });

    window.addEventListener("resize", function () {
      if (!window.matchMedia("(max-width: 899px)").matches) {
        setOpen(false);
      }
    });
  }

  if (header) {
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    var reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
      var observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          });
        },
        { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      reveals.forEach(function (el) {
        observer.observe(el);
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
