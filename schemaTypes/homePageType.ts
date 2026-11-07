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
    },
  },
  fields: [
    defineField({
      name: 'featuredMessage',
      title: 'Featured Message',
      type: 'reference',
      to: [{type: 'message'}],
    }),
    defineField({
      name: 'featuredFormat',
      title: 'Featured Message Format',
      type: 'string',
      options: {
        list: [
          {title: 'Audio', value: 'audio'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'audio',
      validation: (rule) =>
        rule.required().custom(async (format, context) => {
          const document = context.document
          const reference = document?.featuredMessage as {_ref?: string} | undefined

          if (!reference?._ref) {
            return true
          }

          const client = context.getClient({apiVersion: '2026-11-05'})

          const message = await client.fetch<{
            hasAudio: boolean
            videoUrl?: string
          } | null>(
            `*[_id == $id][0]{
        "hasAudio": defined(audio.asset),
        videoUrl
      }`,
            {id: reference._ref},
            {perspective: 'previewDrafts'},
          )

          if (!message) {
            return 'The selected Featured Message could not be found.'
          }

          if (format === 'audio' && !message.hasAudio) {
            return 'The selected Message does not have an audio recording.'
          }

          if (format === 'video' && !message.videoUrl?.trim()) {
            return 'The selected Message does not have a video URL.'
          }

          return true
        }),
    }),
  ],
})
