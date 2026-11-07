import {defineType, defineField} from 'sanity'

export const meetThePastorType = defineType({
  name: 'meetThePastor',
  title: 'Meet the Pastor Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pastorImage',
      title: 'Pastor Photograph',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Meet the Pastor Page',
      }
    },
  },
})
