import {defineType, defineField} from 'sanity'

export const messageType = defineType({
  name: 'message',
  title: 'Message',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scripture',
      title: 'Primary Scripture Passage',
      type: 'scriptureReference',
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{type: 'speaker'}],
      initialValue: {
        _ref: '983d63fa-653d-4cff-af94-9493f23b06da',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Message Type',
      type: 'string',
      initialValue: 'sermon',
      options: {
        list: [
          {title: 'Sermon', value: 'sermon'},
          {title: 'Teaching', value: 'teaching'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audio',
      title: 'Audio Recording',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: 'durationSeconds',
      title: 'Audio Duration (seconds)',
      type: 'number',
      description: 'The total length of the audio recording in seconds.',
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'videoUrl',
      title: 'YouTube Video URL',
      type: 'url',
    }),
    defineField({
      name: 'manuscript',
      title: 'Written Manuscript',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})