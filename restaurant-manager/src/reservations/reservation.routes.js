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

/**
 * @swagger
 * /brasa33/v1/reservations:
 *   post:
 *     summary: Crear nueva reservación
 *     description: Crea una nueva reservación de mesa. Requiere autenticación JWT. El user_id se obtiene del token.
 *     tags:
 *       - Reservaciones
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurant_id
 *               - guest_count
 *               - reservation_date
 *             properties:
 *               restaurant_id:
 *                 type: integer
 *                 example: 1
 *               guest_count:
 *                 type: integer
 *                 example: 4
 *               reservation_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-02-20T19:00:00Z
 *               special_requests:
 *                 type: string
 *                 example: Aniversario, decoración especial por favor
 *     responses:
 *       201:
 *         description: Reservación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', validateJwt, createReservation);

/**
 * @swagger
 * /brasa33/v1/reservations:
 *   get:
 *     summary: Obtener todas las reservaciones
 *     description: Retorna una lista de todas las reservaciones del sistema (admin).
 *     tags:
 *       - Reservaciones
 *     responses:
 *       200:
 *         description: Lista de reservaciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getReservations);

/**
 * @swagger
 * /brasa33/v1/reservations/my-reservations:
 *   get:
 *     summary: Obtener mis reservaciones
 *     description: Retorna todas las reservaciones del usuario autenticado. Requiere JWT.
 *     tags:
 *       - Reservaciones
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Reservaciones del usuario obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reservation'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/my-reservations', validateJwt, getMyReservations);

/**
 * @swagger
 * /brasa33/v1/reservations/{id}:
 *   get:
 *     summary: Obtener reservación por ID
 *     description: Obtiene los detalles completos de una reservación específica.
 *     tags:
 *       - Reservaciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reservación
 *         example: 301
 *     responses:
 *       200:
 *         description: Reservación obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getReservationById);

/**
 * @swagger
 * /brasa33/v1/reservations/{id}/cancel:
 *   patch:
 *     summary: Cancelar reservación
 *     description: Cancela una reservación existente. Requiere autenticación JWT.
 *     tags:
 *       - Reservaciones
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reservación a cancelar
 *         example: 301
 *     responses:
 *       200:
 *         description: Reservación cancelada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Reservation'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Reservación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/cancel', validateJwt, cancelReservation);

/**
 * @swagger
 * /brasa33/v1/reservations/{id}/complete:
 *   patch:
 *     summary: Completar reservación
 *     description: Marca una reservación como completada. Requiere autenticación JWT.
 *     tags:
 *       - Reservaciones
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reservación a completar
 *         example: 301
 *     responses:
 *       200:
 *         description: Reservación completada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Reservation'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Reservación no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id/complete', validateJwt, completeReservation);

export default router;
