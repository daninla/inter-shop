import { Op } from "sequelize";
import db from "../database/models/index.js";
import { rollbackAndRespond, rollbackTransaction } from "../utils/transactionResponse.js";

export const createModelData = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const { title, brand_id, description } = req.body;

    const newModel = await db.Models.create(
      { title, brand_id, description },
      { transaction },
    );

    await transaction.commit();

    res.status(201).json({ success: true, data: newModel });
  } catch (error) {
    await rollbackTransaction(transaction);
    next(error);
  }
};

export const getAllLimited = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const limit = Number(req.query.limit) || 10;
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const rows = await db.Models.findAll({
      transaction,
      limit: safeLimit,
    });

    await transaction.commit();

    res.json({ success: true, data: rows });
  } catch (error) {
    await rollbackTransaction(transaction);
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    const total = await db.Models.count({ transaction });
    const offset = Math.floor(total / 2);

    const rows = await db.Models.findAll({
      transaction,
      offset,
      order: [['id', 'ASC']],
    });

    await transaction.commit();

    res.json({ success: true, data: rows });
  } catch (error) {
    await rollbackTransaction(transaction);
    next(error);
  }
};

export const getByMultipleValues = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const ids = req.query.ids
      ? req.query.ids.split(",").map(Number)
      : [10, 11, 12];

    const rows = await db.Models.findAll({
      transaction,
      where: { id: { [Op.in]: ids } },
    });

    await transaction.commit();

    res.json({ success: true, data: rows });
  } catch (error) {
    await rollbackTransaction(transaction);
    next(error);
  }
};

export const deleteByAttributeArray = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const { values } = req.body;

    if (!Array.isArray(values) || !values.length) {
      return await rollbackAndRespond(
        res,
        transaction,
        400,
        "values must be a non-empty array",
      );
    }

    const deleted = await db.Models.destroy({
      transaction,
      where: { id: { [Op.in]: values } },
    });

    await transaction.commit();

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    await rollbackTransaction(transaction);
    next(error);
  }
};

export const updateModelData = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const { id, title, brand_id, description } = req.body;

    if (!id) {
      return await rollbackAndRespond(
        res,
        transaction,
        400,
        "id is required",
      );
    }

    const [, [updatedModel]] = await db.Models.update(
      { title, brand_id, description },
      { where: { id }, returning: true, transaction },
    );

    await transaction.commit();

    res.json({ success: true, data: updatedModel || null });
  } catch (error) {
    await rollbackTransaction(transaction);
    next(error);
  }
};
