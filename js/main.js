// js/main.js
(function () {
  "use strict";

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Menú móvil
  const btn = document.querySelector(".navbtn");
  const drawer = document.getElementById("drawer");
  if (btn && drawer) {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      drawer.hidden = expanded;
    });

    drawer.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      btn.setAttribute("aria-expanded", "false");
      drawer.hidden = true;
    });
  }

  // Resaltar link activo según sección visible
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  const setActive = (id) => {
    navLinks.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`));
  };

  const spy = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id) setActive(visible.target.id);
  }, { root: null, threshold: [0.25, 0.35, 0.5, 0.65] });

  sections.forEach(s => spy.observe(s));

  // Microinteracción: reveal al hacer scroll
  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(el => revealObs.observe(el));
})();
