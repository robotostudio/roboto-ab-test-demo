import { structureTool } from 'sanity/structure';
import { assist } from '@sanity/assist';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { iconPicker } from 'sanity-plugin-icon-picker';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './schemaTypes';
import { defaultDocumentNode, structure } from './structure';
import { abTest } from 'sanity-plugin-roboto-ab-test';

export default defineConfig({
  name: 'default',
  title: 'roboto-ab-test-studio',
  projectId: 'ts1zp4fu',
  dataset: 'production',
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    visionTool(),
    assist(),
    unsplashImageAsset(),
    abTest({
      schemaType: 'page',
    }),
    media(),
    iconPicker(),
  ],

  schema: {
    types: schemaTypes,
  },
});
