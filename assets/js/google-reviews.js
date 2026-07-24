(async () => {
  const summaryEl = document.querySelector("[data-reviews-summary]");
  if (!summaryEl) return;

  const tierEl = document.querySelector("[data-reviews-tier]");
  const starsEl = document.querySelector("[data-reviews-stars]");
  const scoreEl = document.querySelector("[data-reviews-score]");
  const countEl = document.querySelector("[data-reviews-count]");
  const writeEl = document.querySelector("[data-reviews-write]");
  const carouselEl = document.querySelector("[data-reviews-carousel]");
  const trackEl = document.querySelector("[data-reviews-track]");
  const prevEl = document.querySelector("[data-reviews-prev]");
  const nextEl = document.querySelector("[data-reviews-next]");
  const fallbackEl = document.querySelector("[data-reviews-fallback]");
  const fallbackLinkEl = document.querySelector("[data-reviews-fallback-link]");

  const AVATAR_COLORS = ["#7f2024", "#5f171b", "#89988a", "#3f4f43", "#6b5b3e", "#4a5568"];

  const escapeHtml = (value) =>
    String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));

  const renderStars = (rating) => {
    const rounded = Math.max(0, Math.min(5, Math.round(rating || 0)));
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  };

  const ratingTier = (rating) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4) return "Great";
    if (rating >= 3) return "Good";
    if (rating >= 2) return "Fair";
    return "Poor";
  };

  const avatarColor = (name) => {
    const code = String(name).charCodeAt(0) || 0;
    return AVATAR_COLORS[code % AVATAR_COLORS.length];
  };

  const googleBadgeSvg = `<svg class="review-card-g" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88z"/>
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
  </svg>`;

  const checkBadgeSvg = `<svg class="review-card-check" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <circle cx="8" cy="8" r="8" fill="#4285F4"/>
    <path d="M4.5 8.2l2.2 2.2 4.8-4.8" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const renderCard = (review) => {
    const initial = (review.author || "G").trim().charAt(0).toUpperCase();
    const avatar = review.photoUrl
      ? `<img class="review-card-avatar" src="${escapeHtml(review.photoUrl)}" alt="" loading="lazy" referrerpolicy="no-referrer">`
      : `<span class="review-card-avatar review-card-avatar-fallback" style="background:${avatarColor(review.author)}">${escapeHtml(initial)}</span>`;

    const text = escapeHtml(review.text || "");
    const isLong = text.length > 220;

    return `
      <article class="review-card">
        <div class="review-card-top">
          <div class="review-card-person">
            ${avatar}
            <div>
              <p class="review-card-name">${escapeHtml(review.author)}</p>
              <p class="review-card-time">${escapeHtml(review.relativeTime)}</p>
            </div>
          </div>
          ${googleBadgeSvg}
        </div>
        <div class="review-card-stars-row">
          <span class="review-card-stars" aria-hidden="true">${renderStars(review.rating)}</span>
          ${checkBadgeSvg}
        </div>
        <p class="review-card-text${isLong ? " is-clamped" : ""}" data-review-text>${text}</p>
        ${isLong ? `<button class="review-card-more" type="button" data-review-toggle>Read more</button>` : ""}
      </article>
    `;
  };

  const showFallback = (url) => {
    if (!url || !fallbackEl || !fallbackLinkEl) return;
    fallbackLinkEl.href = url;
    fallbackEl.hidden = false;
  };

  const initCarousel = () => {
    if (!trackEl) return;
    const cardWidth = () => {
      const card = trackEl.querySelector(".review-card");
      return card ? card.getBoundingClientRect().width + 24 : 320;
    };
    prevEl?.addEventListener("click", () => {
      trackEl.scrollBy({left: -cardWidth(), behavior: "smooth"});
    });
    nextEl?.addEventListener("click", () => {
      trackEl.scrollBy({left: cardWidth(), behavior: "smooth"});
    });
    trackEl.addEventListener("click", (event) => {
      const button = event.target.closest("[data-review-toggle]");
      if (!button) return;
      const card = button.closest(".review-card");
      const textEl = card?.querySelector("[data-review-text]");
      if (!textEl) return;
      const collapsed = textEl.classList.toggle("is-clamped");
      button.textContent = collapsed ? "Read more" : "Read less";
    });
  };

  try {
    const response = await fetch("/api/google-reviews");
    const data = await response.json();

    if (!data.available) {
      showFallback(data.reviewsUrl);
      return;
    }

    if (tierEl && data.rating) tierEl.textContent = ratingTier(data.rating);
    if (starsEl) starsEl.textContent = renderStars(data.rating);
    if (scoreEl) scoreEl.textContent = data.rating ? data.rating.toFixed(1) : "";
    if (countEl && data.reviewCount) countEl.textContent = `${data.reviewCount} reviews`;
    if (writeEl && data.writeReviewUrl) writeEl.href = data.writeReviewUrl;
    summaryEl.hidden = false;

    if (Array.isArray(data.reviews) && data.reviews.length && trackEl && carouselEl) {
      trackEl.innerHTML = data.reviews.map(renderCard).join("");
      carouselEl.hidden = false;
      initCarousel();
    }
  } catch (error) {
    // Network or parsing failure: leave the section hidden rather than show broken state.
  }
})();
