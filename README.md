# MoranSha Photography Website

Static, responsive service website for MoranSha Photography.

## Run Locally

```bash
npm run dev
```

Then open:

```text
http://127.0.0.1:3000/
```

Use a custom port if needed:

```bash
node scripts/serve.cjs 3199
```

## Structure

```text
index.html
pages/
  about.html
  contact.html
  faq.html
  collections/
    food-photography.html
    real-estate.html
  policies/
    privacy.html
    terms.html
    cancellations.html
assets/
  css/styles.css
  js/main.js
scripts/
  serve.cjs
studio/
  Sanity editing dashboard
api/
  sanity-content.js
```

## Edit Website Content

The site is connected to Sanity project `843m1n6c`. See [CMS_SETUP.md](CMS_SETUP.md) for the first-time setup, editing, and publishing instructions.

Hosted editor: `https://moransha-photography.sanity.studio/`

The public pages keep their existing HTML and local photos as fallbacks. Published Sanity content is loaded through the same-origin `/api/sanity-content` endpoint.

## Deploy

Push this folder to GitHub, then import the repository in Vercel. The public pages require no build command; Vercel automatically serves the content API from the `api` folder.
