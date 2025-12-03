import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/product.js';
import fs from 'fs';

// Add a new product (with images uploaded via multer)
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData || '{}');
    const images = req.files || [];

    if (!images.length) {
      return res.status(400).json({ success: false, message: 'No images uploaded' });
    }

    const imageUrls = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
        try { fs.unlinkSync(file.path); } catch (e) {}
        return result.secure_url;
      })
    );

    const newProduct = await Product.create({ ...productData, images: imageUrls });
    res.json({ success: true, message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('ADD PRODUCT ERROR:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update product: accepts multipart form with new image files under 'images' and
// an optional 'existingImages' JSON field containing URLs to keep.
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Build update object from allowed fields
    const allowed = ['name','category','price','offerPrice','material','dimensions','color','description','stock','brand','size','tags','isFeatured'];
    const update = {};
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body, key) && req.body[key] !== undefined) {
        update[key] = req.body[key];
      }
    }

    // Coerce numeric fields
    if (update.price) update.price = Number(update.price);
    if (update.offerPrice) update.offerPrice = Number(update.offerPrice);
    if (update.stock) update.stock = Number(update.stock);

    // Normalize description
    if (typeof update.description === 'string') {
      update.description = update.description.split('\n').map(s => s.trim()).filter(Boolean);
    }

    // Parse existingImages (JSON string expected)
    let existingImages = [];
    if (req.body.existingImages) {
      try {
        existingImages = JSON.parse(req.body.existingImages);
        if (!Array.isArray(existingImages)) existingImages = [];
      } catch (err) {
        existingImages = [];
      }
    }

    // DEBUG: log incoming files and existing images
    console.log(`UPDATE PRODUCT: id=${id} - incoming files count= ${req.files ? req.files.length : 0}`);
    console.log('UPDATE PRODUCT: existingImages=', existingImages);

    // Upload any new files to Cloudinary
    const files = req.files || [];
    const uploadedUrls = [];
    if (files.length) {
      const uploads = await Promise.all(files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
          try { fs.unlinkSync(file.path); } catch (e) {}
          console.log('UPLOAD SUCCESS:', result.secure_url);
          return result.secure_url;
        } catch (uploadErr) {
          console.error('CLOUDINARY UPLOAD ERROR for', file.path, uploadErr);
          return null;
        }
      }));
      // filter out any nulls from failed uploads
      uploadedUrls.push(...uploads.filter(Boolean));
      console.log('UPDATE PRODUCT: uploadedUrls=', uploadedUrls);
    }

    if (existingImages.length || uploadedUrls.length) {
      update.images = [...existingImages, ...uploadedUrls];
    }

    const updated = await Product.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Product not found' });

    res.json({ success: true, message: 'Product updated', product: updated });
  } catch (error) {
    console.error('UPDATE PRODUCT ERROR:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error('GET PRODUCTS ERROR:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    console.error('GET PRODUCT ERROR:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Toggle stock
export const toggleStock = async (req, res) => {
  try {
    const { id, stock } = req.body;
    const updated = await Product.findByIdAndUpdate(id, { stock }, { new: true });
    res.json({ success: true, message: 'Stock updated', product: updated });
  } catch (error) {
    console.error('TOGGLE STOCK ERROR:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('DELETE PRODUCT ERROR:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

