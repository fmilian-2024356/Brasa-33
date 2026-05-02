import {
  createPayment as createPaymentModel,
  getAllPayments,
  getPaymentById as getPaymentByIdModel,
  getPaymentsByUserId,
  getOrderById,
  updateOrderStatus,
  getPaymentByOrderId,
} from './payment.model.js';

const VALID_METHODS = ['card', 'cash', 'transfer'];
const VALID_STATUSES = ['pending', 'paid', 'failed'];

const validatePaymentPayload = (amount, method) => {
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    const error = new Error('El monto debe ser un número mayor a 0');
    error.status = 400;
    throw error;
  }

  if (!method || !VALID_METHODS.includes(method)) {
    const error = new Error(`Método de pago inválido. Métodos válidos: ${VALID_METHODS.join(', ')}`);
    error.status = 400;
    throw error;
  }
};

export const createPayment = async (userId, orderId, amount, method) => {
  if (!orderId) {
    const error = new Error('order_id es obligatorio');
    error.status = 400;
    throw error;
  }

  validatePaymentPayload(amount, method);

  // Validar que la orden exista
  const order = await getOrderById(orderId);
  if (!order) {
    const error = new Error('Orden no encontrada');
    error.status = 404;
    throw error;
  }

  // Validar que ya no exista un pago pagado para esta orden
  const existingPayment = await getPaymentByOrderId(orderId);
  if (existingPayment && existingPayment.status === 'paid') {
    const error = new Error('Esta orden ya tiene un pago confirmado');
    error.status = 400;
    throw error;
  }

  // Validar que el monto coincida con el total de la orden
  if (Math.abs(parseFloat(amount) - parseFloat(order.total)) > 0.01) {
    const error = new Error(`El monto debe ser ${order.total}. Monto recibido: ${amount}`);
    error.status = 400;
    throw error;
  }

  // Crear el pago
  const payment = await createPaymentModel(orderId, userId, amount, method);

  // Automáticamente marcar como paid y actualizar orden a confirmed
  // (En una aplicación real, esto sería parte de un webhook o lógica de procesamiento)
  await updateOrderStatus(orderId, 'confirmed');

  return payment;
};

export const getPayments = async () => {
  return await getAllPayments();
};

export const getMyPayments = async (userId) => {
  return await getPaymentsByUserId(userId);
};

export const getPaymentById = async (id) => {
  const payment = await getPaymentByIdModel(id);

  if (!payment) {
    const error = new Error('Pago no encontrado');
    error.status = 404;
    throw error;
  }

  return payment;
};
