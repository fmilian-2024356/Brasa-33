import { pool } from '../config/db.js';

export const createDish = async ({ name, description, price, stock, restaurant_id }) => {
  const query = `
    INSERT INTO menu (name, description, price, stock, restaurant_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, description, price, stock, restaurant_id, created_at
  `;
  const values = [name, description, price, stock, restaurant_id];
  const { rows } = await pool.query(query, values);

  return rows[0];
};

export const getAllDishes = async () => {
  const query = `
    SELECT id, name, description, price, stock, restaurant_id, created_at
    FROM menu
    ORDER BY created_at DESC
  `;
  const { rows } = await pool.query(query);
  return rows;
};

export const getDishById = async (id) => {
  const query = `
    SELECT id, name, description, price, stock, restaurant_id, created_at
    FROM menu
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const getDishesByRestaurant = async (restaurantId) => {
  const query = `
    SELECT id, name, description, price, stock, restaurant_id, created_at
    FROM menu
    WHERE restaurant_id = $1
    ORDER BY created_at DESC
  `;
  const { rows } = await pool.query(query, [restaurantId]);
  return rows;
};

export const updateDish = async (id, { name, description, price, stock, restaurant_id }) => {
  const updates = [];
  const values = [];
  let paramCount = 1;

  if (name !== undefined) {
    updates.push(`name = $${paramCount++}`);
    values.push(name);
  }

  if (description !== undefined) {
    updates.push(`description = $${paramCount++}`);
    values.push(description);
  }

  if (price !== undefined) {
    updates.push(`price = $${paramCount++}`);
    values.push(price);
  }

  if (stock !== undefined) {
    updates.push(`stock = $${paramCount++}`);
    values.push(stock);
  }

  if (restaurant_id !== undefined) {
    updates.push(`restaurant_id = $${paramCount++}`);
    values.push(restaurant_id);
  }

  if (updates.length === 0) {
    const error = new Error('No fields to update');
    error.status = 400;
    throw error;
  }

  values.push(id);

  const query = `
    UPDATE menu
    SET ${updates.join(', ')}
    WHERE id = $${paramCount}
    RETURNING id, name, description, price, stock, restaurant_id, created_at
  `;

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const updateDishStock = async (id, stock) => {
  const query = `
    UPDATE menu
    SET stock = $1
    WHERE id = $2
    RETURNING id, name, description, price, stock, restaurant_id, created_at
  `;
  const values = [stock, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const deleteDish = async (id) => {
  const query = `DELETE FROM menu WHERE id = $1`;
  await pool.query(query, [id]);
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
