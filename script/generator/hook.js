import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = process.cwd();

export const HOOK = {
  description: "Generate a new TypeScript custom hook",
  prompts: [
    {
      type: "input",
      name: "hook",
      message: "Enter the name for your hook:",
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
      path: path.resolve(projectRoot, `src/hook/index.ts`),
      template: "",
      skipIfExists: true,
    },
    //create file
    {
      type: "add",
      path: path.resolve(projectRoot, "src/hook/{{toCamelCase hook}}.tsx"),
      templateFile: path.resolve(__dirname, "../templates/hook.hbs"),
      abortOnFail: true,
    },
    //append to index
    {
      type: "append",
      path: path.resolve(projectRoot, `src/hook/index.ts`),
      template: `export * from "./{{toCamelCase hook}}";`,
    },
  ],
};
