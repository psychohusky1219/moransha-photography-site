# MoranSha Website Editor

Sanity Studio is the private editing dashboard for the website. It controls page wording, featured photos, galleries, FAQs, policy sections, contact details, social links, the shared Get in Touch section, and the standalone New York and Events pages.

Permanent editor: `https://moransha-photography.sanity.studio/`

## First-Time Setup

1. In the website folder, run `npm run studio`.
2. Open `http://127.0.0.1:3333/`.
3. Sign in with the Sanity account that owns project `843m1n6c`.
4. Open **Start Here**.
5. Click **Add missing website pages** once.

This creates only missing page records and never overwrites existing edits.

## Edit the Website

1. Open **Content** in Sanity Studio.
2. Choose the page or **Site Settings**.
3. Change text, upload or replace a photo, remove a photo, or drag gallery photos into a new order.
4. Click **Publish**.

The unlisted New York and Events landing pages are grouped under **Standalone Pages**. Editing them does not add either page to the public website navigation.

The live website reads published content. Unpublished drafts are not shown to visitors. If Sanity is temporarily unavailable, the original HTML content and photos remain visible.

### Remove a Photo

- For a banner, portrait, or featured photo, open the photo field and choose **Remove**.
- For a gallery photo, open that photo's menu and choose **Remove**.
- To hide a whole gallery, remove every photo from the gallery.
- Click **Publish** after the change. Empty photo areas use a clean colored background, and empty galleries are hidden.

## Run the Website Locally

In a second terminal, run `npm run dev`, then open `http://127.0.0.1:3000/`.

## Put the Editor Online

From the `studio` folder, run `npm run deploy`. Sanity updates `https://moransha-photography.sanity.studio/`, while Vercel continues hosting the public website.
