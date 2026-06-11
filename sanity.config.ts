import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import post from './sanity/schema/post'
import project from './sanity/schema/project'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'emreercan.org',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: [post, project],
  },
})
