import { Router } from 'express';
import {
  createReservation,
  getReservations,
  getMyReservations,
  getReservationById,
  cancelReservation,
  completeReservation,
} from './reservation.controller.js';
import { validateJwt } from '../middlewares/validateJwt.js';

const router = Router();

router.post('/', validateJwt, createReservation);
router.get('/', getReservations);
router.get('/my-reservations', validateJwt, getMyReservations);
router.get('/:id', getReservationById);
router.patch('/:id/cancel', validateJwt, cancelReservation);
router.patch('/:id/complete', validateJwt, completeReservation);

export default router;
