import {
  createOrder as createOrderModel,
  createOrderItems,
  getAllOrders,
  getOrderById as getOrderByIdModel,
  getOrdersByUserId,
  updateOrderStatus as updateOrderStatusModel,
  getDishById,
  decrementDishStock,
  restoreDishStock,
  getOrderWithItems,
} from './order.model.js';

const VALID_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

const validateOrderItems = (items) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    const error = new Error('Items debe ser un array no vacío con al menos un plato');
    error.status = 400;
    throw error;
  }

  items.forEach((item) => {
    if (!item.menu_id || !item.quantity) {
      const error = new Error('Cada item debe tener menu_id y quantity');
      error.status = 400;
      throw error;
    }

    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      const error = new Error('Quantity debe ser un número mayor a 0');
      error.status = 400;
      throw error;
    }
  });
};

export const createOrder = async (userId, items) => {
  validateOrderItems(items);

  let total = 0;
  const validatedItems = [];

  // Validar que todos los platos existan y tengan stock
  for (const item of items) {
    const dish = await getDishById(item.menu_id);

    if (!dish) {
      const error = new Error(`Plato con ID ${item.menu_id} no encontrado`);
      error.status = 404;
      throw error;
    }

    if (dish.stock < item.quantity) {
      const error = new Error(`Stock insuficiente para ${dish.name}. Disponibles: ${dish.stock}`);
      error.status = 400;
      throw error;
    }

    total += parseFloat(dish.price) * item.quantity;
    validatedItems.push({
      menu_id: item.menu_id,
      quantity: item.quantity,
      price: dish.price,
    });
  }

  // Crear orden con total calculado
  const order = await createOrderModel(userId, total);

  // Crear order items y descontar stock
  await createOrderItems(order.id, validatedItems);

  for (const item of validatedItems) {
    await decrementDishStock(item.menu_id, item.quantity);
  }

  // Retornar orden completa con items
  return await getOrderWithItems(order.id);
};

export const getOrders = async () => {
  return await getAllOrders();
};

export const getMyOrders = async (userId) => {
  return await getOrdersByUserId(userId);
};

export const getOrderById = async (id) => {
  const order = await getOrderWithItems(id);

  if (!order) {
    const error = new Error('Order not found');
    error.status = 404;
    throw error;
  }

  return order;
};

export const confirmOrder = async (id) => {
  const order = await getOrderByIdModel(id);

  if (!order) {
    const error = new Error('Order not found');
    error.status = 404;
    throw error;
  }

  if (order.status !== 'pending') {
    const error = new Error('Solo se pueden confirmar órdenes en estado pending');
    error.status = 400;
    throw error;
  }

  await updateOrderStatusModel(id, 'confirmed');
  return await getOrderWithItems(id);
};

export const updateOrderStatus = async (id, status) => {
  if (!VALID_STATUSES.includes(status)) {
    const error = new Error(`Estado inválido. Estados válidos: ${VALID_STATUSES.join(', ')}`);
    error.status = 400;
    throw error;
  }

  const order = await getOrderByIdModel(id);

  if (!order) {
    const error = new Error('Order not found');
    error.status = 404;
    throw error;
  }

  // No permitir cambiar de completed o cancelled
  if (order.status === 'completed' || order.status === 'cancelled') {
    const error = new Error(`No se puede cambiar el estado de una orden ${order.status}`);
    error.status = 400;
    throw error;
  }

  await updateOrderStatusModel(id, status);
  return await getOrderWithItems(id);
};

export const cancelOrder = async (id) => {
  const order = await getOrderWithItems(id);

  if (!order) {
    const error = new Error('Order not found');
    error.status = 404;
    throw error;
  }

  if (order.status === 'completed') {
    const error = new Error('No se puede cancelar una orden completada');
    error.status = 400;
    throw error;
  }

  if (order.status === 'cancelled') {
    const error = new Error('La orden ya está cancelada');
    error.status = 400;
    throw error;
  }

  // Restaurar stock de los platos
  for (const item of order.items) {
    await restoreDishStock(item.menu_id, item.quantity);
  }

  await updateOrderStatusModel(id, 'cancelled');
  return await getOrderWithItems(id);
};
