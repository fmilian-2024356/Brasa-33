import { useRestaurantsStore } from '../store/useRestaurantStore.js';

export const useSaveRestaurant = () => {
  const createRestaurant = useRestaurantsStore((s) => s.createRestaurant);
  const updateRestaurant = useRestaurantsStore((s) => s.updateRestaurant);

  const saveRestaurant = async (data, id = null) => {
    const payload = {
      name: data.name,
      address: data.address,
      phone: data.phone,
    };

    try {
      if (id) {
        return await updateRestaurant(id, payload);
      }

      return await createRestaurant(payload);
    } catch (err) {
      console.error('Error saving restaurant:', err);
      throw err;
    }
  };

  return { saveRestaurant };
};