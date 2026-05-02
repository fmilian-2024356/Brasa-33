import { pool } from '../config/db.js';

export const createPayment = async (orderId, userId, amount, method) => {
  const query = `
    INSERT INTO payments (order_id, user_id, amount, method, status)
    VALUES ($1, $2, $3, $4, 'paid')
    RETURNING id, order_id, user_id, amount, method, status, created_at
  `;
  const values = [orderId, userId, amount, method];
  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const getAllPayments = async () => {
  const query = `
    SELECT id, order_id, user_id, amount, method, status, created_at
    FROM payments
    ORDER BY created_at DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const getPaymentById = async (id) => {
  const query = `
    SELECT id, order_id, user_id, amount, method, status, created_at
    FROM payments
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const getPaymentsByUserId = async (userId) => {
  const query = `
    SELECT id, order_id, user_id, amount, method, status, created_at
    FROM payments
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

export const getPaymentByOrderId = async (orderId) => {
  const query = `
    SELECT id, order_id, user_id, amount, method, status, created_at
    FROM payments
    WHERE order_id = $1
    ORDER BY created_at DESC
    LIMIT 1
  `;
  const { rows } = await pool.query(query, [orderId]);
  return rows[0];
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

export const updateOrderStatus = async (orderId, status) => {
  const query = `
    UPDATE orders
    SET status = $1
    WHERE id = $2
    RETURNING id, user_id, total, status, created_at
  `;
  const values = [status, orderId];
  const { rows } = await pool.query(query, values);
  return rows[0];
};
