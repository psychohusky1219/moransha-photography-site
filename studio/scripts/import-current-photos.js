import {createReadStream, existsSync} from "node:fs";
import {basename, resolve} from "node:path";
import {getCliClient} from "sanity/cli";

const client = getCliClient({apiVersion: "2025-02-19"});
const siteRoot = resolve(process.cwd(), "..");
const migrationId = "migration.currentWebsitePhotos.v1";

const local = (path, alt) => ({kind: "local", path, alt, key: `local:${path}`});
const remote = (url, filename, alt) => ({kind: "remote", url, filename, alt, key: `remote:${url}`});

const foodGalleryFiles = [
  "moransha-25.jpg",
  "dsc-3335-enhanced-nr.jpg",
  "moransha-73.jpg",
  "mor-2.jpg",
  "moransha-10.jpg",
  "310a9904.jpg",
  "moransha-50.jpg",
  "moransha-1-2.jpg",
  "moransha-344.jpg",
  "mor-10.jpg",
  "moransha-20.jpg",
  "moransha-37.jpg",
  "dsc-3457-enhanced-nr.jpg",
  "moransha-67.jpg",
  "moransha-2.jpg",
  "mor-3.jpg",
  "moransha-443.jpg",
  "moransha-29.jpg",
  "moransha-101.jpg",
  "moransha-47.jpg",
  "310a9902.jpg",
  "moransha-34.jpg",
  "moransha-6.jpg",
  "moransha-17.jpg",
  "moransha-444.jpg",
  "moransha-1.jpg",
  "moransha-40.jpg",
  "moransha-19.jpg",
  "moransha-99.jpg",
  "moransha-28.jpg",
  "moransha-24.jpg",
  "moransha-38.jpg",
  "moransha-23.jpg",
  "moransha-41.jpg",
  "moransha-173.jpg",
  "moransha-43.jpg",
  "moransha-9.jpg"
];

const realEstateGalleryFiles = [
  "dji-0410.jpg",
  "dsc00839.jpg",
  "dsc00845.jpg",
  "dsc00846.jpg",
  "dsc00847-1.jpg",
  "dsc01072.jpg",
  "dsc01109.jpg",
  "mor08751.jpg",
  "mor08763.jpg",
  "mor08772.jpg",
  "mor08778.jpg",
  "mor08787.jpg",
  "mor08799.jpg",
  "mor08838.jpg",
  "mor08865.jpg",
  "mor08871.jpg",
  "mor08889.jpg",
  "mor08901.jpg",
  "moransha.jpg",
  "moransha-17.jpg",
  "moransha-2.jpg",
  "moransha-25.jpg",
  "moransha-32.jpg",
  "moransha-34.jpg",
  "moransha-578.jpg",
  "moransha-7.jpg",
  "moransha-75.jpg"
];

const sources = {
  homeHero: local("assets/images/dsc-3457-enhanced-nr.jpg", "An editorial table scene with plated dishes photographed in natural light."),
  homeFood: local("assets/images/moransha-25-food.jpg", "A plated restaurant dish styled for food photography."),
  homeRealEstate: local("assets/images/mor08799-real-estate.jpg", "A bright luxury interior with large windows."),
  aboutHero: remote(
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2400&q=86",
    "about-page-hero.jpg",
    "Photographer holding a camera during a creative shoot."
  ),
  aboutPortrait: local("assets/images/about-me-photo.webp", "Portrait of Moran from MoranSha Photography."),
  foodHero: local("assets/images/food-gallery/moransha-44.jpg", "A chef holding a styled burger for food photography."),
  foodFeature: local("assets/images/food-gallery/moransha-1.jpg", "A styled restaurant dish photographed for a food brand."),
  realEstateHero: local("assets/images/real-estate-gallery/mor08772.jpg", "Bright modern kitchen and dining space with wide windows and hillside views."),
  realEstateFeature: local("assets/images/real-estate-gallery/dji-0410.jpg", "Aerial exterior view of a modern luxury property with outdoor living spaces."),
  contactHero: remote(
    "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=2400&q=86",
    "contact-page-hero.jpg",
    "A creative desk with camera gear and campaign planning notes."
  ),
  faqHero: remote(
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2400&q=86",
    "faq-page-hero.jpg",
    "Creative planning desk with laptop, notes, and photography references."
  ),
  privacyHero: remote(
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2400&q=86",
    "privacy-page-hero.jpg",
    "Laptop on a clean desk."
  ),
  termsHero: remote(
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2400&q=86",
    "terms-page-hero.jpg",
    "Documents and pen on a desk."
  ),
  cancellationsHero: remote(
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2400&q=86",
    "cancellations-page-hero.jpg",
    "Quiet office space with planning notes."
  )
};

const foodGallery = foodGalleryFiles.map((filename, index) =>
  local(
    `assets/images/food-gallery/${filename}`,
    `MoranSha food photography gallery image ${index + 1}`
  )
);

const realEstateGallery = realEstateGalleryFiles.map((filename, index) =>
  local(
    `assets/images/real-estate-gallery/${filename}`,
    `MoranSha real estate photography gallery image ${index + 1}`
  )
);

const pageMedia = {
  homePage: {
    heroImage: sources.homeHero,
    heroImageAlt: sources.homeHero.alt,
    foodImage: sources.homeFood,
    foodImageAlt: sources.homeFood.alt,
    realEstateImage: sources.homeRealEstate,
    realEstateImageAlt: sources.homeRealEstate.alt
  },
  aboutPage: {
    heroImage: sources.aboutHero,
    heroImageAlt: sources.aboutHero.alt,
    portraitImage: sources.aboutPortrait,
    portraitImageAlt: sources.aboutPortrait.alt
  },
  foodPage: {
    heroImage: sources.foodHero,
    heroImageAlt: sources.foodHero.alt,
    featureImage: sources.foodFeature,
    featureImageAlt: sources.foodFeature.alt,
    gallery: foodGallery
  },
  realEstatePage: {
    heroImage: sources.realEstateHero,
    heroImageAlt: sources.realEstateHero.alt,
    featureImage: sources.realEstateFeature,
    featureImageAlt: sources.realEstateFeature.alt,
    gallery: realEstateGallery
  },
  contactPage: {heroImage: sources.contactHero, heroImageAlt: sources.contactHero.alt},
  faqPage: {heroImage: sources.faqHero, heroImageAlt: sources.faqHero.alt},
  privacyPage: {heroImage: sources.privacyHero, heroImageAlt: sources.privacyHero.alt},
  termsPage: {heroImage: sources.termsHero, heroImageAlt: sources.termsHero.alt},
  cancellationsPage: {heroImage: sources.cancellationsHero, heroImageAlt: sources.cancellationsHero.alt},
  termsConditionsPage: {heroImage: sources.termsHero, heroImageAlt: sources.termsHero.alt}
};

const uniqueSources = new Map();
Object.values(pageMedia).forEach((fields) => {
  Object.values(fields).forEach((value) => {
    if (Array.isArray(value)) value.forEach((source) => uniqueSources.set(source.key, source));
    else if (value?.key) uniqueSources.set(value.key, value);
  });
});

const uploadSource = async (source) => {
  if (source.kind === "local") {
    const absolutePath = resolve(siteRoot, source.path);
    if (!existsSync(absolutePath)) throw new Error(`Missing website photo: ${source.path}`);
    return client.assets.upload("image", createReadStream(absolutePath), {
      filename: basename(source.path)
    });
  }

  const response = await fetch(source.url);
  if (!response.ok) throw new Error(`Could not download ${source.url}: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  return client.assets.upload("image", bytes, {
    filename: source.filename,
    contentType: response.headers.get("content-type") || "image/jpeg"
  });
};

const uploadAll = async () => {
  const entries = [...uniqueSources.values()];
  const assets = new Map();
  let nextIndex = 0;
  let completed = 0;

  const worker = async () => {
    while (nextIndex < entries.length) {
      const index = nextIndex++;
      const source = entries[index];
      const asset = await uploadSource(source);
      assets.set(source.key, asset);
      completed += 1;
      console.log(`Uploaded ${completed}/${entries.length}: ${source.path || source.filename}`);
    }
  };

  await Promise.all([worker(), worker(), worker(), worker()]);
  return assets;
};

const run = async () => {
  if (await client.getDocument(migrationId)) {
    console.log("The current website photos have already been imported.");
    return;
  }

  console.log(`Uploading ${uniqueSources.size} current website photos to Sanity...`);
  const assets = await uploadAll();
  const imageValue = (source) => ({
    _type: "image",
    asset: {_type: "reference", _ref: assets.get(source.key)._id}
  });
  const galleryValue = (items, prefix) =>
    items.map((source, index) => ({
      _type: "galleryImage",
      _key: `${prefix}-${String(index + 1).padStart(2, "0")}`,
      asset: {_type: "reference", _ref: assets.get(source.key)._id},
      alt: source.alt
    }));

  for (const [documentId, fields] of Object.entries(pageMedia)) {
    const values = {};
    Object.entries(fields).forEach(([field, value]) => {
      if (field === "gallery") values[field] = galleryValue(value, documentId === "foodPage" ? "food" : "estate");
      else if (value?.key) values[field] = imageValue(value);
      else values[field] = value;
    });

    const targetIds = [documentId, `drafts.${documentId}`];
    for (const targetId of targetIds) {
      if (await client.getDocument(targetId)) {
        await client.patch(targetId).setIfMissing(values).commit({autoGenerateArrayKeys: true});
      }
    }
    console.log(`Connected current photos to ${documentId}.`);
  }

  await client.create({
    _id: migrationId,
    _type: "migrationMarker",
    title: "Current website photos imported",
    completedAt: new Date().toISOString()
  });
  console.log("Photo migration complete. Every current website photo is now editable in Sanity.");
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
