#!/usr/bin/env node
import { generateCRUD } from "../src/generator.js";
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const command = args[0];
const CONFIG_FILE = "readycrud.config.json";

if (command === "init") {
    const configContent = {
        controllersPath: "./src/controllers",
        routesPath: "./src/routes",
    };

    if (fs.existsSync(CONFIG_FILE)) {
        console.log("⚠️  Config file already exists!");
    } else {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(configContent, null, 2));
        console.log("✅ readycrud.config.json created successfully!");
        console.log(`📁 Controller path: ${configContent.controllersPath}`);
        console.log(`📁 Route path: ${configContent.routesPath}`);
    }
    process.exit(0);
}

if (!command) {
    console.error("❌ Please provide a schema path.\nExample:\n npx ready-crud ./src/models/client.model.js");
    process.exit(1);
}

generateCRUD({ schemaPath: command });
