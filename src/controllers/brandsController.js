import { Op } from "sequelize";
import db from "../../database/models/index.js";

export const createBrandData = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const newBrand = await db.Brands.create({ title, description });

    res.status(201).json({ success: true, data: newBrand });
  } catch (error) {
    next(error);
  }
};

export const getAllLimited = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const rows = await db.Brands.findAll({
      limit: safeLimit,
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  try {
    const total = await db.Brands.count();
    const startFrom = Math.floor(total / 2);

    const rows = await db.Brands.findAll({
      where: { id: { [Op.gt]: startFrom } },
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getByMultipleValues = async (req, res, next) => {
  try {
    const titles = req.query.titles
      ? req.query.titles.split(",")
      : ["Samsung", "Dell", "Xiaomi"];

    const rows = await db.Brands.findAll({
      where: { title: { [Op.in]: titles } },
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

    const deleted = await db.Brands.destroy({
      where: { title: { [Op.in]: values } },
    });

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    next(error);
  }
};

export const updateBrandData = async (req, res, next) => {
  try {
    const { id, title, description } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "id is required" });
    }

    const [, [updatedBrand]] = await db.Brands.update(
      { title, description },
      { where: { id }, returning: true },
    );

    res.json({ success: true, data: updatedBrand || null });
  } catch (error) {
    next(error);
  }
};
