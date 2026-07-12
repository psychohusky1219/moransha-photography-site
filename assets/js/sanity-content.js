(() => {
  const pageIds = {
    "/": "homePage",
    "/index.html": "homePage",
    "/pages/about.html": "aboutPage",
    "/pages/contact.html": "contactPage",
    "/pages/faq.html": "faqPage",
    "/pages/collections/food-photography.html": "foodPage",
    "/pages/collections/real-estate.html": "realEstatePage",
    "/pages/policies/privacy.html": "privacyPage",
    "/pages/policies/terms.html": "termsPage",
    "/pages/policies/cancellations.html": "cancellationsPage",
    "/pages/policies/terms-and-conditions.html": "termsConditionsPage"
  };

  const text = (selector, value, root = document) => {
    if (!value) return;
    const element = root.querySelector(selector);
    if (element) element.textContent = value;
  };

  const image = (selector, url, alt, root = document, width = 2200) => {
    const element = root.querySelector(selector);
    if (!element) return;
    if (url) element.src = `${url}?auto=format&fit=max&w=${width}&q=85`;
    if (alt) element.alt = alt;
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
    if (!Array.isArray(gallery) || !gallery.length) return;
    const container = document.querySelector(selector);
    if (!container) return;
    container.replaceChildren(
      ...gallery.filter((item) => item.url).map((item, index) => {
        const photo = document.createElement("img");
        photo.src = `${item.url}?auto=format&fit=max&w=1800&q=85`;
        photo.alt = item.alt || `MoranSha photography gallery image ${index + 1}`;
        photo.loading = "lazy";
        photo.decoding = "async";
        return photo;
      })
    );
  };

  const applySeo = (page) => {
    if (page.seoTitle) document.title = page.seoTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description && page.seoDescription) description.content = page.seoDescription;
  };

  const applyHero = (page) => {
    text(".page-hero-content .eyebrow", page.heroEyebrow);
    text(".page-hero-content h1", page.heroTitle);
    text(".page-hero-content h1 + p", page.heroIntro);
    image(".page-hero-media", page.heroImageUrl, page.heroImageAlt);
  };

  const applyGlobal = (settings) => {
    if (!settings) return;
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
        if (settings.phoneDisplay) anchor.textContent = settings.phoneDisplay;
      });
    }
  };

  const applyHome = (page) => {
    text(".hero-title", page.heroTitle);
    text(".hero-kicker", page.heroTagline);
    image(".hero-media", page.heroImageUrl, page.heroImageAlt);

    const panels = document.querySelectorAll(".collection-panel");
    if (panels[0]) {
      text("h2", page.foodTitle, panels[0]);
      text(".btn", page.foodButtonLabel, panels[0]);
      image("img", page.foodImageUrl, page.foodImageAlt, panels[0], 1800);
    }
    if (panels[1]) {
      text("h2", page.realEstateTitle, panels[1]);
      text(".btn", page.realEstateButtonLabel, panels[1]);
      image("img", page.realEstateImageUrl, page.realEstateImageAlt, panels[1], 1800);
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
    image(".about-portrait", page.portraitImageUrl, page.portraitImageAlt, document, 1600);
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
      image(".split-section > img", page.featureImageUrl, page.featureImageAlt, feature, 1800);
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
