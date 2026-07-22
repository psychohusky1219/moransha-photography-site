(() => {
  const pageIds = {
    "/": "homePage",
    "/index.html": "homePage",
    "/about": "aboutPage",
    "/pages/about.html": "aboutPage",
    "/contact": "contactPage",
    "/pages/contact.html": "contactPage",
    "/faq": "faqPage",
    "/pages/faq.html": "faqPage",
    "/food-photography": "foodPage",
    "/pages/collections/food-photography.html": "foodPage",
    "/real-estate": "realEstatePage",
    "/pages/collections/real-estate.html": "realEstatePage",
    "/price": "pricingPage",
    "/prices": "pricingPage",
    "/pages/prices.html": "pricingPage",
    "/pages/pricing.html": "pricingPage",
    "/new-york": "newYorkPage",
    "/pages/new-york.html": "newYorkPage",
    "/events": "eventsPage",
    "/pages/events.html": "eventsPage",
    "/privacy": "privacyPage",
    "/pages/policies/privacy.html": "privacyPage",
    "/terms": "termsPage",
    "/pages/policies/terms.html": "termsPage",
    "/cancellations": "cancellationsPage",
    "/pages/policies/cancellations.html": "cancellationsPage",
    "/terms-and-conditions": "termsConditionsPage",
    "/pages/policies/terms-and-conditions.html": "termsConditionsPage"
  };

  const text = (selector, value, root = document) => {
    if (!value) return;
    const element = root.querySelector(selector);
    if (element) element.textContent = value;
  };

  const image = (selector, url, alt, root = document, width = 2200) => {
    const element = root.querySelector(selector);
    if (!element) return false;
    if (!url) {
      element.remove();
      return false;
    }
    element.src = `${url}?auto=format&fit=max&w=${width}&q=85`;
    if (alt) element.alt = alt;
    return true;
  };

  const renderCards = (selector, items, className) => {
    if (!Array.isArray(items) || !items.length) return;
    const container = document.querySelector(selector);
    if (!container) return;
    container.replaceChildren(
      ...items.map((item) => {
        const article = document.createElement("article");
        article.className = className;
        const heading = document.createElement(className === "service-point" ? "h3" : "h3");
        const paragraph = document.createElement("p");
        heading.textContent = item.title || "";
        paragraph.textContent = item.text || "";
        article.append(heading, paragraph);
        return article;
      })
    );
  };

  const renderGallery = (selector, gallery) => {
    const container = document.querySelector(selector);
    if (!container) return;
    const photos = Array.isArray(gallery) ? gallery.filter((item) => item.url) : [];
    container.replaceChildren(
      ...photos.map((item, index) => {
        const photo = document.createElement("img");
        photo.src = `${item.url}?auto=format&fit=max&w=1800&q=85`;
        photo.alt = item.alt || `MoranSha photography gallery image ${index + 1}`;
        photo.loading = "lazy";
        photo.decoding = "async";
        return photo;
      })
    );
    const section = container.closest("section");
    if (section) section.hidden = photos.length === 0;
  };

  const renderArchiveGallery = (gallery) => {
    const container = document.querySelector("[data-archive-gallery]");
    if (!container) return;
    const photos = Array.isArray(gallery)
      ? gallery
        .filter((item) => item.url)
      : [];
    container.replaceChildren(
      ...photos.map((item, index) => {
        const figure = document.createElement("figure");
        const photo = document.createElement("img");
        figure.className = "archive-gallery-item";
        photo.src = `${item.url}?auto=format&fit=max&w=1800&q=85`;
        photo.alt = item.alt || `MoranSha photography gallery image ${index + 1}`;
        if (item.width && item.height) {
          photo.width = item.width;
          photo.height = item.height;
        }
        photo.loading = index < 8 ? "eager" : "lazy";
        photo.decoding = "async";
        photo.addEventListener("load", () => photo.classList.add("is-ready"), {once: true});
        if (photo.complete) photo.classList.add("is-ready");
        figure.append(photo);
        return figure;
      })
    );
    const section = container.closest("section");
    if (section) section.hidden = photos.length === 0;
  };

  const applySeo = (page) => {
    if (page.seoTitle) document.title = page.seoTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description && page.seoDescription) description.content = page.seoDescription;
    const openGraphTitle = document.querySelector('meta[property="og:title"]');
    if (openGraphTitle && page.seoTitle) openGraphTitle.content = page.seoTitle;
    const openGraphDescription = document.querySelector('meta[property="og:description"]');
    if (openGraphDescription && page.seoDescription) openGraphDescription.content = page.seoDescription;
  };

  const applyHero = (page) => {
    text(".page-hero-content .eyebrow", page.heroEyebrow);
    text(".page-hero-content h1", page.heroTitle);
    text(".page-hero-content h1 + p", page.heroIntro);
    const hasImage = image(".page-hero-media", page.heroImageUrl, page.heroImageAlt);
    document.querySelector(".page-hero")?.classList.toggle("is-image-empty", !hasImage);
  };

  const applyGlobal = (settings) => {
    if (!settings) return;
    const navigationLabels = new Map([
      ["/", settings.navHomeLabel],
      ["/index.html", settings.navHomeLabel],
      ["/food-photography", settings.navFoodLabel],
      ["/pages/collections/food-photography.html", settings.navFoodLabel],
      ["/real-estate", settings.navRealEstateLabel],
      ["/pages/collections/real-estate.html", settings.navRealEstateLabel],
      ["/price", settings.navPricingLabel],
      ["/prices", settings.navPricingLabel],
      ["/pages/prices.html", settings.navPricingLabel],
      ["/pages/pricing.html", settings.navPricingLabel],
      ["/about", settings.navAboutLabel],
      ["/pages/about.html", settings.navAboutLabel],
      ["/contact", settings.navContactLabel],
      ["/pages/contact.html", settings.navContactLabel]
    ]);
    document.querySelectorAll(".primary-nav a, .mobile-menu nav > a").forEach((anchor) => {
      const label = navigationLabels.get(anchor.pathname);
      if (label) anchor.textContent = label;
    });

    text(".newsletter-shell h2", settings.ctaHeading);
    text(".newsletter-shell h2 + p", settings.ctaText);
    text(".newsletter-cta", settings.ctaButtonLabel);

    const links = [
      ["instagram.com", settings.instagramUrl],
      ["facebook.com", settings.facebookUrl],
      ["wa.me", settings.whatsappUrl]
    ];
    links.forEach(([match, value]) => {
      if (!value) return;
      document.querySelectorAll(`a[href*="${match}"]`).forEach((anchor) => {
        anchor.href = value;
      });
    });

    if (settings.email) {
      document.querySelectorAll('a[href^="mailto:"]').forEach((anchor) => {
        anchor.href = `mailto:${settings.email}`;
        anchor.textContent = settings.email;
      });
    }
    if (settings.phoneLink) {
      document.querySelectorAll('a[href^="tel:"]').forEach((anchor) => {
        anchor.href = `tel:${settings.phoneLink}`;
        if (!settings.phoneDisplay) return;
        if (anchor.hasAttribute("data-static-label")) {
          anchor.setAttribute("aria-label", `Call MoranSha Photography at ${settings.phoneDisplay}`);
        } else {
          anchor.textContent = settings.phoneDisplay;
        }
      });
    }
  };

  const applyHome = (page) => {
    text(".hero-title", page.heroTitle);
    text(".hero-kicker", page.heroTagline);
    const hasHeroImage = image(".hero-media", page.heroImageUrl, page.heroImageAlt);
    document.querySelector(".hero")?.classList.toggle("is-image-empty", !hasHeroImage);

    const panels = document.querySelectorAll(".collection-panel");
    if (panels[0]) {
      text("h2", page.foodTitle, panels[0]);
      text(".btn", page.foodButtonLabel, panels[0]);
      const hasImage = image("img", page.foodImageUrl, page.foodImageAlt, panels[0], 1800);
      panels[0].classList.toggle("is-image-empty", !hasImage);
    }
    if (panels[1]) {
      text("h2", page.realEstateTitle, panels[1]);
      text(".btn", page.realEstateButtonLabel, panels[1]);
      const hasImage = image("img", page.realEstateImageUrl, page.realEstateImageAlt, panels[1], 1800);
      panels[1].classList.toggle("is-image-empty", !hasImage);
    }

    text(".story-content h2", page.storyTitle);
    text(".story-content p", page.storyText);
    text(".story-content .btn", page.storyButtonLabel);
    text("#services .section-heading .eyebrow", page.approachEyebrow);
    text("#services .section-heading h2", page.approachTitle);
    renderCards("#services .service-points", page.approachItems, "service-point");
  };

  const applyAbout = (page) => {
    applyHero(page);
    const hasPortrait = image(".about-portrait", page.portraitImageUrl, page.portraitImageAlt, document, 1600);
    document.querySelector(".split-section")?.classList.toggle("is-image-empty", !hasPortrait);
    text(".split-copy .eyebrow", page.approachEyebrow);
    text(".split-copy h2", page.approachTitle);
    text(".split-copy .btn", page.approachButtonLabel);
    if (Array.isArray(page.approachParagraphs)) {
      const paragraphs = document.querySelectorAll(".split-copy > p:not(.eyebrow)");
      page.approachParagraphs.forEach((value, index) => {
        if (paragraphs[index] && value) paragraphs[index].textContent = value;
      });
    }
    const valuesSection = document.querySelectorAll("main > .section")[1];
    if (valuesSection) {
      text(".section-heading .eyebrow", page.valuesEyebrow, valuesSection);
      text(".section-heading h2", page.valuesTitle, valuesSection);
    }
    renderCards("main > .section:nth-of-type(3) .content-grid", page.values, "content-card");
  };

  const applyPortfolio = (page) => {
    applyHero(page);
    const sections = document.querySelectorAll("main > .section");
    const feature = sections[0];
    const coverage = sections[1];
    if (feature) {
      const hasFeatureImage = image(".split-section > img", page.featureImageUrl, page.featureImageAlt, feature, 1800);
      feature.querySelector(".split-section")?.classList.toggle("is-image-empty", !hasFeatureImage);
      text(".split-copy .eyebrow", page.featureEyebrow, feature);
      text(".split-copy h2", page.featureTitle, feature);
      text(".split-copy h2 + p", page.featureText, feature);
      text(".split-copy .btn", page.featureButtonLabel, feature);
    }
    if (coverage) {
      text(".section-heading .eyebrow", page.coverageEyebrow, coverage);
      text(".section-heading h2", page.coverageTitle, coverage);
      if (Array.isArray(page.coverageItems) && page.coverageItems.length) {
        const container = coverage.querySelector(".content-grid");
        if (container) {
          container.replaceChildren(...page.coverageItems.map((item) => {
            const article = document.createElement("article");
            article.className = "content-card";
            const heading = document.createElement("h3");
            const paragraph = document.createElement("p");
            heading.textContent = item.title || "";
            paragraph.textContent = item.text || "";
            article.append(heading, paragraph);
            return article;
          }));
        }
      }
    }
    renderGallery(".food-gallery, .real-estate-gallery", page.gallery);
  };

  const applyStandalone = (page) => {
    applySeo(page);
    text(".archive-kicker", page.heroEyebrow);
    text(".archive-intro h1", page.heroTitle);
    text(".newsletter-shell h2", page.ctaHeading);
    text(".newsletter-shell h2 + p", page.ctaText);
    text(".newsletter-cta", page.ctaButtonLabel);

    const intro = document.querySelector(".archive-intro");
    if (intro) {
      let media = intro.querySelector(".archive-intro-media");
      if (page.heroImageUrl) {
        if (!media) {
          media = document.createElement("img");
          media.className = "archive-intro-media";
          intro.prepend(media);
        }
        media.src = `${page.heroImageUrl}?auto=format&fit=max&w=2400&q=86`;
        media.alt = page.heroImageAlt || "MoranSha Photography";
        media.hidden = false;
        intro.classList.add("has-photo");
        intro.classList.remove("is-image-empty");
      } else {
        media?.remove();
        intro.classList.remove("has-photo");
        intro.classList.add("is-image-empty");
      }
    }

    renderArchiveGallery(page.gallery);
  };

  const applyContact = (page) => {
    applyHero(page);
    text(".booking-panel > .eyebrow", page.formEyebrow);
    text(".booking-panel > h2", page.formTitle);
    text(".booking-panel > h2 + p", page.formIntro);
    const details = document.querySelector(".contact-aside > div:first-child");
    if (details) {
      text(".eyebrow", page.detailsEyebrow, details);
      text("h2", page.detailsTitle, details);
      text("h2 + p", page.detailsText, details);
    }
    const steps = document.querySelector(".contact-aside > div:last-child");
    if (steps) text(".eyebrow", page.stepsEyebrow, steps);
    if (steps && Array.isArray(page.bookingSteps) && page.bookingSteps.length) {
      const list = steps.querySelector(".booking-steps");
      if (list) {
        list.replaceChildren(...page.bookingSteps.map((item) => {
          const row = document.createElement("li");
          const heading = document.createElement("strong");
          const paragraph = document.createElement("p");
          heading.textContent = item.title || "";
          paragraph.textContent = item.text || "";
          row.append(heading, paragraph);
          return row;
        }));
      }
    }
  };

  const applyFaq = (page) => {
    applyHero(page);
    if (Array.isArray(page.questions) && page.questions.length) {
      const list = document.querySelector(".faq-list");
      if (list) {
        list.replaceChildren(...page.questions.map((item) => {
          const article = document.createElement("article");
          article.className = "faq-item";
          const heading = document.createElement("h2");
          const paragraph = document.createElement("p");
          heading.textContent = item.title || "";
          paragraph.textContent = item.text || "";
          article.append(heading, paragraph);
          return article;
        }));
      }
    }
    text(".cta-band .eyebrow", page.ctaEyebrow);
    text(".cta-band h2", page.ctaTitle);
    text(".cta-band h2 + p", page.ctaText);
    text(".cta-band .btn", page.ctaButtonLabel);
  };

  const applyPricing = (page) => {
    applyHero(page);

    const packagesSection = document.querySelector(".pricing-section");
    if (packagesSection) {
      text(".section-heading .eyebrow", page.packagesEyebrow, packagesSection);
      text(".section-heading h2", page.packagesTitle, packagesSection);
      text(".section-heading h2 + p", page.packagesIntro, packagesSection);
    }

    if (Array.isArray(page.packages) && page.packages.length) {
      const createPriceCard = (item) => {
          const article = document.createElement("article");
          article.className = `price-card${item.featured ? " is-featured" : ""}`;

          if (item.featured && item.badge) {
            const badge = document.createElement("p");
            badge.className = "price-badge";
            badge.textContent = item.badge;
            article.append(badge);
          }

          const headingGroup = document.createElement("div");
          const label = document.createElement("p");
          const heading = document.createElement("h3");
          const price = document.createElement("p");
          const priceNote = document.createElement("p");
          label.className = "price-card-label";
          price.className = "price-value";
          priceNote.className = "price-note";
          label.textContent = item.serviceLabel || "";
          heading.textContent = item.title || "";
          price.textContent = item.price || "Custom quote";
          priceNote.textContent = item.priceNote || "";
          headingGroup.append(label, heading, price, priceNote);

          const description = document.createElement("p");
          description.className = "price-description";
          description.textContent = item.description || "";

          const features = document.createElement("ul");
          features.className = "price-features";
          (Array.isArray(item.features) ? item.features : []).forEach((feature) => {
            const row = document.createElement("li");
            row.textContent = feature;
            features.append(row);
          });

          const button = document.createElement("a");
          button.className = `btn ${item.featured ? "btn-secondary" : "btn-outline"}`;
          button.href = "/contact";
          button.textContent = item.buttonLabel || "Request Pricing";
          article.append(headingGroup, description, features, button);
          return article;
      };

      const inferCategory = (item) => {
        if (["food", "realEstate", "events"].includes(item.category)) return item.category;
        const label = (item.serviceLabel || "").toLowerCase();
        if (label.includes("real estate")) return "realEstate";
        if (label.includes("event")) return "events";
        return "food";
      };

      ["food", "realEstate", "events"].forEach((category) => {
        const panel = document.querySelector(`[data-pricing-panel="${category}"]`);
        const container = panel?.querySelector(".pricing-grid");
        if (!container) return;
        const items = page.packages.filter((item) => inferCategory(item) === category);
        container.replaceChildren(...items.map(createPriceCard));
        container.classList.toggle("is-single", items.length <= 1);
      });
    }

    const detailsSection = document.querySelector(".pricing-details-section");
    if (detailsSection) {
      text(".section-heading .eyebrow", page.detailsEyebrow, detailsSection);
      text(".section-heading h2", page.detailsTitle, detailsSection);
    }
    renderCards(".pricing-details-grid", page.details, "content-card");
    text(".pricing-note h3", page.noteTitle);
    text(".pricing-note p", page.noteText);
    text(".newsletter-shell h2", page.ctaHeading);
    text(".newsletter-shell h2 + p", page.ctaText);
    text(".newsletter-cta", page.ctaButtonLabel);
    document.dispatchEvent(new CustomEvent("pricing:updated"));
  };

  const applyPolicy = (page) => {
    applyHero(page);
    if (!Array.isArray(page.sections) || !page.sections.length) return;
    const container = document.querySelector(".policy-content");
    if (!container) return;
    container.replaceChildren(...page.sections.map((item) => {
      const article = document.createElement("article");
      article.className = "policy-block";
      const heading = document.createElement("h2");
      const paragraph = document.createElement("p");
      heading.textContent = item.title || "";
      paragraph.textContent = item.text || "";
      article.append(heading, paragraph);
      return article;
    }));
  };

  const applyPage = (pageId, page) => {
    if (!page) return;
    applySeo(page);
    if (pageId === "homePage") applyHome(page);
    else if (pageId === "aboutPage") applyAbout(page);
    else if (pageId === "foodPage" || pageId === "realEstatePage") applyPortfolio(page);
    else if (pageId === "newYorkPage" || pageId === "eventsPage") applyStandalone(page);
    else if (pageId === "pricingPage") applyPricing(page);
    else if (pageId === "contactPage") applyContact(page);
    else if (pageId === "faqPage") applyFaq(page);
    else applyPolicy(page);
  };

  const load = async () => {
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    const pageId = pageIds[path] || pageIds[`${path}.html`];
    if (!pageId) return;

    try {
      const response = await fetch(`/api/sanity-content?page=${encodeURIComponent(pageId)}`, {
        headers: {Accept: "application/json"}
      });
      if (!response.ok) throw new Error(`Content service returned ${response.status}`);
      const payload = await response.json();
      applyGlobal(payload.settings);
      applyPage(pageId, payload.page);
      document.documentElement.dataset.contentSource = payload.page ? "sanity" : "fallback";
    } catch (error) {
      document.documentElement.dataset.contentSource = "fallback";
      console.warn("The saved page content is being shown because Sanity could not be reached.", error);
    }
  };

  load();
})();
