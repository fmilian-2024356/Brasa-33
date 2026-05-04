import { axiosAdmin } from './api';

// RESTAURANTES

// OBTENER TODOS
export const getRestaurants = async () => {
  const { data } = await axiosAdmin.get('/restaurants');
  return data;
};

// OBTENER UNO
export const getRestaurantById = async (id) => {
  const { data } = await axiosAdmin.get(`/restaurants/${id}`);
  return data;
};

// CREAR
export const createRestaurant = async (data) => {
  return await axiosAdmin.post('/restaurants', data);
};

// ACTUALIZAR
export const updateRestaurant = async (id, data) => {
  return await axiosAdmin.put(`/restaurants/${id}`, data);
};

// ELIMINAR
export const deleteRestaurant = async (id) => {
  return await axiosAdmin.delete(`/restaurants/${id}`);
};

// PEDIDOS

// CREAR ORDEN
export const createOrder = async (data) => {
  return await axiosAdmin.post('/orders', data);
};

// OBTENER TODAS (ADMIN)
export const getOrders = async () => {
  const { data } = await axiosAdmin.get('/orders');
  return data;
};

// OBTENER MIS ÓRDENES (USER)
export const getMyOrders = async () => {
  const { data } = await axiosAdmin.get('/orders/my-orders');
  return data;
};

// OBTENER POR ID
export const getOrderById = async (id) => {
  const { data } = await axiosAdmin.get(`/orders/${id}`);
  return data;
};

// CONFIRMAR ORDEN
export const confirmOrder = async (id) => {
  const { data } = await axiosAdmin.patch(`/orders/${id}/confirm`);
  return data;
};

// ACTUALIZAR STATUS
export const updateOrderStatus = async (id, data) => {
  const { data: res } = await axiosAdmin.patch(
    `/orders/${id}/status`,
    data
  );
  return res;
};

// CANCELAR ORDEN
export const cancelOrder = async (id) => {
  const { data } = await axiosAdmin.patch(`/orders/${id}/cancel`);
  return data;
};