(async () => {
  const summaryEl = document.querySelector("[data-reviews-summary]");
  if (!summaryEl) return;

  const starsEl = document.querySelector("[data-reviews-stars]");
  const scoreEl = document.querySelector("[data-reviews-score]");
  const countEl = document.querySelector("[data-reviews-count]");
  const writeEl = document.querySelector("[data-reviews-write]");
  const gridEl = document.querySelector("[data-reviews-grid]");
  const fallbackEl = document.querySelector("[data-reviews-fallback]");
  const fallbackLinkEl = document.querySelector("[data-reviews-fallback-link]");

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

  const showFallback = (url) => {
    if (!url || !fallbackEl || !fallbackLinkEl) return;
    fallbackLinkEl.href = url;
    fallbackEl.hidden = false;
  };

  try {
    const response = await fetch("/api/google-reviews");
    const data = await response.json();

    if (!data.available) {
      showFallback(data.reviewsUrl);
      return;
    }

    if (starsEl) starsEl.textContent = renderStars(data.rating);
    if (scoreEl) scoreEl.textContent = data.rating ? data.rating.toFixed(1) : "";
    if (countEl && data.reviewCount) countEl.textContent = `${data.reviewCount} Google reviews`;
    if (writeEl && data.writeReviewUrl) writeEl.href = data.writeReviewUrl;
    summaryEl.hidden = false;

    if (gridEl && Array.isArray(data.reviews) && data.reviews.length) {
      gridEl.innerHTML = data.reviews
        .map(
          (review) => `
            <article class="review-card">
              <div class="review-card-stars" aria-hidden="true">${renderStars(review.rating)}</div>
              <p class="review-card-text">${escapeHtml(review.text)}</p>
              <p class="review-card-author">${escapeHtml(review.author)} <span>· ${escapeHtml(review.relativeTime)}</span></p>
            </article>
          `
        )
        .join("");
    }
  } catch (error) {
    // Network or parsing failure: leave the section hidden rather than show broken state.
  }
})();
