import {defineField, defineType} from "sanity";

export const globalSettings = defineType({
  name: "globalSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    {name: "social", title: "Social links"},
    {name: "cta", title: "Get in touch section"}
  ],
  fields: [
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
