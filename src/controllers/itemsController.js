import { Op } from "sequelize";
import db from "../../database/models/index.js";

export const createItemData = async (req, res, next) => {
  try {
    const { brand_id, model_id, item_type_id, title, price, amount } = req.body;

    const newItem = await db.Items.create({
      brand_id,
      model_id,
      item_type_id,
      title,
      price,
      amount,
    });

    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    next(error);
  }
};

export const getAllLimited = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const rows = await db.Items.findAll({
      limit: safeLimit,
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  try {
    const total = await db.Items.count();
    const startFrom = Math.floor(total / 2);

    const rows = await db.Items.findAll({
      where: { item_id: { [Op.gt]: startFrom } },
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getByMultipleValues = async (req, res, next) => {
  try {
    const ids = req.query.ids
      ? req.query.ids.split(",").map(Number)
      : [10, 11, 12];

    const rows = await db.Items.findAll({
      where: { brand_id: { [Op.in]: ids } },
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
      return res
        .status(400)
        .json({ success: false, message: "values must be a non-empty array" });
    }

    const deleted = await db.Items.destroy({
      where: { brand_id: { [Op.in]: values } },
    });

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    next(error);
  }
};

export const updateItemData = async (req, res, next) => {
  try {
    const { item_id, price, amount } = req.body;

    if (!item_id) {
      return res
        .status(400)
        .json({ success: false, message: "item_id is required" });
    }

    const [, [updatedItem]] = await db.Items.update(
      { price, amount },
      { where: { item_id }, returning: true },
    );

    res.json({ success: true, data: updatedItem || null });
  } catch (error) {
    next(error);
  }
};
