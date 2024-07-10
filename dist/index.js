#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// index.ts
var import_node_path2 = __toESM(require("path"));
var import_node_url = require("url");
var import_picocolors = __toESM(require("picocolors"));

// utils/helpers/getArguments.ts
var import_yargs = __toESM(require("yargs"));
var import_helpers = require("yargs/helpers");
async function getArguments() {
  const args = await (0, import_yargs.default)((0, import_helpers.hideBin)(process.argv)).options({
    name: {
      alias: "n",
      type: "string",
      description: "Name of the project"
    },
    template: {
      alias: "t",
      type: "string",
      description: "Template to use"
    }
  }).argv;
  const overriddenArgs = { ...args };
  return overriddenArgs;
}
var getArguments_default = getArguments;

// utils/helpers/getProjectInfo.ts
var import_prompts = __toESM(require("prompts"));

// utils/constants/templates.ts
var TEMPLATES = [
  {
    title: "React (vite) + ESLint + TypeScript + Tailwind",
    value: "react-eslint-ts-tw"
  },
  {
    title: "Next.js + ESLint + TypeScript + Tailwind",
    value: "next-eslint-ts-tw"
  },
  {
    title: "Node.js + Expres + ESLint + TypeScript",
    value: "node-express-eslint-ts"
  },
  {
    title: "Node.js + Expres + ESLint + TypeScript + Sequelize",
    value: "node-express-eslint-ts-sequelize"
  },
  {
    title: "Node.js + Nest.js + GraphQL + ESLint + TypeScript + Sequelize",
    value: "node-nest-graphql-ts-sequelize"
  }
];
var templates_default = TEMPLATES;

// utils/helpers/getProjectInfo.ts
async function getProjectInfo(initialName, initialProject) {
  return (0, import_prompts.default)([
    {
      type: "text",
      name: "name",
      message: "What is the name of your project?",
      initial: initialName || "medina-project-name",
      validate: (value) => {
        if (value.match(/[^a-zA-Z0-9-_]+/g))
          return "Project name can only contain letters, numbers, dashes and underscores";
        return true;
      }
    },
    {
      type: "select",
      name: "template",
      message: `Which template would you like to use?`,
      initial: initialProject || 0,
      choices: templates_default
    }
  ]);
}
var getProjectInfo_default = getProjectInfo;

// utils/helpers/copyFiles.ts
var import_promises = require("fs/promises");
var import_node_path = __toESM(require("path"));
async function copyFiles(template, destination) {
  await (0, import_promises.cp)(import_node_path.default.join(template, "project"), destination, { recursive: true });
}
var copyFiles_default = copyFiles;

// utils/helpers/replaceTokens.ts
var import_promises2 = require("fs/promises");
var import_glob = require("glob");
async function replaceTokens(destination, projectName) {
  const files = await (0, import_glob.glob)(`**/*`, { nodir: true, cwd: destination, absolute: true });
  for await (const file of files) {
    const data = await (0, import_promises2.readFile)(file, "utf8");
    const draft = data.replace(/{{name}}/g, projectName);
    await (0, import_promises2.writeFile)(file, draft, "utf8");
  }
}
var replaceTokens_default = replaceTokens;

// index.ts
async function main() {
  const args = await getArguments_default();
  const initialName = args._[0];
  const initialProject = args._[1];
  const project = await getProjectInfo_default(initialName, initialProject);
  if (!project.name || !project.template || !project.template.length) {
    console.log("\n \u{1F6A8} Exiting... ");
    process.exit(1);
  }
  const template = import_node_path2.default.join(
    import_node_path2.default.dirname((0, import_node_url.fileURLToPath)(importMetaUrl)),
    "templates",
    project.template
  );
  const destination = import_node_path2.default.join(process.cwd(), project.name);
  await copyFiles_default(template, destination);
  await replaceTokens_default(destination, project.name);
  console.log("\n\u2728 Project created \u2728");
  console.log(`
${import_picocolors.default.yellow(`Next steps:`)}
`);
  console.log(`${import_picocolors.default.green(`cd`)} ${project.name}`);
  console.log(`${import_picocolors.default.green(`npm`)} install`);
  console.log(`${import_picocolors.default.green(`npm`)} dev`);
  console.log("\n---\n");
  console.log(
    `Questions \u{1F440}? ${import_picocolors.default.underline(import_picocolors.default.cyan("https://www.linkedin.com/in/carlosmedina06/"))}`
  );
}
main().catch((error) => {
  console.error("\n\u{1F6A8} An error occurred: ", error);
  process.exit(1);
});
//# sourceMappingURL=index.js.map