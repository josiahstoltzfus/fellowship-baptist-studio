import {defineType, defineField} from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      }
    }
  },
  fields: [
    defineField({
      name: 'featuredMessage',
      title: 'Featured Message',
      type: 'reference',
      to: [{type: 'message'}],
    }),
  ],
})
