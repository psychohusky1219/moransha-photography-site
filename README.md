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
