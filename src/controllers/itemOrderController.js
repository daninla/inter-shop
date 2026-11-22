import { Op } from "sequelize";
import db from "../database/models/index.js";
import { rollbackAndRespond } from "../utils/transactionResponse.js";

export const createItemOrderData = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { item_id, order_id } = req.body;

    const newItemOrder = await db.ItemOrder.create(
      { item_id, order_id },
      { transaction },
    );

    await transaction.commit();

    res.status(201).json({ success: true, data: newItemOrder });
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

    const rows = await db.ItemOrder.findAll({
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

    const total = await db.ItemOrder.count({ transaction });
    const startFrom = Math.floor(total / 2);

    const rows = await db.ItemOrder.findAll({
      transaction,
      where: { item_id: { [Op.gt]: startFrom } },
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

    const rows = await db.ItemOrder.findAll({
      transaction,
      where: { item_id: { [Op.in]: ids } },
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

    const deleted = await db.ItemOrder.destroy({
      transaction,
      where: { item_id: { [Op.in]: values } },
    });

    await transaction.commit();

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};

export const updateItemOrderData = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { item_id, order_id, newItemId, newOrderId } = req.body;

    if (!item_id || !order_id) {
      return rollbackAndRespond(
        res,
        transaction,
        400,
        "item_id and order_id are required",
      );
    }

    const payload = {
      item_id: newItemId ?? item_id,
      order_id: newOrderId ?? order_id,
    };

    const currentRecord = await db.ItemOrder.findOne({
      where: { item_id, order_id },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (!currentRecord) {
      return rollbackAndRespond(
        res,
        transaction,
        404,
        "item_order not found",
      );
    }

    await currentRecord.update(payload, { transaction });

    await transaction.commit();

    res.json({ success: true, data: currentRecord });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
