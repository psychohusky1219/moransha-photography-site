(() => {
  const gallery = document.querySelector("[data-archive-gallery='events']");

  if (!gallery) return;

  const loadFallback = async () => {
    try {
      const response = await fetch("/assets/data/events-gallery.json", {
        headers: {Accept: "application/json"}
      });
      if (!response.ok) throw new Error(`Gallery data returned ${response.status}`);
      const filenameSorter = new Intl.Collator(undefined, {numeric: true, sensitivity: "base"});
      const photos = (await response.json()).sort((first, second) => filenameSorter.compare(
        decodeURIComponent(first.path.split("/").pop()),
        decodeURIComponent(second.path.split("/").pop())
      ));
      if (document.documentElement.dataset.contentSource === "sanity") return;

      const figures = photos.map((item, index) => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");

        figure.className = "archive-gallery-item";
        image.src = `https://images.squarespace-cdn.com/content/v1/62421eb89b3fae754ee94567/${item.path}?format=1000w`;
        image.alt = item.alt || `MoranSha event photography ${index + 1}`;
        image.loading = index < 8 ? "eager" : "lazy";
        image.decoding = "async";
        image.addEventListener("load", () => image.classList.add("is-ready"), {once: true});

        if (image.complete) image.classList.add("is-ready");
        figure.append(image);
        return figure;
      });

      if (document.documentElement.dataset.contentSource !== "sanity") {
        gallery.replaceChildren(...figures);
      }
    } catch (error) {
      console.warn("The fallback gallery could not be loaded.", error);
    }
  };

  loadFallback();
})();
