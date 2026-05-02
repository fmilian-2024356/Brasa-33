import {
  createDish as createDishModel,
  getAllDishes,
  getDishById as getDishByIdModel,
  getDishesByRestaurant as getDishesByRestaurantModel,
  updateDish as updateDishModel,
  updateDishStock as updateDishStockModel,
  deleteDish as deleteDishModel,
  getRestaurantById,
} from './menu.model.js';

const validateDishPayload = (payload) => {
  const { name, description, price, stock, restaurant_id } = payload;

  if (!name || !description || price === undefined || stock === undefined || !restaurant_id) {
    const error = new Error('Los campos name, description, price, stock y restaurant_id son obligatorios');
    error.status = 400;
    throw error;
  }

  if (typeof price !== 'number' || price <= 0) {
    const error = new Error('El precio debe ser un número mayor a 0');
    error.status = 400;
    throw error;
  }

  if (typeof stock !== 'number' || stock < 0) {
    const error = new Error('El stock debe ser un número mayor o igual a 0');
    error.status = 400;
    throw error;
  }
};

export const createDish = async (payload) => {
  validateDishPayload(payload);

  // Validar que el restaurante exista
  const restaurant = await getRestaurantById(payload.restaurant_id);
  if (!restaurant) {
    const error = new Error('Restaurant not found');
    error.status = 404;
    throw error;
  }

  return await createDishModel(payload);
};

export const getDishes = async () => {
  return await getAllDishes();
};

export const getDishById = async (id) => {
  const dish = await getDishByIdModel(id);
  if (!dish) {
    const error = new Error('Dish not found');
    error.status = 404;
    throw error;
  }
  return dish;
};

export const getDishesByRestaurant = async (restaurantId) => {
  // Validar que el restaurante exista
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    const error = new Error('Restaurant not found');
    error.status = 404;
    throw error;
  }

  return await getDishesByRestaurantModel(restaurantId);
};

export const updateDish = async (id, payload) => {
  const dish = await getDishByIdModel(id);
  if (!dish) {
    const error = new Error('Dish not found');
    error.status = 404;
    throw error;
  }

  // Solo validar los campos que se están actualizando
  if (payload.price !== undefined) {
    if (typeof payload.price !== 'number' || payload.price <= 0) {
      const error = new Error('El precio debe ser un número mayor a 0');
      error.status = 400;
      throw error;
    }
  }

  if (payload.stock !== undefined) {
    if (typeof payload.stock !== 'number' || payload.stock < 0) {
      const error = new Error('El stock debe ser un número mayor o igual a 0');
      error.status = 400;
      throw error;
    }
  }

  if (payload.restaurant_id !== undefined) {
    const restaurant = await getRestaurantById(payload.restaurant_id);
    if (!restaurant) {
      const error = new Error('Restaurant not found');
      error.status = 404;
      throw error;
    }
  }

  return await updateDishModel(id, payload);
};

export const updateDishStock = async (id, stock) => {
  if (typeof stock !== 'number' || stock < 0) {
    const error = new Error('El stock debe ser un número mayor o igual a 0');
    error.status = 400;
    throw error;
  }

  const dish = await getDishByIdModel(id);
  if (!dish) {
    const error = new Error('Dish not found');
    error.status = 404;
    throw error;
  }

  return await updateDishStockModel(id, stock);
};

export const deleteDish = async (id) => {
  const dish = await getDishByIdModel(id);
  if (!dish) {
    const error = new Error('Dish not found');
    error.status = 404;
    throw error;
  }
  await deleteDishModel(id);
};
