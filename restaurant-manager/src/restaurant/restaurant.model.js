import { pool } from '../config/db.js';

export const createRestaurant = async ({ name, address, phone }) => {
  const query = `
    INSERT INTO restaurants (name, address, phone)
    VALUES ($1, $2, $3)
    RETURNING id, name, address, phone, created_at
  `;
  const values = [name, address, phone];
  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const getAllRestaurants = async () => {
  const query = `
    SELECT id, name, address, phone, created_at
    FROM restaurants
    ORDER BY created_at DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
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

export const updateRestaurant = async (id, { name, address, phone }) => {
  const query = `
    UPDATE restaurants
    SET name = $1,
        address = $2,
        phone = $3
    WHERE id = $4
    RETURNING id, name, address, phone, created_at
  `;
  const values = [name, address, phone, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const deleteRestaurant = async (id) => {
  const query = `DELETE FROM restaurants WHERE id = $1`;
  await pool.query(query, [id]);
};
