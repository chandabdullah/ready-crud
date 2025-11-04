#!/usr/bin/env node

import { generateCRUD } from "./generator.js";

const schemaPath = process.argv[2];

if (!schemaPath) {
    console.error("❌ Please provide a schema path.\nExample: npx ready-crud ./src/models/client.model.js");
    process.exit(1);
}

generateCRUD({ schemaPath });
