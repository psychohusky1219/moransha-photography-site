import {defineArrayMember, defineField, defineType} from "sanity";
import {altField, imageField} from "./shared.js";

export const policyPage = defineType({
  name: "policyPage",
  title: "Policy Page",
  type: "document",
  fields: [
    defineField({name: "seoTitle", title: "Browser title", type: "string"}),
    defineField({name: "seoDescription", title: "Search description", type: "text", rows: 3}),
    imageField("heroImage", "Top banner photo"),
    altField("heroImageAlt"),
    defineField({name: "heroEyebrow", title: "Small title", type: "string"}),
    defineField({name: "heroTitle", title: "Main heading", type: "string"}),
    defineField({name: "heroIntro", title: "Introduction", type: "text", rows: 3}),
    defineField({
      name: "sections",
      title: "Policy sections",
      type: "array",
      of: [defineArrayMember({type: "policyBlock"})]
    })
  ],
  preview: {select: {title: "heroTitle", media: "heroImage"}}
});
