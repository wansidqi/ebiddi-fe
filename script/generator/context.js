import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = process.cwd();

export const CONTEXT = {
  description: "Generate a new react context and provider",
  prompts: [
    {
      type: "input",
      name: "context",
      message: "Enter the name for your context:",
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }
        return "name is required";
      },
    },
  ],
  actions: [
    {
      type: "add",
      path: path.resolve(projectRoot, `src/context/index.tsx`),
      templateFile: path.resolve(__dirname, "../templates/context.index.hbs"),
      skipIfExists: true,
    },
    {
      type: "add",
      path: path.resolve(
        projectRoot,
        "src/context/{{toCamelCase context}}.tsx"
      ),
      templateFile: path.resolve(__dirname, "../templates/context.hbs"),
      abortOnFail: true,
    },
    {
      type: "append",
      path: path.resolve(projectRoot, "src/context/index.tsx"),
      pattern: /import React from "react";/gi,
      template: `import { {{ toPascalCase context }}Provider, use{{ toPascalCase context }} } from "./{{ toCamelCase context }}";`,
    },
    {
      type: "append",
      path: path.resolve(projectRoot, "src/context/index.tsx"),
      pattern: /return {/gi,
      template: `    ...use{{ toPascalCase context }}(),`,
    },
    {
      type: "modify",
      path: path.resolve(projectRoot, "src/context/index.tsx"),
      pattern: /{props.children}/gi,
      template: `<{{ properCase context }}Provider> {props.children} </{{ properCase context }}Provider>`,
    },
  ],
};
