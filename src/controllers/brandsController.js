import { Op } from "sequelize";
import { models } from "../db.js";

export const getAllLimited = async (req, res, next) => {
  try {
    const rows = await models.brands.findAll({
      limit: 10,
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  try {
    const total = await models.brands.count();
    const startFrom = Math.floor(total / 2);

    const rows = await models.brands.findAll({
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

    const rows = await models.brands.findAll({
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

    const deleted = await models.brands.destroy({
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

    const [, [updatedBrand]] = await models.brands.update(
      { title, description },
      { where: { id }, returning: true },
    );

    res.json({ success: true, data: updatedBrand || null });
  } catch (error) {
    next(error);
  }
};
