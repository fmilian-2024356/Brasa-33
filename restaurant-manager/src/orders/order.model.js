import { pool } from '../config/db.js';

export const createOrder = async (userId, total) => {
  const query = `
    INSERT INTO orders (user_id, total, status)
    VALUES ($1, $2, 'pending')
    RETURNING id, user_id, total, status, created_at
  `;
  const values = [userId, total];
  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const createOrderItems = async (orderId, items) => {
  const query = `
    INSERT INTO order_items (order_id, menu_id, quantity, price)
    VALUES ($1, $2, $3, $4)
  `;

  for (const item of items) {
    const values = [orderId, item.menu_id, item.quantity, item.price];
    await pool.query(query, values);
  }
};

export const getAllOrders = async () => {
  const query = `
    SELECT id, user_id, total, status, created_at
    FROM orders
    ORDER BY created_at DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const getOrderById = async (id) => {
  const query = `
    SELECT id, user_id, total, status, created_at
    FROM orders
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const getOrdersByUserId = async (userId) => {
  const query = `
    SELECT id, user_id, total, status, created_at
    FROM orders
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

export const updateOrderStatus = async (id, status) => {
  const query = `
    UPDATE orders
    SET status = $1
    WHERE id = $2
    RETURNING id, user_id, total, status, created_at
  `;
  const values = [status, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getDishById = async (id) => {
  const query = `
    SELECT id, name, price, stock, restaurant_id
    FROM menu
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const decrementDishStock = async (dishId, quantity) => {
  const query = `
    UPDATE menu
    SET stock = stock - $1
    WHERE id = $2
  `;
  const values = [quantity, dishId];
  await pool.query(query, values);
};

export const restoreDishStock = async (dishId, quantity) => {
  const query = `
    UPDATE menu
    SET stock = stock + $1
    WHERE id = $2
  `;
  const values = [quantity, dishId];
  await pool.query(query, values);
};

export const getOrderWithItems = async (orderId) => {
  const orderQuery = `
    SELECT id, user_id, total, status, created_at
    FROM orders
    WHERE id = $1
  `;
  const { rows: orderRows } = await pool.query(orderQuery, [orderId]);

  if (orderRows.length === 0) {
    return null;
  }

  const order = orderRows[0];

  const itemsQuery = `
    SELECT 
      oi.id,
      oi.menu_id,
      oi.quantity,
      oi.price,
      m.name,
      m.description,
      m.restaurant_id
    FROM order_items oi
    JOIN menu m ON oi.menu_id = m.id
    WHERE oi.order_id = $1
  `;
  const { rows: itemRows } = await pool.query(itemsQuery, [orderId]);

  return {
    ...order,
    items: itemRows,
  };
};
