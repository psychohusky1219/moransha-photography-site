import {defineField, defineType} from "sanity";
import {altField, cardArrayField, imageField} from "./shared.js";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About",
  type: "document",
  fields: [
    defineField({name: "seoTitle", title: "Browser title", type: "string"}),
    defineField({name: "seoDescription", title: "Search description", type: "text", rows: 3}),
    imageField("heroImage", "Top banner photo"),
    altField("heroImageAlt"),
    defineField({name: "heroEyebrow", title: "Small title", type: "string"}),
    defineField({name: "heroTitle", title: "Main heading", type: "string"}),
    defineField({name: "heroIntro", title: "Introduction", type: "text", rows: 3}),
    imageField("portraitImage", "Portrait photo"),
    altField("portraitImageAlt"),
    defineField({name: "approachEyebrow", title: "Approach small title", type: "string"}),
    defineField({name: "approachTitle", title: "Approach heading", type: "string"}),
    defineField({name: "approachParagraphs", title: "Approach paragraphs", type: "array", of: [{type: "text", rows: 3}]}),
    defineField({name: "approachButtonLabel", title: "Approach button label", type: "string"}),
    defineField({name: "valuesEyebrow", title: "Values small title", type: "string"}),
    defineField({name: "valuesTitle", title: "Values heading", type: "string"}),
    cardArrayField("values", "Values", "Drag items to change their order.")
  ],
  preview: {prepare: () => ({title: "About"})}
});
