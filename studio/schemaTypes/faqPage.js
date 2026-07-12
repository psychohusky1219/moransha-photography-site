import {defineField, defineType} from "sanity";
import {altField, cardArrayField, imageField} from "./shared.js";

export const faqPage = defineType({
  name: "faqPage",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({name: "seoTitle", title: "Browser title", type: "string"}),
    defineField({name: "seoDescription", title: "Search description", type: "text", rows: 3}),
    imageField("heroImage", "Top banner photo"),
    altField("heroImageAlt"),
    defineField({name: "heroEyebrow", title: "Small title", type: "string"}),
    defineField({name: "heroTitle", title: "Main heading", type: "string"}),
    defineField({name: "heroIntro", title: "Introduction", type: "text", rows: 3}),
    cardArrayField("questions", "Questions and answers", "Use the heading for the question and text for the answer."),
    defineField({name: "ctaEyebrow", title: "Bottom section small title", type: "string"}),
    defineField({name: "ctaTitle", title: "Bottom section heading", type: "string"}),
    defineField({name: "ctaText", title: "Bottom section text", type: "text", rows: 3}),
    defineField({name: "ctaButtonLabel", title: "Bottom button label", type: "string"})
  ],
  preview: {prepare: () => ({title: "FAQ"})}
});
