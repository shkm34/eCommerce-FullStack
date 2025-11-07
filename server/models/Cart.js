import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}, { 
  timestamps: true 
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'guest-user-001' // Mock user Id
  },
  items: [cartItemSchema],
  subTotal: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
