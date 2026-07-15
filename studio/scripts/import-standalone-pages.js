import {readFileSync} from "node:fs";
import {basename, resolve} from "node:path";
import {getCliClient} from "sanity/cli";

const client = getCliClient({apiVersion: "2025-02-19"}).withConfig({perspective: "raw"});
const siteRoot = resolve(process.cwd(), "..");
const migrationId = "migration.standalonePages.v1";
const cdn = "https://images.squarespace-cdn.com/content/v1/62421eb89b3fae754ee94567/";

const readGallery = (filename) =>
  JSON.parse(readFileSync(resolve(siteRoot, "assets", "data", filename), "utf8"));

const pages = [
  {
    id: "newYorkPage",
    prefix: "new-york",
    gallery: readGallery("new-york-gallery.json"),
    hero: {
      path: "733dfc51-d08e-43d3-8a95-a3bc821db1b7/Moransha-119.jpg",
      alt: "Newlyweds photographed in New York"
    },
    document: {
      _id: "newYorkPage",
      _type: "standalonePage",
      seoTitle: "New York | MoranSha Photography",
      seoDescription: "New York wedding and couple photography by MoranSha Photography.",
      heroEyebrow: "The art of storytelling",
      heroTitle: "Authentic moments. Timeless memories",
      ctaHeading: "Tell your New York story.",
      ctaText: "Share your date, location, and the moments you want captured.",
      ctaButtonLabel: "Get in Touch"
    }
  },
  {
    id: "eventsPage",
    prefix: "events",
    gallery: readGallery("events-gallery.json"),
    hero: null,
    document: {
      _id: "eventsPage",
      _type: "standalonePage",
      seoTitle: "Events | MoranSha Photography",
      seoDescription: "Event photography by MoranSha Photography.",
      heroEyebrow: "The art of celebration",
      heroTitle: "Authentic moments. Timeless memories",
      ctaHeading: "Plan your celebration.",
      ctaText: "Tell us about your event, your date, and the moments you want remembered.",
      ctaButtonLabel: "Get in Touch"
    }
  }
];

const sourceUrl = (path, width = 1800) => `${cdn}${path}?format=${width}w`;

const uploadSource = async ({path, width = 1800}) => {
  const url = sourceUrl(path, width);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not download ${url}: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  return client.assets.upload("image", bytes, {
    filename: decodeURIComponent(basename(new URL(url).pathname)),
    contentType: response.headers.get("content-type") || "image/jpeg"
  });
};

const uploadAll = async (sources) => {
  const assets = new Map();
  let nextIndex = 0;
  let completed = 0;

  const worker = async () => {
    while (nextIndex < sources.length) {
      const index = nextIndex++;
      const source = sources[index];
      const asset = await uploadSource(source);
      assets.set(source.key, asset);
      completed += 1;
      console.log(`Uploaded ${completed}/${sources.length}: ${source.path}`);
    }
  };

  await Promise.all([worker(), worker(), worker(), worker()]);
  return assets;
};

const run = async () => {
  if (await client.getDocument(migrationId)) {
    console.log("The standalone page photos have already been imported.");
    return;
  }

  for (const page of pages) {
    await client.createIfNotExists(page.document);
  }

  const sourceMap = new Map();
  pages.forEach((page) => {
    page.gallery.forEach((photo) => {
      const key = `gallery:${photo.path}`;
      sourceMap.set(key, {key, path: photo.path});
    });
    if (page.hero) {
      const key = `hero:${page.hero.path}`;
      sourceMap.set(key, {key, path: page.hero.path, width: 2500});
    }
  });

  const sources = [...sourceMap.values()];
  console.log(`Uploading ${sources.length} standalone page photos to Sanity...`);
  const assets = await uploadAll(sources);

  for (const page of pages) {
    const values = {
      gallery: page.gallery.map((photo, index) => ({
        _type: "galleryImage",
        _key: `${page.prefix}-${String(index + 1).padStart(3, "0")}`,
        asset: {_type: "reference", _ref: assets.get(`gallery:${photo.path}`)._id},
        alt: photo.alt
      }))
    };

    if (page.hero) {
      values.heroImage = {
        _type: "image",
        asset: {_type: "reference", _ref: assets.get(`hero:${page.hero.path}`)._id}
      };
      values.heroImageAlt = page.hero.alt;
    }

    for (const targetId of [page.id, `drafts.${page.id}`]) {
      if (await client.getDocument(targetId)) {
        await client.patch(targetId).set(values).commit({autoGenerateArrayKeys: true});
      }
    }
    console.log(`Connected all current photos to ${page.id}.`);
  }

  await client.create({
    _id: migrationId,
    _type: "migrationMarker",
    title: "Standalone page photos imported",
    completedAt: new Date().toISOString()
  });

  console.log("Standalone page migration complete. New York and Events are editable in Sanity.");
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
