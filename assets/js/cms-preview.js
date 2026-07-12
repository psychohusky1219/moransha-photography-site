(() => {
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get("slug") || "home";
  const requestedSource = params.get("source") || "local";
  const status = document.querySelector("[data-cms-status]");

  const setStatus = (message) => {
    if (status) {
      status.textContent = message;
    }
  };

  const readJson = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not load ${url}`);
    }

    return response.json();
  };

  const normalizeImage = (image) => {
    if (!image) return "";
    if (typeof image === "string") return image;
    return image.url || image.image || "";
  };

  const normalizePage = (page) => {
    const hero = page.hero || {};
    return {
      slug: page.slug || page.slug?.current || "home",
      title: page.title || "Untitled page",
      hero: {
        eyebrow: hero.eyebrow || page.heroEyebrow || "CMS preview",
        heading: hero.heading || page.heroTitle || page.title || "Untitled page",
        body: hero.body || page.heroText || "",
        image: normalizeImage(hero.image || page.heroImage),
        alt: hero.alt || page.heroImage?.alt || page.title || ""
      },
      sections: page.sections || [],
      gallery: page.gallery || []
    };
  };

  const loadLocalPages = async () => {
    const data = await readJson("/data/cms-preview.json");
    return data.pages.map(normalizePage);
  };

  const sanityEndpoint = (config, query) => {
    const host = config.useCdn ? "apicdn" : "api";
    const version = config.apiVersion || "2025-02-19";
    return `https://${config.projectId}.${host}.sanity.io/v${version}/data/query/${config.dataset}?query=${encodeURIComponent(query)}`;
  };

  const loadSanityPages = async () => {
    const config = await readJson("/data/sanity-preview.json");

    if (!config.enabled || config.projectId.includes("replace-with")) {
      throw new Error("Sanity is not connected yet. Showing local demo content.");
    }

    const query = `*[_type == "page"] | order(title asc) {
      title,
      "slug": slug.current,
      heroEyebrow,
      heroTitle,
      heroText,
      "heroImage": {
        "url": heroImage.asset->url,
        "alt": heroImage.alt
      },
      sections[] {
        eyebrow,
        heading,
        body,
        buttonLabel,
        buttonUrl,
        "image": {
          "url": image.asset->url,
          "alt": image.alt
        }
      },
      gallery[] {
        "image": asset->url,
        "alt": alt
      }
    }`;

    const response = await readJson(sanityEndpoint(config, query));
    return response.result.map(normalizePage);
  };

  const createPageLink = (page, source) => {
    const link = document.createElement("a");
    link.href = `cms-preview.html?slug=${encodeURIComponent(page.slug)}&source=${encodeURIComponent(source)}`;
    link.textContent = page.title;
    link.className = page.slug === requestedSlug ? "is-active" : "";
    return link;
  };

  const renderPageList = (pages, source) => {
    const list = document.querySelector("[data-cms-page-list]");
    if (!list) return;

    list.replaceChildren(...pages.map((page) => createPageLink(page, source)));
  };

  const renderHero = (page) => {
    const heroImage = document.querySelector("[data-cms-hero-image]");
    const eyebrow = document.querySelector("[data-cms-hero-eyebrow]");
    const title = document.querySelector("[data-cms-hero-title]");
    const text = document.querySelector("[data-cms-hero-text]");

    if (heroImage && page.hero.image) {
      heroImage.src = page.hero.image;
      heroImage.alt = page.hero.alt || "";
    }

    if (eyebrow) eyebrow.textContent = page.hero.eyebrow;
    if (title) title.textContent = page.hero.heading;
    if (text) text.textContent = page.hero.body;
    document.title = `${page.title} CMS Preview | MoranSha Photography`;
  };

  const renderSections = (sections) => {
    const container = document.querySelector("[data-cms-sections]");
    if (!container) return;

    if (!sections.length) {
      container.innerHTML = '<article class="content-card"><h3>No sections yet</h3><p>Add sections in Sanity to see them appear here.</p></article>';
      return;
    }

    container.replaceChildren(...sections.map((section) => {
      const article = document.createElement("article");
      article.className = "content-card cms-content-card";

      const eyebrow = section.eyebrow ? `<p class="eyebrow">${section.eyebrow}</p>` : "";
      const image = normalizeImage(section.image) ? `<img src="${normalizeImage(section.image)}" alt="${section.image?.alt || section.heading || ""}" loading="lazy">` : "";
      const button = section.buttonLabel && section.buttonUrl ? `<a class="btn btn-primary" href="${section.buttonUrl}">${section.buttonLabel}</a>` : "";

      article.innerHTML = `
        ${image}
        ${eyebrow}
        <h3>${section.heading || "Untitled section"}</h3>
        <p>${section.body || ""}</p>
        ${button}
      `;

      return article;
    }));
  };

  const renderGallery = (gallery) => {
    const container = document.querySelector("[data-cms-gallery]");
    if (!container) return;

    if (!gallery.length) {
      container.innerHTML = '<p class="cms-empty-note">No gallery images yet.</p>';
      return;
    }

    container.replaceChildren(...gallery.map((item) => {
      const image = document.createElement("img");
      image.src = normalizeImage(item);
      image.alt = item.alt || "CMS gallery image";
      image.loading = "lazy";
      return image;
    }));
  };

  const render = (pages, source) => {
    const page = pages.find((item) => item.slug === requestedSlug) || pages[0];
    renderPageList(pages, source);
    renderHero(page);
    renderSections(page.sections);
    renderGallery(page.gallery);
    setStatus(source === "sanity" ? "Showing Sanity content." : "Showing local demo content.");
  };

  const init = async () => {
    try {
      if (requestedSource === "sanity") {
        render(await loadSanityPages(), "sanity");
        return;
      }

      render(await loadLocalPages(), "local");
    } catch (error) {
      console.warn(error);
      setStatus(error.message);
      render(await loadLocalPages(), "local");
    }
  };

  init();
})();
