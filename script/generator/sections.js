import path from "path";
import { fileURLToPath } from "url";
import { getFoldersList } from "../../plopfile.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = process.cwd();

export const SECTIONS = {
  description: "Generate a new react component",
  prompts: async (inquirer) => {
    const folders = getFoldersList("sections");
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
      folder: folderName,
      component: componentName.componentName,
      createNewFolder: createNewFolder,
    };
  },
  actions: [
    {
      type: "add",
      path: path.resolve(projectRoot, `src/sections/index.ts`),
      template: "",
      skipIfExists: true,
    },
    {
      type: "add",
      path: path.resolve(
        projectRoot,
        `src/sections/{{folder}}/{{toPascalCase component}}.tsx`
      ),
      templateFile: path.resolve(__dirname, "../templates/component.hbs"),
      abortOnFail: true,
    },
    {
      type: "append",
      path: path.resolve(projectRoot, `src/sections/index.ts`),
      template: `export * from "./{{folder}}/{{toPascalCase component}}";`,
    },
  ],
};
