import {
  createPayment as createPaymentService,
  getPayments as getPaymentsService,
  getMyPayments as getMyPaymentsService,
  getPaymentById as getPaymentByIdService,
} from './payment.service.js';

export const createPayment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { order_id, amount, method } = req.body;

    const payment = await createPaymentService(userId, order_id, amount, method);

    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};

export const getPayments = async (req, res, next) => {
  try {
    const payments = await getPaymentsService();
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};

export const getMyPayments = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const payments = await getMyPaymentsService(userId);

    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};

export const getPaymentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await getPaymentByIdService(id);

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};
