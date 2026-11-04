import {defineType, defineField} from 'sanity'
import {bibleBooks} from '../data/bibleBooks'
import ScriptureNumberInput from '../components/scripture/ScriptureNumberInput'

export const scriptureReferenceType = defineType({
  name: 'scriptureReference',
  title: 'Scripture Reference',
  type: 'object',
  fields: [
    defineField({
      name: 'book',
      title: 'Book',
      type: 'string',
      options: {
        list: bibleBooks.map((book) => ({
          title: book.name,
          value: book.id,
        })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startChapter',
      title: 'Starting Chapter',
      type: 'number',
      components: {
        input: ScriptureNumberInput,
      },
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(1)
          .custom((chapter, context) => {
            const parent = context.parent as {
              book?: string
            }

            if (chapter === undefined || !parent?.book) {
              return true
            }

            const book = bibleBooks.find((book) => book.id === parent.book)

            if (!book) {
              return 'Please select a valid Bible book'
            }

            if (chapter > book.versesPerChapter.length) {
              return `${book.name} has only ${book.versesPerChapter.length} chapters`
            }

            return true
          }),
    }),
    defineField({
      name: 'startVerse',
      title: 'Starting Verse',
      type: 'number',
      validation: (Rule) =>
        Rule.integer()
          .min(1)
          .custom((verse, context) => {
            const parent = context.parent as {
              book?: string
              startChapter?: number
            }

            if (verse === undefined) {
              return true
            }

            const book = bibleBooks.find((book) => book.id === parent?.book)

            if (!book) {
              return 'Please select a valid Bible book'
            }

            if (parent.startChapter === undefined) {
              return true
            }

            const maxVerses = book.versesPerChapter[parent.startChapter - 1]

            if (maxVerses === undefined) {
              return true
            }

            if (verse > maxVerses) {
              return `${book.name} chapter ${parent.startChapter} has only ${maxVerses} verses`
            }

            return true
          }),
    }),
    defineField({
      name: 'endChapter',
      title: 'Ending Chapter',
      type: 'number',
      validation: (Rule) =>
        Rule.integer()
          .min(1)
          .custom((chapter, context) => {
            const parent = context.parent as {
              book?: string
            }

            if (chapter === undefined) {
              return true
            }

            const book = bibleBooks.find((book) => book.id === parent?.book)

            if (!book) {
              return 'Please select a valid Bible book'
            }

            if (chapter > book.versesPerChapter.length) {
              return `${book.name} has only ${book.versesPerChapter.length} chapters`
            }

            return true
          }),
    }),
    defineField({
      name: 'endVerse',
      title: 'Ending Verse',
      type: 'number',
      validation: (Rule) =>
        Rule.integer()
          .min(1)
          .custom((verse, context) => {
            const parent = context.parent as {
              book?: string
              startChapter?: number
              endChapter?: number
            }

            if (verse === undefined) {
              return true
            }

            const book = bibleBooks.find((book) => book.id === parent?.book)

            if (!book) {
              return 'Please select a valid Bible book'
            }

            const chapter = parent.endChapter ?? parent.startChapter

            if (chapter === undefined) {
              return true
            }

            const maxVerses = book.versesPerChapter[chapter - 1]

            if (maxVerses === undefined) {
              return true
            }

            if (verse > maxVerses) {
              return `${book.name} chapter ${chapter} has only ${maxVerses} verses`
            }

            return true
          }),
    }),
  ],
  validation: (Rule) =>
    Rule.custom((reference) => {
      if (!reference) return true

      const {
        startChapter,
        startVerse,
        endChapter,
        endVerse
      } = reference

      if (startChapter == null) return true

      const lastChapter = endChapter ?? startChapter

      if (lastChapter < startChapter) {
        return 'Ending chapter cannot be before starting chapter'
      }

      if (endVerse != null && startVerse == null) {
        return 'Starting verse is required when an ending verse is provided'
      }

      if (
        endVerse != null &&
        startVerse != null &&
        lastChapter === startChapter &&
        endVerse < startVerse
      ) {
        return 'Ending verse cannot be before starting verse'
      }

      if (
        endChapter != null &&
        startVerse != null &&
        endVerse == null
      ) {
        return 'Ending verse is required for a passage spanning chapters'
      }

      return true
    })
})
