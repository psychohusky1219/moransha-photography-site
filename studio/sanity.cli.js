import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '843m1n6c',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production'
  }
})
