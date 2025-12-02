document.addEventListener("DOMContentLoaded", function () {
  // ========== Initialize AOS ==========
  AOS.init({
    duration: 1000,
    offset: 100,
    easing: "ease-in-out",
    once: false,
    mirror: true,
  });

  // ========== Smooth Scrolling ==========
  document.querySelectorAll(".smooth-scroll").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ========== Navbar Active Link ==========
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // ========== Navbar Toggle Close ==========
  const navbarToggler = document.querySelector(".navbar-toggler");

  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarToggler && navbarToggler.offsetParent !== null) {
        navbarToggler.click();
      }
    });
  });

  // ========== Counter Animation ==========
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");
    const speed = 200;

    counters.forEach((counter) => {
      const target = Number(counter.innerText.replace("+", ""));
      const increment = target / speed;
      let count = 0;

      const updateCount = () => {
        if (count < target) {
          count += increment;
          counter.innerText =
            Math.ceil(count) + (counter.innerText.includes("+") ? "+" : "");
          setTimeout(updateCount, 10);
        } else {
          counter.innerText =
            target + (counter.innerText.includes("+") ? "+" : "");
        }
      };

      updateCount();
    });
  }

  // Counter Observer
  const statsSection = document.querySelector(".about-stats");
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(statsSection);
  }

  // ========== Contact Form Validation ==========
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const inputs = this.querySelectorAll(".form-input");
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = "#e74c3c";
        } else {
          input.style.borderColor = "";
        }
      });

      if (isValid) {
        alert("Thank you for your message! I will get back to you soon.");
        contactForm.reset();
      } else {
        alert("Please fill in all fields.");
      }
    });
  }

  // ========== Fancybox ==========
  if (typeof $ !== "undefined") {
    $("[data-fancybox]").fancybox({
      buttons: ["zoom", "thumbs", "close"],
      thumbs: { autoStart: false },
    });
  }

  // ========== Lazy Load Images ==========
  document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("loading", "lazy");
  });

  // ========== Button Ripple Effect ==========
  document.querySelectorAll('[class*="btn"]').forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = size + "px";
      ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ========== Parallax Effect ==========
  window.addEventListener("scroll", () => {
    const heroImage = document.querySelector(".hero-image");
    if (heroImage) {
      const scrollY = window.scrollY;
      heroImage.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
  });

  console.log("Portfolio website loaded successfully!");
});
