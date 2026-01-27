(function () {
  "use strict";

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

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

   const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  const setActive = (id) => {
    navLinks.forEach((l) =>
      l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`)
    );
  };

  const spy = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    },
    { root: null, threshold: [0.25, 0.35, 0.5, 0.65] }
  );

  sections.forEach((s) => spy.observe(s));

  // Reveal al hacer scroll
  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((el) => revealObs.observe(el));

  
  const projects = [
    {
      title: "LPDC — Engagement con cuestionario interactivo",
      meta: "Hackathon colaborativo | Rol: Front-end",
      highlight: "HTML · CSS · JS · Netlify",
      description:
        "Diseñé e implementé un cuestionario con lógica en JavaScript para aumentar permanencia y convertir el resultado en una invitación directa a comprar merch del equipo obtenido, integrándolo en una landing con catálogo y vista individual. El reto principal fue coordinación en equipo aleatorio y restricciones de tiempo, resuelto mediante organización y enfoque por entregables.",
      image: "assets/img/LPDC.png",
      demoUrl: "https://sportcommerce.netlify.app/",
      repoUrl: "https://github.com/mttzDan/Hackaton",
      alt: "Vista previa del proyecto LPDC",
    },
    {
      title: "Bloom Studio — Full Stack con Scrum y cliente real",
      meta: "Bootcamp Generation | Rol: Scrum Master + Full Stack",
      highlight: "Java · Spring Boot · MySQL · Bootstrap",
      description:
        "Coordiné sprints y backlog en Jira y participé en front, base de datos y back-end. El proyecto se construyó en paralelo al aprendizaje del bootcamp, por lo que la comunicación, mentoría y mejora incremental fueron claves para entregar un sitio funcional, preparado para integración y crecimiento.",
      image: "assets/img/bloom.png",
      demoUrl: "#",
      repoUrl: "https://github.com/BloodSttudio-LosError404/Blood-Studio",
      alt: "Vista previa del proyecto E-commerce",
    },
  ];

  const projectsGrid = document.getElementById("projectsGrid");
  if (projectsGrid) {
    projectsGrid.innerHTML = projects
      .map(
        (p) => `
        <article class="project card reveal">
          <div class="project__media">
            <img class="project__img" src="${p.image}" alt="${p.alt}">
          </div>

          <header class="project__head">
            <h3 class="project__title">${p.title}</h3>
            <p class="project__meta">${p.meta}</p>
          </header>

          <p style="margin:10px 0 0;">
            <span class="project__pill" >${p.highlight}</span>
            
          </p>

          <p class="project__text">${p.description}</p>

          <div class="project__actions">
            <a class="btn btn--primary" href="${p.demoUrl}" target="_blank" rel="noreferrer">Ver demo</a>
            <a class="btn btn--ghost" href="${p.repoUrl}" target="_blank" rel="noreferrer">Ver repositorio</a>
          </div>
        </article>
      `
      )
      .join("");

    // Observar reveal en elementos generados
    const newRevealItems = Array.from(projectsGrid.querySelectorAll(".reveal"));
    const revealObs2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            revealObs2.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    newRevealItems.forEach((el) => revealObs2.observe(el));
  }

  // Volver al top: robusto
  const toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Cierra drawer si estuviera abierto
      if (btn && drawer && btn.getAttribute("aria-expanded") === "true") {
        btn.setAttribute("aria-expanded", "false");
        drawer.hidden = true;
      }
    });
  }
})();
