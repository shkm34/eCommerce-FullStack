import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    trim: true
  },
  thumbnail: {
    type: String,
  },
  stock: {
    type: Number,
    default: 100,
    min: [0, 'Stock cannot be negative']
  }
}, { 
  timestamps: true 
});

const Product = mongoose.model('Product', productSchema);

export default Product;
