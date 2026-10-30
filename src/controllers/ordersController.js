import { Op } from "sequelize";
import { models } from "../db.js";

export const getAllLimited = async (req, res, next) => {
  try {
    const rows = await models.orders.findAll({
      limit: 10,
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  try {
    const total = await models.orders.count();
    const startFrom = Math.floor(total / 2);

    const rows = await models.orders.findAll({
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

    const rows = await models.orders.findAll({
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

    const deleted = await models.orders.destroy({
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

    const [, [updatedOrder]] = await models.orders.update(
      { code, date, customer, amount, paid },
      { where: { order_id }, returning: true },
    );

    res.json({ success: true, data: updatedOrder || null });
  } catch (error) {
    next(error);
  }
};
