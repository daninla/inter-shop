import { Op } from "sequelize";
import db from "../../database/models/index.js";

export const createOrderData = async (req, res, next) => {
  try {
    const { code, date, customer, amount, paid } = req.body;

    const newOrder = await db.Orders.create({ code, date, customer, amount, paid });

    res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    next(error);
  }
};

export const getAllLimited = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const rows = await db.Orders.findAll({
      limit: safeLimit,
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  try {
    const total = await db.Orders.count();
    const startFrom = Math.floor(total / 2);

    const rows = await db.Orders.findAll({
      where: { order_id: { [Op.gt]: startFrom } },
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getByMultipleValues = async (req, res, next) => {
  try {
    const ids = req.query.ids ? req.query.ids.split(",").map(Number) : [10, 11, 12];

    const rows = await db.Orders.findAll({
      where: { customer: { [Op.in]: ids } },
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const deleteByAttributeArray = async (req, res, next) => {
  try {
    const { values } = req.body;

    if (!Array.isArray(values) || !values.length) {
      return res.status(400).json({ success: false, message: "values must be a non-empty array" });
    }

    const deleted = await db.Orders.destroy({
      where: { customer: { [Op.in]: values } },
    });

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    next(error);
  }
};

export const updateOrderData = async (req, res, next) => {
  try {
    const { order_id, code, date, customer, amount, paid } = req.body;

    if (!order_id) {
      return res.status(400).json({ success: false, message: "order_id is required" });
    }

    const [, [updatedOrder]] = await db.Orders.update(
      { code, date, customer, amount, paid },
      { where: { order_id }, returning: true },
    );

    res.json({ success: true, data: updatedOrder || null });
  } catch (error) {
    next(error);
  }
};
