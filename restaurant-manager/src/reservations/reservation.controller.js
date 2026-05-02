import {
  createReservation as createReservationService,
  getReservations as getReservationsService,
  getMyReservations as getMyReservationsService,
  getReservationById as getReservationByIdService,
  cancelReservation as cancelReservationService,
  completeReservation as completeReservationService,
} from './reservation.service.js';

export const createReservation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { restaurant_id, date, time, people_count } = req.body;

    const reservation = await createReservationService(userId, restaurant_id, date, time, people_count);

    res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

export const getReservations = async (req, res, next) => {
  try {
    const reservations = await getReservationsService();
    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};

export const getMyReservations = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const reservations = await getMyReservationsService(userId);

    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};

export const getReservationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await getReservationByIdService(id);

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

export const cancelReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await cancelReservationService(id);

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

export const completeReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await completeReservationService(id);

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};
