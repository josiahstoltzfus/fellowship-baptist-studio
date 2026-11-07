import {defineType, defineField} from 'sanity'

export const ourStoryType = defineType({
  name: 'ourStory',
  title: 'Our Story Page',
  type: 'document',
  fields: [
    defineField({
      name: 'churchImage',
      title: 'Church Photograph',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Our Story Page',
      }
    }
  }
})