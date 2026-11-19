import { Op } from "sequelize";
import db from "../../database/models/index.js";

export const createBrandData = async (req, res, next) => {
  let transaction;
  try {
    const { title, description } = req.body;

    const logo = req.file ? `/uploads/brands/${req.file.filename}` : null;
    transaction = await db.sequelize.transaction();

    const newBrand = await db.Brands.create(
      { title, description, logo },
      { transaction },
    );

    await transaction.commit();

    res.status(201).json({ success: true, data: newBrand });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    next(error);
  }
};

export const getAllLimited = async (req, res, next) => {
  let transaction;
  try {
    const limit = Number(req.query.limit) || 10;
    const safeLimit = Math.max(1, Math.min(limit, 100));

    transaction = await db.sequelize.transaction();

    const rows = await db.Brands.findAll({
      transaction,
      limit: safeLimit,
    });

    await transaction.commit();

    res.json({ success: true, data: rows });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    const total = await db.Brands.count({ transaction });
    const startFrom = Math.floor(total / 2);

    const rows = await db.Brands.findAll({
      transaction,
      where: { id: { [Op.gt]: startFrom } },
    });

    await transaction.commit();

    res.json({ success: true, data: rows });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    next(error);
  }
};

export const getByMultipleValues = async (req, res, next) => {
  let transaction;
  try {
    const titles = req.query.titles
      ? req.query.titles.split(",")
      : ["Samsung", "Dell", "Xiaomi"];

    transaction = await db.sequelize.transaction();

    const rows = await db.Brands.findAll({
      transaction,
      where: { title: { [Op.in]: titles } },
    });

    await transaction.commit();

    res.json({ success: true, data: rows });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    next(error);
  }
};

export const deleteByAttributeArray = async (req, res, next) => {
  let transaction;
  try {
    const { values } = req.body;

    if (!Array.isArray(values) || !values.length) {
      return res
        .status(400)
        .json({ success: false, message: "values must be a non-empty array" });
    }

    transaction = await db.sequelize.transaction();

    const deleted = await db.Brands.destroy({
      transaction,
      where: { title: { [Op.in]: values } },
    });

    await transaction.commit();

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    next(error);
  }
};

export const updateBrandData = async (req, res, next) => {
  let transaction;
  try {
    const { id, title, description } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "id is required" });
    }

    const data = { title, description };
    if (req.file) {
      data.logo = `/uploads/brands/${req.file.filename}`;
    }

    transaction = await db.sequelize.transaction();

    const [, [updatedBrand]] = await db.Brands.update(data, {
      where: { id },
      returning: true,
      transaction,
    });

    await transaction.commit();

    res.json({ success: true, data: updatedBrand || null });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    next(error);
  }
};
