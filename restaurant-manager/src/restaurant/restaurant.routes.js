import { Router } from 'express';
import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from './restaurant.controller.js';
import { validateJwt } from '../middlewares/validateJwt.js';

const router = Router();

router.post('/', validateJwt, createRestaurant);
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.put('/:id', validateJwt, updateRestaurant);
router.delete('/:id', validateJwt, deleteRestaurant);

export default router;
