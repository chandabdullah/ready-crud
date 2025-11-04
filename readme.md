
## 🧱 **ready-crud**

![npm](https://img.shields.io/npm/v/ready-crud?color=blue\&logo=npm)
![Node](https://img.shields.io/badge/Node-18%2B-green?logo=node.js)
![License](https://img.shields.io/badge/license-MIT-orange)
![Platform](https://img.shields.io/badge/platform-Node.js-blue)

A lightweight and easy-to-use CLI tool to **auto-generate Express.js CRUD controllers and routes** from your Mongoose schema files — with configurable paths, minimal setup, and no external dependencies.

---

## 🚀 Installation

You can use `ready-crud` directly with **npx** (recommended):

```bash
npx ready-crud init
```

Or install it globally if you want to use it across multiple projects:

```bash
npm install -g ready-crud
```

---

## ⚙️ Initialization (One-Time Setup)

Before generating files, you need to initialize the package so it knows where to place your controllers and routes.

Run the init command in your project root:

```bash
npx ready-crud init
```

This creates a configuration file named:

```
readycrud.config.json
```

### Example Config:

```json
{
  "controllerPath": "./src/controllers",
  "routePath": "./src/routes"
}
```

After initialization, you’ll see a confirmation message:

```
✅ readycrud.config.json created successfully!
📁 Controller Path: ./src/controllers
📁 Route Path: ./src/routes
```

You can edit these paths anytime to match your project’s folder structure.

---

## 🛠️ Generate CRUD Files

Once the config is set, generate controller and route files by running:

```bash
npx ready-crud ./src/models/client.model.js
```

✅ This will:

* Read the `client.model.js` file
* Detect the model name (`client`)
* Create:

  * `client.controller.js` in your configured `controllers` path
  * `client.route.js` in your configured `routes` path

---

## 📁 Example Project Structure

Before running:

```
src/
  models/
    client.model.js
```

After running:

```
src/
  models/
    client.model.js
  controllers/
    client.controller.js
  routes/
    client.route.js
```

---

## 💡 Example Generated Code

### 🧩 Controller (`client.controller.js`)

```js
import { Client } from "../startup/models.js";

export const clientController = {
  async create(req, res) {
    try {
      const data = await Client.create(req.body);
      res.status(201).json({ success: true, message: "Client created successfully", data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ success: true, message: "Client updated successfully", data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await Client.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Client deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await Client.findById(req.params.id);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await Client.find();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
```

---

### 🛣️ Route (`client.route.js`)

```js
import { Router } from "express";
import { clientController } from "../controllers/client.controller.js";

const route = Router();

route.post("/", clientController.create);
route.patch("/:id", clientController.update);
route.delete("/:id", clientController.delete);
route.get("/:id", clientController.getById);
route.get("/", clientController.getAll);

export default route;
```

---

## 🧰 Commands Summary

| Command                                        | Description                                        |
| ---------------------------------------------- | -------------------------------------------------- |
| `npx ready-crud init`                          | Create config file with controller and route paths |
| `npx ready-crud ./src/models/example.model.js` | Generate controller and route for a given schema   |
| `npm install -g ready-crud`                    | (Optional) Install globally for CLI access         |

---

## 🧠 Troubleshooting

### ❌ No Config Found

If you run the generator without initializing:

```
❌ No readycrud.config.json found.
👉 Run: npx ready-crud init
```

### ⚠️ Schema File Not Found

If the path you provide doesn’t exist:

```
❌ Schema file not found at: ./src/models/client.model.js
```

---

## 💬 Example Workflow

```bash
# Step 1: Initialize (only once per project)
npx ready-crud init

# Step 2: Create a new model
touch src/models/task.model.js

# Step 3: Generate controller and route
npx ready-crud ./src/models/task.model.js
```

✅ Result:

```
✅ Controller created at: ./src/controllers/task.controller.js
✅ Route created at: ./src/routes/task.route.js
```

---

## ⚡ Features

* 🧩 Auto-generates **Express route & controller** boilerplate
* ⚙️ Customizable output paths via config file
* 🪶 **Zero dependencies** (works out-of-the-box)
* 💾 Safe file creation (won’t overwrite existing files)
* 📦 Works with **ES Modules (import/export)**

---

## 🧱 Use Cases

* Quickly scaffold new CRUD modules for Express projects
* Maintain consistent structure across multiple backends
* Speed up MVP and admin panel development
* Teach junior developers clean, modular structure

---

## 🧑‍💻 Author

**Abdullah – Next Level Software**
Building developer utilities and automation tools 🚀

📧 **Contact:** [LinkedIn](https://www.linkedin.com/in/chandabdullah21)
☕ **Support:** [Buy me a coffee](https://www.buymeacoffee.com/chandabdullah21)

---

## 🧾 License

MIT © 2025 Abdullah — Free to use, modify, and distribute.

