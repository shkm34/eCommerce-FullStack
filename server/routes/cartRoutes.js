import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController.js';

const router = express.Router();

// Cart routes
router.post('/', addToCart);         
router.get('/', getCart);              
router.put('/:id', updateCartItem);   
router.delete('/:id', removeFromCart); 
router.delete('/', clearCart);         

export default router;
