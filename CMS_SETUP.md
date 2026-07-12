# MoranSha CMS Test Setup

This project now has a Sanity CMS test setup. It does not replace the live public pages yet. It gives you a safe preview area where you can test editing page text, photos, galleries, and future page entries first.

## What Was Added

```text
studio/
  sanity.config.js
  schemaTypes/
    page.js
    siteSettings.js
    contactSettings.js
pages/cms-preview.html
assets/js/cms-preview.js
data/cms-preview.json
data/sanity-preview.json
```

## Preview Without Sanity

Run the current site:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:3000/pages/cms-preview.html
```

This uses `data/cms-preview.json`, so you can see what CMS-driven pages will look like without connecting Sanity yet.

Try another sample page:

```text
http://127.0.0.1:3000/pages/cms-preview.html?slug=about
```

## Connect Real Sanity Later

1. Create a Sanity account and project.
2. Copy `studio/.env.example` to `studio/.env`.
3. Add your Sanity project ID:

```text
SANITY_STUDIO_PROJECT_ID=your_project_id_here
SANITY_STUDIO_DATASET=production
```

4. Install the Sanity Studio dependencies:

```bash
npm run cms:studio:install
```

5. Start the Sanity Studio:

```bash
npm run cms:studio
```

6. Open:

```text
http://127.0.0.1:3333
```

7. In Sanity, add a few `Pages` documents with slugs like `home` or `about`.

8. In `data/sanity-preview.json`, set:

```json
{
  "enabled": true,
  "projectId": "your_project_id_here",
  "dataset": "production",
  "apiVersion": "2025-02-19",
  "useCdn": true
}
```

9. Open the Sanity-powered preview:

```text
http://127.0.0.1:3000/pages/cms-preview.html?source=sanity
```

## Important

For browser preview to load Sanity content, your Sanity project must allow this origin:

```text
http://127.0.0.1:3000
```

Add the live Vercel domain later only after you approve the CMS workflow.

## Before Going Live

Once the preview looks right, the next step is to wire approved Sanity content into the real public pages or generate static pages from Sanity during deployment. That should be done only after testing the editor workflow.
