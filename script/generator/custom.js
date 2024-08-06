import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = process.cwd();

export const CUSTOM = {
  description: "Generate a new TypeScript custom",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Enter the name for your custom:",
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }
        return "name is required";
      },
    },
  ],
  actions: [
    //create index (if not exist)
    {
      type: "add",
      path: path.resolve(projectRoot, `src/custom/index.ts`),
      template: "",
      skipIfExists: true,
    },
    //create file
    {
      type: "add",
      path: path.resolve(projectRoot, "src/custom/{{toCamelCase name}}.ts"),
      templateFile: path.resolve(__dirname, "../templates/custom.hbs"),
      abortOnFail: true,
    },
    //append to index
    {
      type: "append",
      path: path.resolve(projectRoot, `src/custom/index.ts`),
      template: `export * from "./{{toCamelCase name}}.custom";`,
    },
  ],
};
