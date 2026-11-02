import { Op } from "sequelize";
import db from "../../database/models/index.js";

export const createModelData = async (req, res, next) => {
  try {
    const { title, brand_id, description } = req.body;

    const newModel = await db.Models.create({ title, brand_id, description });

    res.status(201).json({ success: true, data: newModel });
  } catch (error) {
    next(error);
  }
};

export const getAllLimited = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const rows = await db.Models.findAll({
      limit: safeLimit,
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  try {
    const total = await db.Models.count();
    const startFrom = Math.floor(total / 2);

    const rows = await db.Models.findAll({
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

    const rows = await db.Models.findAll({
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

    const deleted = await db.Models.destroy({
      where: { id: { [Op.in]: values } },
    });

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    next(error);
  }
};

export const updateModelData = async (req, res, next) => {
  try {
    const { id, title, brand_id, description } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "id is required" });
    }

    const [, [updatedModel]] = await db.Models.update(
      { title, brand_id, description },
      { where: { id }, returning: true },
    );

    res.json({ success: true, data: updatedModel || null });
  } catch (error) {
    next(error);
  }
};
