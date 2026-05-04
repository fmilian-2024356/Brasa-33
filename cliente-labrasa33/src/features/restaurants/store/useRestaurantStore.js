import { create } from 'zustand';
import {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from '../../../shared/api';

export const useRestaurantsStore = create((set, get) => ({
  restaurants: [],
  loading: false,
  error: null,

  getRestaurants: async () => {
    try {
      set({ loading: true, error: null });

      const res = await getRestaurants();

      set({
        restaurants: res.data.data || res.data,
        loading: false,
      });
    } catch (err) {
      set({
        error: 'Error al obtener restaurantes',
        loading: false,
      });
    }
  },

  createRestaurant: async (data) => {
    try {
      const res = await createRestaurant(data);
      const newRestaurant = res.data.data || res.data;

      set({
        restaurants: [newRestaurant, ...get().restaurants],
      });
    } catch (err) {
      set({ error: 'Error al crear restaurante' });
    }
  },

  updateRestaurant: async (id, data) => {
    try {
      const res = await updateRestaurant(id, data);
      const updated = res.data.data || res.data;

      set({
        restaurants: get().restaurants.map((r) =>
          r.id === id ? updated : r
        ),
      });
    } catch (err) {
      set({ error: 'Error al actualizar restaurante' });
    }
  },

  deleteRestaurant: async (id) => {
    try {
      await deleteRestaurant(id);

      set({
        restaurants: get().restaurants.filter((r) => r.id !== id),
      });
    } catch (err) {
      set({ error: 'Error al eliminar restaurante' });
    }
  },
}));