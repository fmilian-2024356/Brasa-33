import {
  createDish as createDishService,
  getDishes as getDishesService,
  getDishById as getDishByIdService,
  getDishesByRestaurant as getDishesByRestaurantService,
  updateDish as updateDishService,
  updateDishStock as updateDishStockService,
  deleteDish as deleteDishService,
} from './menu.service.js';

export const createDish = async (req, res, next) => {
  try {
    const dish = await createDishService(req.body);
    res.status(201).json({ success: true, data: dish });
  } catch (error) {
    next(error);
  }
};

export const getDishes = async (req, res, next) => {
  try {
    const dishes = await getDishesService();
    res.status(200).json({ success: true, data: dishes });
  } catch (error) {
    next(error);
  }
};

export const getDishById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dish = await getDishByIdService(id);

    res.status(200).json({ success: true, data: dish });
  } catch (error) {
    next(error);
  }
};

export const getDishesByRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const dishes = await getDishesByRestaurantService(restaurantId);

    res.status(200).json({ success: true, data: dishes });
  } catch (error) {
    next(error);
  }
};

export const updateDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dish = await updateDishService(id, req.body);

    res.status(200).json({ success: true, data: dish });
  } catch (error) {
    next(error);
  }
};

export const updateDishStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const dish = await updateDishStockService(id, stock);

    res.status(200).json({ success: true, data: dish });
  } catch (error) {
    next(error);
  }
};

export const deleteDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteDishService(id);

    res.status(200).json({ success: true, message: 'Dish deleted successfully' });
  } catch (error) {
    next(error);
  }
};
