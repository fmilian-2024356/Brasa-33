import {
  createOrder as createOrderService,
  getOrders as getOrdersService,
  getMyOrders as getMyOrdersService,
  getOrderById as getOrderByIdService,
  confirmOrder as confirmOrderService,
  updateOrderStatus as updateOrderStatusService,
  cancelOrder as cancelOrderService,
} from './order.service.js';

export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;
    const order = await createOrderService(userId, items);

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await getOrdersService();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await getMyOrdersService(userId);

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await getOrderByIdService(id);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const confirmOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await confirmOrderService(id);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await updateOrderStatusService(id, status);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await cancelOrderService(id);

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
