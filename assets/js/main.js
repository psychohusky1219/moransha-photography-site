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
    if (event.target.closest("a")) {
      closeMobileMenu();
    }
  });

  document.querySelector("[data-contact-form]")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const note = form.querySelector("[data-contact-note]");
    const submitButton = form.querySelector("button[type='submit']");

    if (note) {
      note.textContent = "Sending your inquiry...";
    }

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        let errorMessage = "Something went wrong. Please try again or email us directly.";

        try {
          const data = await response.json();
          const fieldErrors = data.errors?.map((error) => error.message).filter(Boolean);

          if (fieldErrors?.length) {
            errorMessage = fieldErrors.join(" ");
          }
        } catch {
          // Keep the friendly fallback message if Formspree does not return JSON.
        }

        throw new Error(errorMessage);
      }

      if (note) {
        note.textContent = "Thank you. Your inquiry has been sent.";
      }

      form.reset();
    } catch (error) {
      if (note) {
        note.textContent = error.message;
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });

  const pricingTabs = [...document.querySelectorAll("[data-pricing-tab]")];
  const pricingPanels = [...document.querySelectorAll("[data-pricing-panel]")];
  const pricingDetails = document.querySelector("[data-pricing-details]");

  if (pricingTabs.length && pricingPanels.length) {
    let activePricingCategory = pricingTabs.find((tab) => tab.getAttribute("aria-selected") === "true")?.dataset.pricingTab || "food";

    const activatePricingTab = (category, moveFocus = false) => {
      const activeTab = pricingTabs.find((tab) => tab.dataset.pricingTab === category);
      if (!activeTab) return;
      activePricingCategory = category;

      pricingTabs.forEach((tab) => {
        const selected = tab === activeTab;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });

      pricingPanels.forEach((panel) => {
        const selected = panel.dataset.pricingPanel === category;
        panel.hidden = !selected;
        const grid = panel.querySelector(".pricing-grid");
        grid?.classList.toggle("is-single", grid.children.length <= 1);
      });

      if (pricingDetails) {
        pricingDetails.hidden = pricingDetails.dataset.pricingDetails !== category;
      }

      if (moveFocus) activeTab.focus();
    };

    pricingTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activatePricingTab(tab.dataset.pricingTab));
      tab.addEventListener("keydown", (event) => {
        let nextIndex = null;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % pricingTabs.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + pricingTabs.length) % pricingTabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = pricingTabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        activatePricingTab(pricingTabs[nextIndex].dataset.pricingTab, true);
      });
    });

    document.addEventListener("pricing:updated", () => activatePricingTab(activePricingCategory));
    activatePricingTab(activePricingCategory);
  }

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
