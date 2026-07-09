(() => {
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const mobileToggle = document.querySelector("[data-open-mobile]");

  const lockBody = () => document.body.classList.add("locked");

  const unlockBody = () => {
    const menuOpen = mobileMenu?.classList.contains("is-open");

    if (!menuOpen) {
      document.body.classList.remove("locked");
    }
  };

  const openLayer = (layer) => {
    if (!layer) return;
    layer.classList.add("is-open");
    layer.setAttribute("aria-hidden", "false");
    lockBody();
  };

  const closeLayer = (layer) => {
    if (!layer) return;
    layer.classList.remove("is-open");
    layer.setAttribute("aria-hidden", "true");
    unlockBody();
  };

  const closeMobileMenu = () => {
    mobileToggle?.setAttribute("aria-expanded", "false");
    closeLayer(mobileMenu);
  };

  mobileToggle?.addEventListener("click", (event) => {
    event.currentTarget.setAttribute("aria-expanded", "true");
    openLayer(mobileMenu);
  });

  document.querySelector("[data-close-mobile]")?.addEventListener("click", closeMobileMenu);

  mobileMenu?.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      closeMobileMenu();
    }
  });

  document.querySelector("[data-newsletter]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = document.querySelector("[data-form-note]");

    if (note) {
      note.textContent = "Thank you. You are on the studio update list.";
    }

    event.currentTarget.reset();
  });

  document.querySelector("[data-contact-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = document.querySelector("[data-contact-note]");

    if (note) {
      note.textContent = "Thank you. Your inquiry is ready for review.";
    }

    event.currentTarget.reset();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    closeMobileMenu();
  });

  const yearEl = document.querySelector("[data-year]");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  document.body.classList.add("is-loaded");
})();
