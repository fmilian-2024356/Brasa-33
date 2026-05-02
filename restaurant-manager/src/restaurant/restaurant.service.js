import {
  createRestaurant as createRestaurantModel,
  getAllRestaurants,
  getRestaurantById as getRestaurantByIdModel,
  updateRestaurant as updateRestaurantModel,
  deleteRestaurant as deleteRestaurantModel,
} from './restaurant.model.js';

const validateRestaurantPayload = (payload) => {
  const { name, address, phone } = payload;

  if (!name || !address || !phone) {
    const error = new Error('Los campos name, address y phone son obligatorios');
    error.status = 400;
    throw error;
  }
};

export const createRestaurant = async (payload) => {
  validateRestaurantPayload(payload);
  return await createRestaurantModel(payload);
};

export const getRestaurants = async () => {
  return await getAllRestaurants();
};

export const getRestaurantById = async (id) => {
  const restaurant = await getRestaurantByIdModel(id);
  if (!restaurant) {
    const error = new Error('Restaurant not found');
    error.status = 404;
    throw error;
  }
  return restaurant;
};

export const updateRestaurant = async (id, payload) => {
  const restaurant = await getRestaurantByIdModel(id);
  if (!restaurant) {
    const error = new Error('Restaurant not found');
    error.status = 404;
    throw error;
  }

  validateRestaurantPayload(payload);
  return await updateRestaurantModel(id, payload);
};

export const deleteRestaurant = async (id) => {
  const restaurant = await getRestaurantByIdModel(id);
  if (!restaurant) {
    const error = new Error('Restaurant not found');
    error.status = 404;
    throw error;
  }
  await deleteRestaurantModel(id);
};
