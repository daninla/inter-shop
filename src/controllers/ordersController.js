import { Op } from "sequelize";
import db from "../../database/models/index.js";

export const createOrderData = async (req, res, next) => {
  let transaction;
  try {
    const { code, date, customer, amount, paid } = req.body;

    transaction = await db.sequelize.transaction();

    const newOrder = await db.Orders.create(
      { code, date, customer, amount, paid },
      { transaction },
    );

    await transaction.commit();

    res.status(201).json({ success: true, data: newOrder });
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

    const rows = await db.Orders.findAll({
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

    const total = await db.Orders.count({ transaction });
    const startFrom = Math.floor(total / 2);

    const rows = await db.Orders.findAll({
      transaction,
      where: { order_id: { [Op.gt]: startFrom } },
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
    const ids = req.query.ids
      ? req.query.ids.split(",").map(Number)
      : [10, 11, 12];

    transaction = await db.sequelize.transaction();

    const rows = await db.Orders.findAll({
      transaction,
      where: { customer: { [Op.in]: ids } },
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

    const deleted = await db.Orders.destroy({
      transaction,
      where: { customer: { [Op.in]: values } },
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

export const updateOrderData = async (req, res, next) => {
  let transaction;
  try {
    const { order_id, code, date, customer, amount, paid } = req.body;

    if (!order_id) {
      return res
        .status(400)
        .json({ success: false, message: "order_id is required" });
    }

    transaction = await db.sequelize.transaction();

    const [, [updatedOrder]] = await db.Orders.update(
      { code, date, customer, amount, paid },
      { where: { order_id }, returning: true, transaction },
    );

    await transaction.commit();

    res.json({ success: true, data: updatedOrder || null });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    next(error);
  }
};
