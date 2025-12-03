import express from 'express';
import { upload } from '../Configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { 
  addProduct, 
  toggleStock, 
  getProductById, 
  getProducts, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productController.js';

const productRoute = express.Router();

// Add product
productRoute.post('/add', authSeller, upload.array("images"), addProduct);

// List all products
productRoute.get('/list', getProducts);

// Get product by id
productRoute.get('/id', getProductById);

// Toggle stock
productRoute.post('/stock', authSeller, toggleStock);

// Update product ✅ fixed: include upload middleware
productRoute.put('/update/:id', authSeller, upload.array("images"), updateProduct);

// Delete product
productRoute.delete('/delete/:id', authSeller, deleteProduct);

export default productRoute;
