import { Router } from 'express';
import {
  createPayment,
  getPayments,
  getMyPayments,
  getPaymentById,
} from './payment.controller.js';
import { validateJwt } from '../middlewares/validateJwt.js';

const router = Router();

router.post('/', validateJwt, createPayment);
router.get('/', getPayments);
router.get('/my-payments', validateJwt, getMyPayments);
router.get('/:id', getPaymentById);

export default router;
