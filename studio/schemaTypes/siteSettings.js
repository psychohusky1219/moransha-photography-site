import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'businessName', title: 'Business name', type: 'string'}),
    defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true}
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'string'})
          ]
        }
      ]
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'})
          ]
        }
      ]
    })
  ]
})
