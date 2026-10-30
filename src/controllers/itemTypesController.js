import { Op } from "sequelize";
import { models } from "../db.js";

export const getAllLimited = async (req, res, next) => {
  try {
    const rows = await models.item_types.findAll({
      limit: 10,
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  try {
    const total = await models.item_types.count();
    const startFrom = Math.floor(total / 2);

    const rows = await models.item_types.findAll({
      where: { id: { [Op.gt]: startFrom } },
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getByMultipleValues = async (req, res, next) => {
  try {
    const ids = req.query.ids ? req.query.ids.split(",").map(Number) : [10, 11, 12];

    const rows = await models.item_types.findAll({
      where: { id: { [Op.in]: ids } },
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

    const deleted = await models.item_types.destroy({
      where: { id: { [Op.in]: values } },
    });

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    next(error);
  }
};

export const updateItemTypeData = async (req, res, next) => {
  try {
    const { id, title, description } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "id is required" });
    }

    const [, [updatedType]] = await models.item_types.update(
      { title, description },
      { where: { id }, returning: true },
    );

    res.json({ success: true, data: updatedType || null });
  } catch (error) {
    next(error);
  }
};
