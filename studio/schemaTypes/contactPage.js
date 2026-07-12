import {defineField, defineType} from "sanity";
import {altField, cardArrayField, imageField} from "./shared.js";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact",
  type: "document",
  fields: [
    defineField({name: "seoTitle", title: "Browser title", type: "string"}),
    defineField({name: "seoDescription", title: "Search description", type: "text", rows: 3}),
    imageField("heroImage", "Top banner photo"),
    altField("heroImageAlt"),
    defineField({name: "heroTitle", title: "Main heading", type: "string"}),
    defineField({name: "heroIntro", title: "Introduction", type: "text", rows: 3}),
    defineField({name: "formEyebrow", title: "Form small title", type: "string"}),
    defineField({name: "formTitle", title: "Form heading", type: "string"}),
    defineField({name: "formIntro", title: "Form introduction", type: "text", rows: 3}),
    defineField({name: "detailsEyebrow", title: "Details small title", type: "string"}),
    defineField({name: "detailsTitle", title: "Details heading", type: "string"}),
    defineField({name: "detailsText", title: "Details text", type: "text", rows: 3}),
    defineField({name: "stepsEyebrow", title: "Booking steps small title", type: "string"}),
    cardArrayField("bookingSteps", "Booking steps", "Drag items to change their order.")
  ],
  preview: {prepare: () => ({title: "Contact"})}
});
