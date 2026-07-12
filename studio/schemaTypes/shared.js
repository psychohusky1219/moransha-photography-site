import {defineArrayMember, defineField, defineType} from "sanity";

export const card = defineType({
  name: "card",
  title: "Content card",
  type: "object",
  fields: [
    defineField({name: "title", title: "Heading", type: "string", validation: (Rule) => Rule.required()}),
    defineField({name: "text", title: "Text", type: "text", rows: 3, validation: (Rule) => Rule.required()})
  ],
  preview: {select: {title: "title", subtitle: "text"}}
});

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery image",
  type: "image",
  options: {hotspot: true},
  fields: [
    defineField({
      name: "alt",
      title: "Image description",
      description: "Briefly describe the photo for accessibility and search engines.",
      type: "string",
      validation: (Rule) => Rule.required()
    })
  ]
});

export const policyBlock = defineType({
  name: "policyBlock",
  title: "Policy section",
  type: "object",
  fields: [
    defineField({name: "title", title: "Heading", type: "string", validation: (Rule) => Rule.required()}),
    defineField({name: "text", title: "Text", type: "text", rows: 5, validation: (Rule) => Rule.required()})
  ],
  preview: {select: {title: "title", subtitle: "text"}}
});

export const cardArrayField = (name, title, description) =>
  defineField({
    name,
    title,
    description,
    type: "array",
    of: [defineArrayMember({type: "card"})],
    validation: (Rule) => Rule.max(6)
  });

export const imageField = (name, title) =>
  defineField({name, title, type: "image", options: {hotspot: true}});

export const altField = (name, title = "Image description") =>
  defineField({name, title, type: "string"});
