import { pool } from '../config/db.js';

export const createReservation = async (userId, restaurantId, date, time, peopleCount) => {
  const query = `
    INSERT INTO reservations (user_id, restaurant_id, date, time, people_count, status)
    VALUES ($1, $2, $3, $4, $5, 'pending')
    RETURNING id, user_id, restaurant_id, date, time, people_count, status, created_at
  `;
  const values = [userId, restaurantId, date, time, peopleCount];
  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const getAllReservations = async () => {
  const query = `
    SELECT 
      r.id,
      r.user_id,
      r.restaurant_id,
      r.date,
      r.time,
      r.people_count,
      r.status,
      r.created_at,
      rest.name as restaurant_name,
      rest.address as restaurant_address
    FROM reservations r
    JOIN restaurants rest ON r.restaurant_id = rest.id
    ORDER BY r.date DESC, r.time DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const getReservationById = async (id) => {
  const query = `
    SELECT 
      r.id,
      r.user_id,
      r.restaurant_id,
      r.date,
      r.time,
      r.people_count,
      r.status,
      r.created_at,
      rest.name as restaurant_name,
      rest.address as restaurant_address
    FROM reservations r
    JOIN restaurants rest ON r.restaurant_id = rest.id
    WHERE r.id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const getReservationsByUserId = async (userId) => {
  const query = `
    SELECT 
      r.id,
      r.user_id,
      r.restaurant_id,
      r.date,
      r.time,
      r.people_count,
      r.status,
      r.created_at,
      rest.name as restaurant_name,
      rest.address as restaurant_address
    FROM reservations r
    JOIN restaurants rest ON r.restaurant_id = rest.id
    WHERE r.user_id = $1
    ORDER BY r.date DESC, r.time DESC
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

export const updateReservationStatus = async (id, status) => {
  const query = `
    UPDATE reservations
    SET status = $1
    WHERE id = $2
    RETURNING id, user_id, restaurant_id, date, time, people_count, status, created_at
  `;
  const values = [status, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getRestaurantById = async (id) => {
  const query = `
    SELECT id, name, address, phone, created_at
    FROM restaurants
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
