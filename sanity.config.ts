import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import type {StructureResolver} from 'sanity/structure'

const singletonTypes = [
  'homePage',
  'ourStory',
  'meetThePastor',
]

const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.includes(item.getId() ?? ''),
      ),
      S.listItem()
        .title('Our Story')
        .id('ourStory')
        .child(S.document().schemaType('ourStory').documentId('ourStory')),
      S.listItem()
        .title('Meet the Pastor')
        .id('meetThePastor')
        .child(S.document().schemaType('meetThePastor').documentId('meetThePastor')),
    ])

export default defineConfig({
  name: 'default',
  title: 'Fellowship Baptist Church',

  projectId: 'l4i3zywx',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (templates) =>
      templates.filter((template) => !singletonTypes.includes(template.templateId)),
    actions: (actions, context) =>
      singletonTypes.includes(context.schemaType)
        ? actions.filter((action) => action.action !== 'duplicate' && action.action !== 'delete')
        : actions,
  },
})
