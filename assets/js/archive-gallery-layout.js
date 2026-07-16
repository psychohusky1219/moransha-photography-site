(() => {
  const gallery = document.querySelector("[data-archive-gallery]");

  if (!gallery) return;

  let animationFrame = 0;

  const layoutItem = (item) => {
    const image = item.querySelector("img");
    if (!image) return;

    const styles = getComputedStyle(gallery);
    const rowHeight = parseFloat(styles.gridAutoRows);
    const rowGap = parseFloat(styles.rowGap);
    const itemWidth = item.getBoundingClientRect().width;
    const sourceWidth = image.naturalWidth || Number(image.getAttribute("width"));
    const sourceHeight = image.naturalHeight || Number(image.getAttribute("height"));

    if (!rowHeight || !itemWidth || !sourceWidth || !sourceHeight) return;

    const imageHeight = itemWidth * (sourceHeight / sourceWidth);
    const rowSpan = Math.ceil((imageHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = `span ${Math.max(1, rowSpan)}`;
  };

  const layout = () => {
    gallery.querySelectorAll(".archive-gallery-item").forEach(layoutItem);
  };

  const scheduleLayout = () => {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(layout);
  };

  const bindImage = (image) => {
    if (image.dataset.archiveLayoutBound) return;
    image.dataset.archiveLayoutBound = "true";
    image.addEventListener("load", scheduleLayout);
    if (image.complete) scheduleLayout();
  };

  const observer = new MutationObserver(() => {
    gallery.querySelectorAll("img").forEach(bindImage);
    scheduleLayout();
  });

  observer.observe(gallery, {childList: true, subtree: true});
  gallery.querySelectorAll("img").forEach(bindImage);
  window.addEventListener("resize", scheduleLayout, {passive: true});
  document.fonts?.ready.then(scheduleLayout);
  scheduleLayout();
})();
