import {
  getTotalRevenue as getTotalRevenueService,
  getSalesByDate as getSalesByDateService,
  getTopProducts as getTopProductsService,
  getOrdersByStatus as getOrdersByStatusService,
  getReservationsReport as getReservationsReportService,
} from './report.service.js';

export const getTotalRevenue = async (req, res, next) => {
  try {
    const revenue = await getTotalRevenueService();
    res.status(200).json({ success: true, data: revenue });
  } catch (error) {
    next(error);
  }
};

export const getSalesByDate = async (req, res, next) => {
  try {
    const sales = await getSalesByDateService();
    res.status(200).json({ success: true, data: sales });
  } catch (error) {
    next(error);
  }
};

export const getTopProducts = async (req, res, next) => {
  try {
    const topProducts = await getTopProductsService();
    res.status(200).json({ success: true, data: topProducts });
  } catch (error) {
    next(error);
  }
};

export const getOrdersByStatus = async (req, res, next) => {
  try {
    const ordersByStatus = await getOrdersByStatusService();
    res.status(200).json({ success: true, data: ordersByStatus });
  } catch (error) {
    next(error);
  }
};

export const getReservationsReport = async (req, res, next) => {
  try {
    const reservationsReport = await getReservationsReportService();
    res.status(200).json({ success: true, data: reservationsReport });
  } catch (error) {
    next(error);
  }
};
