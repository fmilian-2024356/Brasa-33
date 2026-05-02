import {
  createRestaurant as createRestaurantService,
  getRestaurants as getRestaurantsService,
  getRestaurantById as getRestaurantByIdService,
  updateRestaurant as updateRestaurantService,
  deleteRestaurant as deleteRestaurantService,
} from './restaurant.service.js';

export const createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await createRestaurantService(req.body);
    res.status(201).json({ success: true, data: restaurant });
  } catch (error) {
    next(error);
  }
};

export const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await getRestaurantsService();
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    next(error);
  }
};

export const getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await getRestaurantByIdService(id);

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    next(error);
  }
};

export const updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await updateRestaurantService(id, req.body);

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    next(error);
  }
};

export const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteRestaurantService(id);

    res.status(200).json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (error) {
    next(error);
  }
};
