import {defineArrayMember, defineField, defineType} from "sanity";
import {altField, imageField} from "./shared.js";

export const standalonePage = defineType({
  name: "standalonePage",
  title: "Standalone Landing Page",
  type: "document",
  groups: [
    {name: "hero", title: "Top section"},
    {name: "gallery", title: "Photo gallery"},
    {name: "contact", title: "Contact callout"},
    {name: "seo", title: "Search settings"}
  ],
  fields: [
    defineField({name: "seoTitle", title: "Browser title", type: "string", group: "seo"}),
    defineField({name: "seoDescription", title: "Search description", type: "text", rows: 3, group: "seo"}),
    imageField("heroImage", "Top photo", "hero"),
    altField("heroImageAlt", "Top photo description", "hero"),
    defineField({name: "heroEyebrow", title: "Small title", type: "string", group: "hero"}),
    defineField({name: "heroTitle", title: "Main heading", type: "string", group: "hero"}),
    defineField({
      name: "gallery",
      title: "Photo gallery",
      description: "Upload photos, drag them into a new order, or open a photo's menu and choose Remove. An empty gallery is hidden on the website.",
      type: "array",
      group: "gallery",
      options: {layout: "grid"},
      of: [defineArrayMember({type: "galleryImage"})]
    }),
    defineField({name: "ctaHeading", title: "Contact heading", type: "string", group: "contact"}),
    defineField({name: "ctaText", title: "Contact text", type: "text", rows: 3, group: "contact"}),
    defineField({name: "ctaButtonLabel", title: "Contact button label", type: "string", group: "contact"})
  ],
  preview: {
    select: {title: "heroEyebrow", subtitle: "heroTitle", media: "heroImage"},
    prepare: ({title, subtitle, media}) => ({title: title || "Standalone page", subtitle, media})
  }
});
