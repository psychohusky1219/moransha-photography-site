import {defineField, defineType} from 'sanity'

export const contactSettings = defineType({
  name: 'contactSettings',
  title: 'Contact form settings',
  type: 'document',
  fields: [
    defineField({name: 'introTitle', title: 'Intro title', type: 'string'}),
    defineField({name: 'introText', title: 'Intro text', type: 'text', rows: 3}),
    defineField({name: 'termsLabel', title: 'Terms checkbox label', type: 'string'}),
    defineField({name: 'termsUrl', title: 'Terms page URL', type: 'string'}),
    defineField({name: 'successMessage', title: 'Success message', type: 'string'})
  ]
})
