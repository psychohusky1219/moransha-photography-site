import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {visionTool} from "@sanity/vision";
import {schemaTypes} from "./schemaTypes/index.js";
import {structure, singletonTypes} from "./structure.js";
import {setupTool} from "./SetupTool.jsx";

export default defineConfig({
  name: "moranshaPhotography",
  title: "MoranSha Website Editor",
  projectId: "843m1n6c",
  dataset: "production",
  plugins: [structureTool({name: "content", title: "Content", structure}), visionTool()],
  tools: (previousTools) => [setupTool, ...previousTools],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType))
  },
  document: {
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(({action}) => action !== "delete" && action !== "duplicate")
        : actions
  }
});
