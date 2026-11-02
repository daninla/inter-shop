import { Op } from "sequelize";
import db from "../../database/models/index.js";

export const createItemCategoryData = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const newItemCategory = await db.ItemCategories.create({ title, description });

    res.status(201).json({ success: true, data: newItemCategory });
  } catch (error) {
    next(error);
  }
};

export const getAllLimited = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const rows = await db.ItemCategories.findAll({
      limit: safeLimit,
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  try {
    const total = await db.ItemCategories.count();
    const startFrom = Math.floor(total / 2);

    const rows = await db.ItemCategories.findAll({
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

    const rows = await db.ItemCategories.findAll({
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

    const deleted = await db.ItemCategories.destroy({
      where: { id: { [Op.in]: values } },
    });

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    next(error);
  }
};

export const updateItemCategoryData = async (req, res, next) => {
  try {
    const { id, title, description } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "id is required" });
    }

    const [, [updatedCategory]] = await db.ItemCategories.update(
      { title, description },
      { where: { id }, returning: true },
    );

    res.json({ success: true, data: updatedCategory || null });
  } catch (error) {
    next(error);
  }
};
