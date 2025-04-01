const Category = require("../models/Category");

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.json(category);
  } catch (err) {
    next(err);
  }
};

exports.getSubcategories = async (req, res, next) => {
  try {
    const subcategories = await Category.findByParentId(req.params.id);
    res.json(subcategories);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, image_path, parent_id } = req.body;
    const newCategory = await Category.create({ name, image_path, parent_id });
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { name, image_path, parent_id } = req.body;
    const updated = await Category.update(req.params.id, {
      name,
      image_path,
      parent_id,
    });
    if (!updated) {
      return res.status(404).json({ message: "Categories não encontrada" });
    }
    res.json({ message: "Categoria atualizada com sucesso" });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await Category.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.json({ message: "Categoria excluída com sucesso" });
  } catch (err) {
    next(err);
  }
};
