const { ProductImg } = require('../models');

// Handle GET all images
exports.getAll = async (req, res) => {
  try {
    const images = await ProductImg.findAll();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle GET images by product
exports.getByProduct = async (req, res) => {
  try {
    const images = await ProductImg.findAll({ where: { product_id: req.params.productId } });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
    try {
      const { product_id, is_featured } = req.body;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No image uploaded' });
      }

      const images = await Promise.all(req.files.map(file =>
        ProductImg.create({
          img_url: file.path, // Cloudinary gives the full URL
          product_id,
          is_featured: is_featured === 'true' // optional: parse string to boolean
        })
      ));

      res.status(201).json(images);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Handle DELETE image
exports.delete = async (req, res) => {
  try {
    const deleted = await ProductImg.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Image not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
