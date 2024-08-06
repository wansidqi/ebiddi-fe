import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = process.cwd();

export const SLICE = {
  description: "Generate a new zustand slice",
  prompts: [
    {
      type: "input",
      name: "slice",
      message: "Enter the name for your slice:",
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
      path: path.resolve(projectRoot, `src/store/index.ts`),
      templateFile: path.resolve(__dirname, "../templates/zustand.index.hbs"),
      skipIfExists: true,
    },
    {
      type: "add",
      path: path.resolve(
        projectRoot,
        "src/store/slices/{{toCamelCase slice}}.slice.ts"
      ),
      templateFile: path.resolve(__dirname, "../templates/zustand.slice.hbs"),
      abortOnFail: true,
    },
    {
      type: "append",
      path: path.resolve(projectRoot, `src/store/index.ts`),
      pattern: /(type StateType = ResetAllSlices)/gi,
      template: `& {{toPascalCase slice}}Slice`,
    },
    {
      type: "append",
      path: path.resolve(projectRoot, `src/store/index.ts`),
      pattern: /import { create } from "zustand";/gi,
      template: `import { {{toPascalCase slice}}Slice, create{{toPascalCase slice}}Slice } from "./slices/{{slice}}.slice";`,
    },
    {
      type: "append",
      path: path.resolve(projectRoot, `src/store/index.ts`),
      pattern:
        /export\s+const\s+useBoundStore\s*=\s*create<StateType>\s*\(\)\s*\(.*\)\s*=>\s*\({/,
      template: `  ...create{{toPascalCase slice}}Slice(...a),`,
    },
  ],
};
