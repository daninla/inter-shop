import { Op } from "sequelize";
import db from "../database/models/index.js";
import { rollbackAndRespond, rollbackTransaction } from "../utils/transactionResponse.js";

export const createItemData = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const { brand_id, model_id, type_id, categ_id, store_id, price, amount } = req.body;

    const newItem = await db.Items.create(
      {
        brand_id,
        model_id,
        type_id,
        categ_id,
        store_id,
        price,
        amount,
      },
      { transaction },
    );

    await transaction.commit();

    res.status(201).json({ success: true, data: newItem });
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

    const rows = await db.Items.findAll({
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

    const total = await db.Items.count({ transaction });
    const offset = Math.floor(total / 2);

    const rows = await db.Items.findAll({
      transaction,
      offset,
      order: [['item_id', 'ASC']],
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

    const rows = await db.Items.findAll({
      transaction,
      where: { brand_id: { [Op.in]: ids } },
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

    const deleted = await db.Items.destroy({
      transaction,
      where: { brand_id: { [Op.in]: values } },
    });

    await transaction.commit();

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    await rollbackTransaction(transaction);
    next(error);
  }
};

export const updateItemData = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const { item_id, price, amount } = req.body;

    if (!item_id) {
      return await rollbackAndRespond(
        res,
        transaction,
        400,
        "item_id is required",
      );
    }

    const [, [updatedItem]] = await db.Items.update(
      { price, amount },
      { where: { item_id }, returning: true, transaction },
    );

    await transaction.commit();

    res.json({ success: true, data: updatedItem || null });
  } catch (error) {
    await rollbackTransaction(transaction);
    next(error);
  }
};
