import express from 'express';
import {
  processCheckout,
  getOrderById,
  getAllOrders
} from '../controllers/checkoutController.js';

const router = express.Router();

router.post('/', processCheckout);     
router.get('/', getAllOrders);           
router.get('/:orderId', getOrderById);   

export default router;
