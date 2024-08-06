import path from "path";
import { fileURLToPath } from "url";
import { getFilesList } from "../../plopfile.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = process.cwd();

export const SERVICE = {
  description: "Generate react query API service",
  prompts: async (inq) => {
    const naming = await inq.prompt([
      {
        type: "confirm",
        name: "isCreated",
        message: "Do you want to create a new file?",
        default: false,
      },
      {
        type: "input",
        name: "file",
        message: "Enter file name:",
        when: (answers) => answers.isCreated,
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "File name is required";
        },
      },
      {
        type: "list",
        name: "file",
        message: "Choose your file:",
        choices: getFilesList("services", ["index", "datasource"]),
        when: (answers) => !answers.isCreated,
      },
      {
        type: "input",
        name: "service",
        message: "Enter service name:",
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "Service name is required";
        },
      },
      {
        type: "input",
        name: "url",
        message: "Enter API endpoint:",
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "url name is required";
        },
      },
      {
        type: "list",
        name: "method",
        message: "Choose your file:",
        choices: ["get", "post", "patch", "put", "delete"],
      },
      {
        type: "input",
        name: "queryKey",
        message: "Enter query key for the service:",
        when: (answers) => answers.method === "get",
        validate: (value) => {
          if (/.+/.test(value)) {
            return true;
          }
          return "Query key is required";
        },
      },
    ]);
    return {
      file: naming.file,
      service: naming.service,
      method: naming.method,
      queryKey: naming.queryKey,
      url: naming.url,
    };
  },

  actions: [
    {
      type: "add",
      path: path.resolve(projectRoot, `src/services/datasource.ts`),
      templateFile: path.resolve(__dirname, "../templates/datasource.hbs"),
      skipIfExists: true,
    },
    {
      type: "add",
      path: path.resolve(projectRoot, `src/services/index.ts`),
      templateFile: path.resolve(__dirname, "../templates/service.index.hbs"),
      skipIfExists: true,
    },
    {
      type: "add",
      path: path.resolve(projectRoot, "src/services/{{toCamelCase file}}.ts"),
      template: `//IMPORT
import { datasource } from "./datasource";
import { QUERY_KEY } from ".";

//serviceFn
export const {{toPascalCase file}}Services = {
//serviceObj
};
      `,
      skipIfExists: true,
      abortOnFail: true,
    },
    {
      type: "append" /* import useQuery */,
      path: path.resolve(projectRoot, `src/services/{{file}}.ts`),
      pattern: `//IMPORT`,
      template: `import { useQuery } from "@tanstack/react-query";`,
      skip: (data) => {
        if (data.method !== "get") {
          return "Skipping add query Key";
        }
      },
    },
    {
      type: "append" /* create useQuery */,
      path: path.resolve(projectRoot, `src/services/{{file}}.ts`),
      pattern: `//serviceFn`,
      templateFile: path.resolve(__dirname, "../templates/useQuery.hbs"),
      skip: (data) => {
        if (data.method !== "get") {
          return "Skipping add query Key";
        }
      },
    },
    {
      type: "append" /* import useMutation */,
      path: path.resolve(projectRoot, `src/services/{{file}}.ts`),
      pattern: `//IMPORT`,
      template: `import { useMutation } from "@tanstack/react-query";`,
      skip: (data) => {
        if (data.method === "get") {
          return "Skipping add query Key";
        }
      },
    },
    {
      type: "append" /* create useMutation */,
      path: path.resolve(projectRoot, `src/services/{{file}}.ts`),
      pattern: `//serviceFn`,
      templateFile: path.resolve(__dirname, "../templates/useMutation.hbs"),
      skip: (data) => {
        if (data.method === "get") {
          return "Skipping add query Key";
        }
      },
    },
    {
      type: "append" /* export service in file */,
      path: path.resolve(projectRoot, `src/services/{{file}}.ts`),
      pattern: `//serviceObj`,
      template: `  use{{ toPascalCase service }},`,
    },

    {
      type: "append" /* import */,
      path: path.resolve(projectRoot, `src/services/index.ts`),
      pattern: `//IMPORT`,
      template: `import { {{toPascalCase file}}Services } from "./{{ file }}";`,
    },
    {
      type: "append" /* KEY */,
      path: path.resolve(projectRoot, `src/services/index.ts`),
      pattern: `//QUERY KEY`,
      template: `  {{ queryKey }} = "{{queryKey}}",`,
      skip: (data) => {
        if (data.method !== "get") {
          return "Skipping add query Key";
        }
      },
    },
    {
      type: "append" /* spread object */,
      path: path.resolve(projectRoot, `src/services/index.ts`),
      pattern: `//SERVICES`,
      template: `  ...{{toPascalCase file}}Services,`,
    },
  ],
};
