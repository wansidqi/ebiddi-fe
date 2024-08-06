import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = process.cwd();

export const ENTITY = {
  description: "Generate an entity",
  prompts: [
    {
      type: "list",
      name: "entity",
      message: "Select the entity type:",
      choices: [
        { name: "Interface", value: "interface" },
        { name: "Type", value: "type" },
        { name: "Enum", value: "enum" },
      ],
    },
    {
      type: "input",
      name: "name",
      message: (answers) => `Enter the name for your ${answers.entity}:`,
      validate: (value) => {
        if (/.+/.test(value)) {
          return true;
        }
        return `${value} is required`;
      },
    },
  ],
  actions: (data) => {
    const { entity, name } = data;
    const entityLowerCase = entity.toLowerCase();

    return [
      {
        type: "add",
        path: path.resolve(projectRoot, `src/${entityLowerCase}s/index.ts`),
        template: "",
        skipIfExists: true,
      },
      {
        type: "add",
        path: path.resolve(
          projectRoot,
          `src/${entityLowerCase}s/{{toCamelCase name}}.${entityLowerCase}.ts`
        ),
        templateFile: path.resolve(
          __dirname,
          `../templates/${entityLowerCase}.hbs`
        ),
        abortOnFail: true,
      },
      {
        type: "append",
        path: path.resolve(projectRoot, `src/${entityLowerCase}s/index.ts`),
        template: `export * from "./{{toCamelCase name}}.${entityLowerCase}";`,
      },
    ];
  },
};
