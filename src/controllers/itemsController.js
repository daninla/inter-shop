import { Op } from "sequelize";
import { models } from "../db.js";

export const getAllLimited = async (req, res, next) => {
  try {
    const rows = await models.items.findAll({
      limit: 10,
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  try {
    const total = await models.items.count();
    const startFrom = Math.floor(total / 2);

    const rows = await models.items.findAll({
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

    const rows = await models.items.findAll({
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

    const deleted = await models.items.destroy({
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

    const [, [updatedItem]] = await models.items.update(
      { price, amount },
      { where: { item_id }, returning: true },
    );

    res.json({ success: true, data: updatedItem || null });
  } catch (error) {
    next(error);
  }
};
