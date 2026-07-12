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
```

## Deploy

This is a static site. Push this folder to GitHub, then import the repository in Vercel. No build command is required.

## CMS Testing

Sanity CMS test scaffolding is included, but it does not change the live public pages yet.

Open the local CMS preview after running `npm run dev`:

```text
http://127.0.0.1:3000/pages/cms-preview.html
```

See `CMS_SETUP.md` for the full Sanity setup steps.
