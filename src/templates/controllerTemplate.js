export const controllerTemplate = (modelName, className) => `
import { ${className} } from "../startup/models.js";

export const ${modelName}Controller = {
  async create(req, res) {
    try {
      const data = await ${className}.create(req.body);
      res.status(201).json({ success: true, message: "${className} created successfully", data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await ${className}.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ success: true, message: "${className} updated successfully", data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await ${className}.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "${className} deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await ${className}.findById(req.params.id);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await ${className}.find();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
`;
