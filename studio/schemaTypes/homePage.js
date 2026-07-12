import {defineField, defineType} from "sanity";
import {altField, cardArrayField, imageField} from "./shared.js";

export const homePage = defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  groups: [
    {name: "hero", title: "Top banner"},
    {name: "features", title: "Featured services"},
    {name: "story", title: "Studio story"},
    {name: "approach", title: "Studio approach"},
    {name: "seo", title: "Search settings"}
  ],
  fields: [
    defineField({name: "seoTitle", title: "Browser title", type: "string", group: "seo"}),
    defineField({name: "seoDescription", title: "Search description", type: "text", rows: 3, group: "seo"}),
    imageField("heroImage", "Top banner photo"),
    altField("heroImageAlt"),
    defineField({name: "heroTitle", title: "Main heading", type: "string", group: "hero"}),
    defineField({name: "heroTagline", title: "Tagline", type: "string", group: "hero"}),
    imageField("foodImage", "Food service photo"),
    altField("foodImageAlt"),
    defineField({name: "foodTitle", title: "Food service heading", type: "string", group: "features"}),
    defineField({name: "foodButtonLabel", title: "Food button label", type: "string", group: "features"}),
    imageField("realEstateImage", "Real estate service photo"),
    altField("realEstateImageAlt"),
    defineField({name: "realEstateTitle", title: "Real estate heading", type: "string", group: "features"}),
    defineField({name: "realEstateButtonLabel", title: "Real estate button label", type: "string", group: "features"}),
    defineField({name: "storyTitle", title: "Heading", type: "string", group: "story"}),
    defineField({name: "storyText", title: "Text", type: "text", rows: 3, group: "story"}),
    defineField({name: "storyButtonLabel", title: "Button label", type: "string", group: "story"}),
    defineField({name: "approachEyebrow", title: "Small title", type: "string", group: "approach"}),
    defineField({name: "approachTitle", title: "Heading", type: "string", group: "approach"}),
    cardArrayField("approachItems", "Approach items", "Drag items to change their order.")
  ],
  preview: {prepare: () => ({title: "Home"})}
});
