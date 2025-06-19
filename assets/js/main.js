// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  hamburger.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
    hamburger.setAttribute("aria-expanded", !expanded);
    if (mobileMenu.hasAttribute("hidden")) {
      mobileMenu.removeAttribute("hidden");
    } else {
      mobileMenu.setAttribute("hidden", "");
    }
  });

  // Carousel functionality
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide, 7000);

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 7000);
  }

  // Cookie consent modal
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptAllBtn = document.getElementById("accept-all");
  const settingsBtn = document.getElementById("settings");

  function checkCookieConsent() {
    try {
      return localStorage.getItem("cookieConsent") === "true";
    } catch (e) {
      return false;
    }
  }

  function setCookieConsent(value) {
    try {
      localStorage.setItem("cookieConsent", value);
    } catch (e) {
      // Ignore errors
    }
  }

  if (!checkCookieConsent()) {
    cookieConsent.removeAttribute("hidden");
  }

  acceptAllBtn.addEventListener("click", () => {
    setCookieConsent("true");
    cookieConsent.setAttribute("hidden", "");
  });

  settingsBtn.addEventListener("click", () => {
    alert("Configuración de cookies no implementada en esta demo.");
  });

  // Form validation for Mi Espacio BCP
  const form = document.getElementById("preapproved-form");
  const docNumberInput = document.getElementById("doc-number");
  const docError = document.getElementById("doc-error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  docError.textContent = "";
  docError.style.display = "none";

  const docValue = docNumberInput.value.trim();
  const pattern = /^\d{8,11}$/;

  if (!pattern.test(docValue)) {
    docError.textContent = "Por favor, ingresa un número de documento válido (8 a 11 dígitos).";
    docError.style.display = "block";
    valid = false;
  }

  if (!form["privacy-accept"].checked) {
    alert("Debe aceptar la política de privacidad para continuar.");
    valid = false;
  }

  if (valid) {
    alert("Formulario enviado correctamente. (Demo)");
    form.reset();
  }
});
});
