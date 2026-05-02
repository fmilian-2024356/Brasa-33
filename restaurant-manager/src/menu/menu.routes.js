import { Router } from 'express';
import {
  createDish,
  getDishes,
  getDishById,
  getDishesByRestaurant,
  updateDish,
  updateDishStock,
  deleteDish,
} from './menu.controller.js';
import { validateJwt } from '../middlewares/validateJwt.js';

const router = Router();

router.post('/', validateJwt, createDish);
router.get('/', getDishes);
router.get('/:id', getDishById);
router.get('/restaurant/:restaurantId', getDishesByRestaurant);
router.put('/:id', validateJwt, updateDish);
router.patch('/:id/stock', validateJwt, updateDishStock);
router.delete('/:id', validateJwt, deleteDish);

export default router;
