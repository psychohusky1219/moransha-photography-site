import {defineArrayMember, defineField, defineType} from "sanity";
import {altField, cardArrayField, imageField} from "./shared.js";

export const portfolioPage = defineType({
  name: "portfolioPage",
  title: "Photography Page",
  type: "document",
  fields: [
    defineField({name: "seoTitle", title: "Browser title", type: "string"}),
    defineField({name: "seoDescription", title: "Search description", type: "text", rows: 3}),
    imageField("heroImage", "Top banner photo"),
    altField("heroImageAlt"),
    defineField({name: "heroEyebrow", title: "Small title", type: "string"}),
    defineField({name: "heroTitle", title: "Main heading", type: "string"}),
    defineField({name: "heroIntro", title: "Introduction", type: "text", rows: 3}),
    imageField("featureImage", "Featured photo"),
    altField("featureImageAlt"),
    defineField({name: "featureEyebrow", title: "Featured small title", type: "string"}),
    defineField({name: "featureTitle", title: "Featured heading", type: "string"}),
    defineField({name: "featureText", title: "Featured text", type: "text", rows: 4}),
    defineField({name: "featureButtonLabel", title: "Booking button label", type: "string"}),
    defineField({name: "coverageEyebrow", title: "Coverage small title", type: "string"}),
    defineField({name: "coverageTitle", title: "Coverage heading", type: "string"}),
    cardArrayField("coverageItems", "Coverage items", "Drag items to change their order."),
    defineField({
      name: "gallery",
      title: "Photo gallery",
      description: "Upload photos, drag them into a new order, or open a photo's menu and choose Remove. An empty gallery is hidden on the website.",
      type: "array",
      options: {layout: "grid"},
      of: [defineArrayMember({type: "galleryImage"})]
    })
  ],
  preview: {
    select: {title: "heroEyebrow", media: "heroImage"},
    prepare: ({title, media}) => ({title: title || "Photography page", media})
  }
});
