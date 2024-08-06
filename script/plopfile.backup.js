import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

// Convert import.meta.url to file path and get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = process.cwd(); // Gets the current working directory

export default function (plop) {
  const clearAndUpper = (text) => text.replace(/-/, "").toUpperCase();

  plop.setHelper("toPascalCase", (text) => {
    return text.replace(/(^\w|-\w)/g, clearAndUpper);
  });

  plop.setHelper("toCamelCase", (text) => {
    const pascalCase = text.replace(/(^\w|-\w)/g, clearAndUpper);
    return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);
  });

  plop.setHelper("toUpperCase", (text) => {
    return text.toUpperCase();
  });

  const getFoldersList = (folderName) => {
    const dir = path.resolve(projectRoot, `src/${folderName}`);

    // Check if directory exists, create if not
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Read directory and filter for subdirectories
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  };

  /// Generator for interface, type, and enum
  plop.setGenerator("entity", {
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
            `templates/${entityLowerCase}.hbs`
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
  });

  /// Generator for creating React components
  plop.setGenerator("component", {
    description: "Generate a new react component",
    prompts: async (inquirer) => {
      const folders = getFoldersList("components");
      const { createNewFolder, folderName } = await inquirer.prompt([
        {
          type: "confirm",
          name: "createNewFolder",
          message: "Do you want to create a new folder for your component?",
          default: true,
        },
        {
          type: "input",
          name: "folderName",
          message: "Enter the name for your folder:",
          when: (answers) => answers.createNewFolder,
          validate: (value) => {
            if (/.+/.test(value)) {
              return true;
            }
            return "Folder name is required";
          },
        },
        {
          type: "list",
          name: "folderName",
          message: "Choose the folder for your component:",
          choices: folders,
          when: (answers) => !answers.createNewFolder,
        },
      ]);

      const componentName = await inquirer.prompt({
        type: "input",
        name: "componentName",
        message: "Enter the name for your component:",
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "Component name is required";
        },
      });

      return {
        folder: createNewFolder ? folderName : folderName || folders[0],
        component: componentName.componentName,
        createNewFolder: createNewFolder,
      };
    },
    actions: [
      {
        type: "add",
        path: path.resolve(projectRoot, `src/components/index.ts`),
        template: "",
        skipIfExists: true,
      },
      {
        type: "add",
        path: path.resolve(
          projectRoot,
          `src/components/{{folder}}/{{toPascalCase component}}.tsx`
        ),
        templateFile: path.resolve(__dirname, "templates/component.hbs"),
        abortOnFail: true,
      },
      {
        type: "append",
        path: path.resolve(projectRoot, `src/components/index.ts`),
        template: `export * from "./{{folder}}/{{toPascalCase component}}";`,
      },
    ],
  });

  /// zustand slice
  plop.setGenerator("state", {
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
        templateFile: path.resolve(__dirname, "templates/zustand.index.hbs"),
        skipIfExists: true,
      },
      {
        type: "add",
        path: path.resolve(
          projectRoot,
          "src/store/slices/{{toCamelCase slice}}.slice.ts"
        ),
        templateFile: path.resolve(__dirname, "templates/zustand.slice.hbs"),
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
  });

  plop.setGenerator("interface", {
    description: "Generate a new TypeScript interface",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter the name for your interface:",
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
        path: path.resolve(projectRoot, `src/interfaces/index.ts`),
        template: "",
        skipIfExists: true,
      },
      //create file
      {
        type: "add",
        path: path.resolve(
          projectRoot,
          "src/interfaces/{{toCamelCase name}}.interface.ts"
        ),
        templateFile: path.resolve(__dirname, "templates/interface.hbs"),
        abortOnFail: true,
      },
      //append to index
      {
        type: "append",
        path: path.resolve(projectRoot, `src/interfaces/index.ts`),
        template: `export * from "./{{toCamelCase name}}.interface";`,
      },
    ],
  });
}
