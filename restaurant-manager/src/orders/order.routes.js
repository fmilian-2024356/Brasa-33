import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  confirmOrder,
  updateOrderStatus,
  cancelOrder,
} from './order.controller.js';
import { validateJwt } from '../middlewares/validateJwt.js';

const router = Router();

router.post('/', validateJwt, createOrder);
router.get('/', getOrders);
router.get('/my-orders', validateJwt, getMyOrders);
router.get('/:id', getOrderById);
router.patch('/:id/confirm', validateJwt, confirmOrder);
router.patch('/:id/status', validateJwt, updateOrderStatus);
router.patch('/:id/cancel', validateJwt, cancelOrder);

export default router;
