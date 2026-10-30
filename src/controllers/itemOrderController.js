import { Op } from "sequelize";
import { models } from "../db.js";

export const getAllLimited = async (req, res, next) => {
  try {
    const rows = await models.item_order.findAll({
      limit: 10,
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  try {
    const total = await models.item_order.count();
    const startFrom = Math.floor(total / 2);

    const rows = await models.item_order.findAll({
      where: { item_id: { [Op.gt]: startFrom } },
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getByMultipleValues = async (req, res, next) => {
  try {
    const ids = req.query.ids ? req.query.ids.split(",").map(Number) : [10, 11, 12];

    const rows = await models.item_order.findAll({
      where: { item_id: { [Op.in]: ids } },
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

    const deleted = await models.item_order.destroy({
      where: { item_id: { [Op.in]: values } },
    });

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    next(error);
  }
};

export const updateItemOrderData = async (req, res, next) => {
  try {
    const { item_id, order_id, newItemId, newOrderId } = req.body;

    if (!item_id || !order_id) {
      return res.status(400).json({ success: false, message: "item_id and order_id are required" });
    }

    const payload = {
      item_id: newItemId ?? item_id,
      order_id: newOrderId ?? order_id,
    };

    const currentRecord = await models.item_order.findOne({
      where: { item_id, order_id },
    });

    if (!currentRecord) {
      return res.status(404).json({ success: false, message: "item_order not found" });
    }

    await currentRecord.update(payload);

    res.json({ success: true, data: currentRecord });
  } catch (error) {
    next(error);
  }
};
