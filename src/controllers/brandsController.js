import { Op } from "sequelize";
import db from "../database/models/index.js";
import { rollbackAndRespond } from "../utils/transactionResponse.js";

export const createBrandData = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { title, description } = req.body;

    const logo = req.file ? `/uploads/brands/${req.file.filename}` : null;

    const newBrand = await db.Brands.create(
      { title, description, logo },
      { transaction },
    );

    await transaction.commit();

    res.status(201).json({ success: true, data: newBrand });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const getAllLimited = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const limit = Number(req.query.limit) || 10;
    const safeLimit = Math.max(1, Math.min(limit, 100));


    const rows = await db.Brands.findAll({
      transaction,
      limit: safeLimit,
    });

    await transaction.commit();

    res.json({ success: true, data: rows });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {

    const total = await db.Brands.count({ transaction });
    const startFrom = Math.floor(total / 2);

    const rows = await db.Brands.findAll({
      transaction,
      where: { id: { [Op.gt]: startFrom } },
    });

    await transaction.commit();

    res.json({ success: true, data: rows });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const getByMultipleValues = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const titles = req.query.titles
      ? req.query.titles.split(",")
      : ["Samsung", "Dell", "Xiaomi"];


    const rows = await db.Brands.findAll({
      transaction,
      where: { title: { [Op.in]: titles } },
    });

    await transaction.commit();

    res.json({ success: true, data: rows });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const deleteByAttributeArray = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { values } = req.body;

    if (!Array.isArray(values) || !values.length) {
      return rollbackAndRespond(res, transaction, 400, "values must be a non-empty array");
    }


    const deleted = await db.Brands.destroy({
      transaction,
      where: { title: { [Op.in]: values } },
    });

    await transaction.commit();

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const updateBrandData = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!id) {
      return rollbackAndRespond(res, transaction, 400, "id is required");
    }

    const data = { title, description };

    const [, [updatedBrand]] = await db.Brands.update(data, {
      where: { id },
      returning: true,
      transaction,
    });

    await transaction.commit();

    res.json({ success: true, data: updatedBrand || null });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const updateBrandLogo = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;

    if (!id) {
      return rollbackAndRespond(res, transaction, 400, "id is required");
    }

    if (!req.file) {
      return rollbackAndRespond(res, transaction, 400, "logo file is required");
    }

    const logo = `/uploads/brands/${req.file.filename}`;

    const [, [updatedBrand]] = await db.Brands.update(
      { logo },
      { where: { id }, returning: true, transaction },
    );

    await transaction.commit();

    res.json({ success: true, data: updatedBrand || null });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};