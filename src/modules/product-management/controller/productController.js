const Product = require("../models/Product");
const Category = require("../models/Category");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { sku, name, description, image_path, category_id, price } = req.body;
    if (!sku || !name || !description || !category_id || !price) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    console.log("Dados recebido: ", {
      sku,
      name,
      description,
      image_path,
      category_id,
      price,
    });

    const categoryExists = await Category.findById(category_id);
    if (!categoryExists) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    const existingProduct = await Product.findBySku(sku);
    if (existingProduct) {
      return res
        .status(409)
        .json({ message: "SKU já está em uso por outro produto" });
    }

    const newProduct = await Product.create({
      sku,
      name,
      description,
      image_path,
      category_id,
      price,
    });
    res.status(201).json({
      message: "Produto criado com sucesso",
      product: newProduct,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sku, name, description, category_id, price } = req.body;

    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    if (category_id) {
      const categoryExists = await Category.findById(category_id);
      if (!categoryExists) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }
    }

    if (sku && sku !== existingProduct.sku) {
      const skuExists = await Product.findBySku(sku);
      if (skuExists) {
        return res.status(409).json({ message: "SKU já está em uso" });
      }
    }

    const updated = await Product.update(id, {
      sku: sku || existingProduct.sku,
      name: name || existingProduct.name,
      description: description || existingProduct.description,
      category_id: category_id || existingProduct.category_id,
      price: price || existingProduct.price,
    });

    if (!updated) {
      return res.status(400).json({ message: "Falha ao utilizar produto" });
    }

    res.json({ message: "Produto atualizado com sucesso" });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Product.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.json({ message: "Produto excluído com sucesso" });
  } catch (err) {
    next(err);
  }
};
