import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import post from './schema/post';
import project from './schema/project';

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'dy9gt6gb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [post, project],
  },
});
