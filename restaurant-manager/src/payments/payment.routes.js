import { Router } from 'express';
import {
  createPayment,
  getPayments,
  getMyPayments,
  getPaymentById,
} from './payment.controller.js';
import { validateJwt } from '../middlewares/validateJwt.js';

const router = Router();

/**
 * @swagger
 * /brasa33/v1/payments:
 *   post:
 *     summary: Crear nuevo pago
 *     description: Registra un nuevo pago para una orden. Requiere autenticación JWT. El user_id se obtiene del token.
 *     tags:
 *       - Pagos
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - amount
 *               - method
 *             properties:
 *               order_id:
 *                 type: integer
 *                 example: 101
 *               amount:
 *                 type: number
 *                 format: decimal
 *                 example: 150.50
 *               method:
 *                 type: string
 *                 enum: ['credit_card', 'debit_card', 'cash', 'digital_wallet']
 *                 example: credit_card
 *     responses:
 *       201:
 *         description: Pago registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', validateJwt, createPayment);

/**
 * @swagger
 * /brasa33/v1/payments:
 *   get:
 *     summary: Obtener todos los pagos
 *     description: Retorna una lista de todos los pagos registrados en el sistema (admin).
 *     tags:
 *       - Pagos
 *     responses:
 *       200:
 *         description: Lista de pagos obtenida exitosamente
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
 *                     $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getPayments);

/**
 * @swagger
 * /brasa33/v1/payments/my-payments:
 *   get:
 *     summary: Obtener mis pagos
 *     description: Retorna todos los pagos realizados por el usuario autenticado. Requiere JWT.
 *     tags:
 *       - Pagos
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Pagos del usuario obtenidos exitosamente
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
 *                     $ref: '#/components/schemas/Payment'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/my-payments', validateJwt, getMyPayments);

/**
 * @swagger
 * /brasa33/v1/payments/{id}:
 *   get:
 *     summary: Obtener pago por ID
 *     description: Obtiene los detalles completos de un pago específico.
 *     tags:
 *       - Pagos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago
 *         example: 201
 *     responses:
 *       200:
 *         description: Pago obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Pago no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getPaymentById);

export default router;
