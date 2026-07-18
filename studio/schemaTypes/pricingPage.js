import {defineArrayMember, defineField, defineType} from "sanity";
import {altField, cardArrayField, imageField} from "./shared.js";

export const pricingPackage = defineType({
  name: "pricingPackage",
  title: "Pricing package",
  type: "object",
  fields: [
    defineField({
      name: "category",
      title: "Service tab",
      description: "Choose which tab should display this package on the Prices page.",
      type: "string",
      options: {
        layout: "radio",
        list: [
          {title: "Food Photography", value: "food"},
          {title: "Real Estate", value: "realEstate"},
          {title: "Events", value: "events"}
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({name: "serviceLabel", title: "Small service title", type: "string", validation: (Rule) => Rule.required()}),
    defineField({name: "title", title: "Package heading", type: "string", validation: (Rule) => Rule.required()}),
    defineField({name: "price", title: "Displayed price", description: "Examples: Starting at $650, $375, or Custom quote.", type: "string", validation: (Rule) => Rule.required()}),
    defineField({name: "priceNote", title: "Short price note", type: "string"}),
    defineField({name: "description", title: "Description", type: "text", rows: 3}),
    defineField({
      name: "features",
      title: "What is included",
      description: "Drag items to change their order.",
      type: "array",
      of: [defineArrayMember({type: "string"})],
      validation: (Rule) => Rule.max(8)
    }),
    defineField({name: "buttonLabel", title: "Button label", type: "string"}),
    defineField({name: "featured", title: "Highlight this package", type: "boolean", initialValue: false}),
    defineField({name: "badge", title: "Highlight label", description: "Shown only when this package is highlighted. Example: Most requested.", type: "string"})
  ],
  preview: {
    select: {title: "title", subtitle: "price"}
  }
});

export const pricingPage = defineType({
  name: "pricingPage",
  title: "Prices",
  type: "document",
  groups: [
    {name: "hero", title: "Top banner"},
    {name: "packages", title: "Pricing packages"},
    {name: "details", title: "Quote details"},
    {name: "cta", title: "Bottom call to action"},
    {name: "seo", title: "Search settings"}
  ],
  fields: [
    defineField({name: "seoTitle", title: "Browser title", type: "string", group: "seo"}),
    defineField({name: "seoDescription", title: "Search description", type: "text", rows: 3, group: "seo"}),
    imageField("heroImage", "Top banner photo", "hero"),
    altField("heroImageAlt", "Top banner photo description", "hero"),
    defineField({name: "heroEyebrow", title: "Small title", type: "string", group: "hero"}),
    defineField({name: "heroTitle", title: "Main heading", type: "string", group: "hero"}),
    defineField({name: "heroIntro", title: "Introduction", type: "text", rows: 3, group: "hero"}),
    defineField({name: "packagesEyebrow", title: "Section small title", type: "string", group: "packages"}),
    defineField({name: "packagesTitle", title: "Section heading", type: "string", group: "packages"}),
    defineField({name: "packagesIntro", title: "Section introduction", type: "text", rows: 3, group: "packages"}),
    defineField({
      name: "packages",
      title: "Packages",
      description: "Drag packages into the order they should appear on the website.",
      type: "array",
      group: "packages",
      of: [defineArrayMember({type: "pricingPackage"})],
      validation: (Rule) => Rule.min(1).max(6)
    }),
    defineField({name: "detailsEyebrow", title: "Details small title", type: "string", group: "details"}),
    defineField({name: "detailsTitle", title: "Details heading", type: "string", group: "details"}),
    cardArrayField("details", "Quote details", "Drag items to change their order.", "details"),
    defineField({name: "noteTitle", title: "Pricing note heading", type: "string", group: "details"}),
    defineField({name: "noteText", title: "Pricing note text", type: "text", rows: 4, group: "details"}),
    defineField({name: "ctaHeading", title: "Call-to-action heading", type: "string", group: "cta"}),
    defineField({name: "ctaText", title: "Call-to-action text", type: "text", rows: 3, group: "cta"}),
    defineField({name: "ctaButtonLabel", title: "Button label", type: "string", group: "cta"})
  ],
  preview: {prepare: () => ({title: "Prices"})}
});
