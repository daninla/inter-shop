import { Op } from "sequelize";
import db from "../database/models/index.js";
import { rollbackAndRespond } from "../utils/transactionResponse.js";

export const createItemCategoryData = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { title, description } = req.body;

    const newItemCategory = await db.ItemCategories.create(
      { title, description },
      { transaction },
    );

    await transaction.commit();

    res.status(201).json({ success: true, data: newItemCategory });
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

    const rows = await db.ItemCategories.findAll({
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

    const total = await db.ItemCategories.count({ transaction });
    const startFrom = Math.floor(total / 2);

    const rows = await db.ItemCategories.findAll({
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
    const ids = req.query.ids
      ? req.query.ids.split(",").map(Number)
      : [10, 11, 12];

    const rows = await db.ItemCategories.findAll({
      transaction,
      where: { id: { [Op.in]: ids } },
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
      return rollbackAndRespond(
        res,
        transaction,
        400,
        "values must be a non-empty array",
      );
    }

    const deleted = await db.ItemCategories.destroy({
      transaction,
      where: { id: { [Op.in]: values } },
    });

    await transaction.commit();

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const updateItemCategoryData = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { id, title, description } = req.body;

    if (!id) {
      return rollbackAndRespond(
        res,
        transaction,
        400,
        "id is required",
      );
    }

    const [, [updatedCategory]] = await db.ItemCategories.update(
      { title, description },
      { where: { id }, returning: true, transaction },
    );

    await transaction.commit();

    res.json({ success: true, data: updatedCategory || null });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
