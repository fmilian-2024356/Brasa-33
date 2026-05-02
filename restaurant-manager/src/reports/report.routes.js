import { Router } from 'express';
import {
  getTotalRevenue,
  getSalesByDate,
  getTopProducts,
  getOrdersByStatus,
  getReservationsReport,
} from './report.controller.js';

const router = Router();

router.get('/total-revenue', getTotalRevenue);
router.get('/sales-by-date', getSalesByDate);
router.get('/top-products', getTopProducts);
router.get('/orders-by-status', getOrdersByStatus);
router.get('/reservations-report', getReservationsReport);

export default router;
