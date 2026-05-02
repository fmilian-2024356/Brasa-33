import { pool } from '../config/db.js';

export const getTotalRevenue = async () => {
  const query = `
    SELECT 
      COALESCE(SUM(amount), 0) as total_revenue,
      COUNT(*) as total_payments,
      COUNT(DISTINCT order_id) as total_orders
    FROM payments
    WHERE status = 'paid'
  `;
  const { rows } = await pool.query(query);
  return rows[0];
};

export const getSalesByDate = async () => {
  const query = `
    SELECT 
      p.created_at::DATE as date,
      COUNT(*) as transactions,
      COUNT(DISTINCT p.order_id) as unique_orders,
      COALESCE(SUM(p.amount), 0) as daily_revenue
    FROM payments p
    WHERE p.status = 'paid'
    GROUP BY p.created_at::DATE
    ORDER BY p.created_at::DATE DESC
    LIMIT 30
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const getTopProducts = async () => {
  const query = `
    SELECT 
      m.id,
      m.name,
      m.price,
      SUM(oi.quantity) as total_sold,
      COUNT(DISTINCT oi.order_id) as times_ordered,
      COALESCE(SUM(oi.quantity * oi.price), 0) as total_revenue
    FROM order_items oi
    JOIN menu m ON oi.menu_id = m.id
    GROUP BY m.id, m.name, m.price
    ORDER BY total_sold DESC
    LIMIT 20
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const getOrdersByStatus = async () => {
  const query = `
    SELECT 
      status,
      COUNT(*) as count,
      COALESCE(SUM(total), 0) as total_amount
    FROM orders
    GROUP BY status
    ORDER BY count DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const getReservationsReport = async () => {
  const query = `
    SELECT 
      status,
      COUNT(*) as count,
      ROUND(AVG(people_count), 2) as avg_people,
      MAX(people_count) as max_people,
      MIN(people_count) as min_people
    FROM reservations
    GROUP BY status
    ORDER BY count DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
};
