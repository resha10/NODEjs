import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: [String], required: true }, // bullet points
  price: { type: Number, required: true },
  offerPrice: { type: Number },
  images: { type: [String], required: true },
  category: { 
    type: String, 
    enum: ['Clothing', 'Accessories', 'Equipment', 'Supplements', 'Footwear'], 
    required: true 
  },
  brand: { type: String, trim: true },
  size: { type: [String] }, // ['S', 'M', 'L', 'XL']
  color: { type: String },
  material: { type: String },
  gender: { type: String, enum: ['Men', 'Women', 'Unisex'] },
  stock: { type: Number, default: 0 }, // available stock
  isFeatured: { type: Boolean, default: false },
  rating: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
  tags: { type: [String] } 
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
