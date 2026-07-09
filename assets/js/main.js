(() => {
  const getRootPrefix = () => {
    const segments = window.location.pathname.split("/").filter(Boolean);
    const pagesIndex = segments.lastIndexOf("pages");
    const depth = pagesIndex === -1 ? 0 : segments.length - pagesIndex - 1;

    return "../".repeat(depth);
  };

  const rootPrefix = getRootPrefix();
  const fromRoot = (url) => `${rootPrefix}${url}`;

  const searchItems = [
    { title: "Food Photography", url: "pages/collections/food-photography.html", type: "Service" },
    { title: "Real Estate Photography", url: "pages/collections/real-estate.html", type: "Service" },
    { title: "About the Studio", url: "pages/about.html", type: "Studio" },
    { title: "Contact", url: "pages/contact.html", type: "Booking" },
    { title: "FAQ", url: "pages/faq.html", type: "Support" },
    { title: "Privacy Policy", url: "pages/policies/privacy.html", type: "Policy" },
    { title: "Terms of Service", url: "pages/policies/terms.html", type: "Policy" },
    { title: "Cancellation Policy", url: "pages/policies/cancellations.html", type: "Policy" }
  ];

  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const mobileToggle = document.querySelector("[data-open-mobile]");
  const searchOverlay = document.querySelector("[data-search-overlay]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchResults = document.querySelector("[data-search-results]");

  const lockBody = () => document.body.classList.add("locked");

  const unlockBody = () => {
    const menuOpen = mobileMenu?.classList.contains("is-open");
    const searchOpen = searchOverlay?.classList.contains("is-open");

    if (!menuOpen && !searchOpen) {
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

  const renderSearch = (query = "") => {
    if (!searchResults) return;

    const normalized = query.trim().toLowerCase();
    const matches = normalized
      ? searchItems.filter((item) => `${item.title} ${item.type}`.toLowerCase().includes(normalized))
      : searchItems.slice(0, 5);

    searchResults.innerHTML = matches.length
      ? matches
          .map((item) => `<a class="search-result" href="${fromRoot(item.url)}"><span>${item.title}</span><span>${item.type}</span></a>`)
          .join("")
      : '<p class="empty-state">No results found.</p>';
  };

  document.querySelectorAll("[data-open-search], [data-open-search-mobile]").forEach((button) => {
    button.addEventListener("click", () => {
      closeMobileMenu();
      openLayer(searchOverlay);
      renderSearch();
      window.setTimeout(() => searchInput?.focus(), 80);
    });
  });

  document.querySelector("[data-close-search]")?.addEventListener("click", () => closeLayer(searchOverlay));

  searchInput?.addEventListener("input", (event) => renderSearch(event.target.value));

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

    closeLayer(searchOverlay);
    closeMobileMenu();
  });

  const yearEl = document.querySelector("[data-year]");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  document.body.classList.add("is-loaded");
})();
