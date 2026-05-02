import {
  createReservation as createReservationModel,
  getAllReservations,
  getReservationById as getReservationByIdModel,
  getReservationsByUserId,
  updateReservationStatus,
  getRestaurantById,
} from './reservation.model.js';

const VALID_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

const validateReservationPayload = (date, time, peopleCount) => {
  if (!date || !time || peopleCount === undefined) {
    const error = new Error('Los campos date, time y people_count son obligatorios');
    error.status = 400;
    throw error;
  }

  // Validar que la fecha no sea pasada
  const reservationDateTime = new Date(`${date}T${time}`);
  const now = new Date();

  if (reservationDateTime < now) {
    const error = new Error('La fecha y hora de la reservación no pueden ser pasadas');
    error.status = 400;
    throw error;
  }

  if (typeof peopleCount !== 'number' || peopleCount <= 0) {
    const error = new Error('people_count debe ser un número mayor a 0');
    error.status = 400;
    throw error;
  }
};

export const createReservation = async (userId, restaurantId, date, time, peopleCount) => {
  if (!restaurantId) {
    const error = new Error('restaurant_id es obligatorio');
    error.status = 400;
    throw error;
  }

  validateReservationPayload(date, time, peopleCount);

  // Validar que el restaurante exista
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    const error = new Error('Restaurante no encontrado');
    error.status = 404;
    throw error;
  }

  return await createReservationModel(userId, restaurantId, date, time, peopleCount);
};

export const getReservations = async () => {
  return await getAllReservations();
};

export const getMyReservations = async (userId) => {
  return await getReservationsByUserId(userId);
};

export const getReservationById = async (id) => {
  const reservation = await getReservationByIdModel(id);

  if (!reservation) {
    const error = new Error('Reservación no encontrada');
    error.status = 404;
    throw error;
  }

  return reservation;
};

export const cancelReservation = async (id) => {
  const reservation = await getReservationByIdModel(id);

  if (!reservation) {
    const error = new Error('Reservación no encontrada');
    error.status = 404;
    throw error;
  }

  if (reservation.status === 'completed') {
    const error = new Error('No se puede cancelar una reservación completada');
    error.status = 400;
    throw error;
  }

  if (reservation.status === 'cancelled') {
    const error = new Error('La reservación ya está cancelada');
    error.status = 400;
    throw error;
  }

  await updateReservationStatus(id, 'cancelled');
  return await getReservationByIdModel(id);
};

export const completeReservation = async (id) => {
  const reservation = await getReservationByIdModel(id);

  if (!reservation) {
    const error = new Error('Reservación no encontrada');
    error.status = 404;
    throw error;
  }

  if (reservation.status === 'cancelled') {
    const error = new Error('No se puede completar una reservación cancelada');
    error.status = 400;
    throw error;
  }

  if (reservation.status === 'completed') {
    const error = new Error('La reservación ya está completada');
    error.status = 400;
    throw error;
  }

  await updateReservationStatus(id, 'completed');
  return await getReservationByIdModel(id);
};
