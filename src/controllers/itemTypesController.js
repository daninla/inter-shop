import { Op } from "sequelize";
import db from "../database/models/index.js";
import { rollbackAndRespond, rollbackTransaction } from "../utils/transactionResponse.js";

export const createItemTypeData = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const { title, description } = req.body;

    const newItemType = await db.ItemTypes.create(
      { title, description },
      { transaction },
    );

    await transaction.commit();

    res.status(201).json({ success: true, data: newItemType });
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

    const rows = await db.ItemTypes.findAll({
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

    const total = await db.ItemTypes.count({ transaction });
    const offset = Math.floor(total / 2);

    const rows = await db.ItemTypes.findAll({
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

    const rows = await db.ItemTypes.findAll({
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

    const deleted = await db.ItemTypes.destroy({
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

export const updateItemTypeData = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const { id, title, description } = req.body;

    if (!id) {
      return await rollbackAndRespond(
        res,
        transaction,
        400,
        "id is required",
      );
    }

    const [, [updatedType]] = await db.ItemTypes.update(
      { title, description },
      { where: { id }, returning: true, transaction },
    );

    await transaction.commit();

    res.json({ success: true, data: updatedType || null });
  } catch (error) {
    await rollbackTransaction(transaction);
    next(error);
  }
};
