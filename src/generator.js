import fs from "fs";
import path from "path";
import { controllerTemplate } from "./templates/controllerTemplate.js";
import { routeTemplate } from "./templates/routeTemplate.js";

export const generateCRUD = async ({ schemaPath }) => {
  try {
    const absoluteSchemaPath = path.resolve(schemaPath);

    if (!fs.existsSync(absoluteSchemaPath)) {
      console.error(`❌ Schema file not found at: ${absoluteSchemaPath}`);
      process.exit(1);
    }

    // --- Read Config or Auto Detect ---
    let config = null;
    const configPath = path.resolve("readycrud.config.json");
    if (fs.existsSync(configPath)) {
      config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      console.log("⚙️ Using readycrud.config.json for paths...");
    } else {
      console.error("❌ No config file found (readycrud.config.json)");
      console.log("💡 Run `npx ready-crud init` to create a config file first.");
      process.exit(1);
      // console.log("⚙️ No config found, using default paths (auto-detected)");
      // config = {
      //   controllersPath: "./src/controllers",
      //   routesPath: "./src/routes",
      // };
    }

    // --- Model Details ---
    const fileName = path.basename(absoluteSchemaPath, ".js");
    const modelName = fileName.replace(".model", "");
    const className = modelName.charAt(0).toUpperCase() + modelName.slice(1);

    // --- Resolve Output Paths ---
    const controllerDir = path.resolve(config.controllersPath);
    const routesDir = path.resolve(config.routesPath);

    // --- Ensure folders exist ---
    if (!fs.existsSync(controllerDir)) fs.mkdirSync(controllerDir, { recursive: true });
    if (!fs.existsSync(routesDir)) fs.mkdirSync(routesDir, { recursive: true });

    const controllerPath = path.join(controllerDir, `${modelName}.controller.js`);
    const routePath = path.join(routesDir, `${modelName}.route.js`);

    // --- Generate Content ---
    const controllerContent = controllerTemplate(modelName, className);
    const routeContent = routeTemplate(modelName, className);

    // --- Write Files ---
    fs.writeFileSync(controllerPath, controllerContent);
    fs.writeFileSync(routePath, routeContent);

    console.log(`✅ Controller created at: ${controllerPath}`);
    console.log(`✅ Route created at: ${routePath}`);
  } catch (error) {
    console.error("❌ Error generating CRUD files:", error.message);
  }
};
