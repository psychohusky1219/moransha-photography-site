import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Page URL slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'pageType',
      title: 'Page type',
      type: 'string',
      options: {
        list: [
          {title: 'Home', value: 'home'},
          {title: 'About', value: 'about'},
          {title: 'Food Photography', value: 'food'},
          {title: 'Real Estate', value: 'realEstate'},
          {title: 'Policy', value: 'policy'},
          {title: 'Custom Page', value: 'custom'}
        ]
      }
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero small title',
      type: 'string'
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero headline',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'heroText',
      title: 'Hero intro text',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'sections',
      title: 'Page sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'eyebrow', title: 'Small title', type: 'string'}),
            defineField({name: 'heading', title: 'Heading', type: 'text', rows: 2}),
            defineField({name: 'body', title: 'Body text', type: 'text', rows: 5}),
            defineField({
              name: 'image',
              title: 'Section image',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})]
            }),
            defineField({name: 'buttonLabel', title: 'Button label', type: 'string'}),
            defineField({name: 'buttonUrl', title: 'Button link', type: 'string'})
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'eyebrow',
              media: 'image'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string'
            })
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'heroImage'
    }
  }
})
