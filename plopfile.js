import fs from "fs-extra";
import path from "path";
import { COMPONENT } from "./script/generator/component.js";
import { SLICE } from "./script/generator/slice.js";
import { ENTITY } from "./script/generator/entity.js";
import { CONTEXT } from "./script/generator/context.js";
import { HOOK } from "./script/generator/hook.js";
import { SERVICE } from "./script/generator/service.js";
import { SECTIONS } from "./script/generator/sections.js";

const projectRoot = process.cwd();

export const getFoldersList = (folderName) => {
  const dir = path.resolve(projectRoot, `src/${folderName}`);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

export const getFilesList = (folderName, excludeNames = []) => {
  const dir = path.resolve(projectRoot, `src/${folderName}`);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => {
      if (!dirent.isFile()) return false;
      const nameWithoutExt = path.basename(
        dirent.name,
        path.extname(dirent.name)
      );
      return !excludeNames.includes(nameWithoutExt);
    })
    .map((dirent) => path.basename(dirent.name, path.extname(dirent.name)));
};

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

  // plop.setGenerator("component", COMPONENT);
  plop.setGenerator("component", SECTIONS);
  plop.setGenerator("entity", ENTITY);
  plop.setGenerator("slice", SLICE);
  plop.setGenerator("hook", HOOK);
  plop.setGenerator("context", CONTEXT);
  plop.setGenerator("service", SERVICE);
}
/* react-simplify-gen */
