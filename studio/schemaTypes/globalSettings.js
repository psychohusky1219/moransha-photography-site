import {defineField, defineType} from "sanity";

export const globalSettings = defineType({
  name: "globalSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    {name: "navigation", title: "Navigation labels", default: true},
    {name: "social", title: "Social links"},
    {name: "cta", title: "Get in touch section"}
  ],
  fields: [
    defineField({
      name: "navHomeLabel",
      title: "Home tab",
      description: "Changes the visible menu text. The page link stays the same.",
      type: "string",
      group: "navigation",
      validation: (Rule) => Rule.required().max(30)
    }),
    defineField({name: "navFoodLabel", title: "Food Photography tab", type: "string", group: "navigation", validation: (Rule) => Rule.required().max(30)}),
    defineField({name: "navRealEstateLabel", title: "Real Estate tab", type: "string", group: "navigation", validation: (Rule) => Rule.required().max(30)}),
    defineField({name: "navPricingLabel", title: "Prices tab", type: "string", group: "navigation", validation: (Rule) => Rule.required().max(30)}),
    defineField({name: "navAboutLabel", title: "About tab", type: "string", group: "navigation", validation: (Rule) => Rule.required().max(30)}),
    defineField({name: "navContactLabel", title: "Contact tab", type: "string", group: "navigation", validation: (Rule) => Rule.required().max(30)}),
    defineField({name: "instagramUrl", title: "Instagram URL", type: "url", group: "social"}),
    defineField({name: "facebookUrl", title: "Facebook URL", type: "url", group: "social"}),
    defineField({name: "whatsappUrl", title: "WhatsApp URL", type: "url", group: "social"}),
    defineField({name: "email", title: "Public email", type: "string", group: "social"}),
    defineField({name: "phoneDisplay", title: "Phone number as displayed", type: "string", group: "social"}),
    defineField({name: "phoneLink", title: "Phone link", description: "Example: +17473071595", type: "string", group: "social"}),
    defineField({name: "ctaHeading", title: "Heading", type: "string", group: "cta"}),
    defineField({name: "ctaText", title: "Text", type: "text", rows: 3, group: "cta"}),
    defineField({name: "ctaButtonLabel", title: "Button label", type: "string", group: "cta"})
  ],
  preview: {prepare: () => ({title: "Site Settings"})}
});
