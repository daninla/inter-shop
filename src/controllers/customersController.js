import { Op } from "sequelize";
import db from "../database/models/index.js";
import { rollbackAndRespond, rollbackTransaction } from "../utils/transactionResponse.js";

export const createCustomerData = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const { name, email, password } = req.body;

    const newCustomer = await db.Customers.create(
      { name, email, password },
      { transaction },
    );

    await transaction.commit();

    res.status(201).json({ success: true, data: newCustomer });
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

    const rows = await db.Customers.findAll({
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

    const total = await db.Customers.count({ transaction });
    const offset = Math.floor(total / 2);

    const rows = await db.Customers.findAll({
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

    const rows = await db.Customers.findAll({
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

    const deleted = await db.Customers.destroy({
      transaction,
      where: { email: { [Op.in]: values } },
    });

    await transaction.commit();

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    await rollbackTransaction(transaction);
    next(error);
  }
};

export const updateCustomerData = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();
    const { id, name, email } = req.body;

    if (!id) {
      return await rollbackAndRespond(
        res,
        transaction,
        400,
        "id is required",
      );
    }

    const [, [updatedCustomer]] = await db.Customers.update(
      { name, email },
      { where: { id }, returning: true, transaction },
    );

    await transaction.commit();

    res.json({ success: true, data: updatedCustomer || null });
  } catch (error) {
    await rollbackTransaction(transaction);
    next(error);
  }
};

export const getCustomerWithMostOrders = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    const [rows] = await db.sequelize.query(
      `
      SELECT
        c.name,
        COUNT(o.order_id) AS purchases_count
      FROM customers AS c
      LEFT JOIN orders AS o ON o.customer = c.id
      GROUP BY c.id, c.name
      ORDER BY purchases_count DESC, c.id ASC
      LIMIT 1;
    `,
      { transaction },
    );

    await transaction.commit();

    res.json({ success: true, data: rows[0] || null });
  } catch (error) {
    await rollbackTransaction(transaction);
    next(error);
  }
};

export const getCustomerWithMostExpensiveItem = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    const [rows] = await db.sequelize.query(
      `
      SELECT
        c.name,
        MAX(i.price) AS max_item_price
      FROM customers AS c
      JOIN orders AS o ON o.customer = c.id
      JOIN item_order AS io ON io.order_id = o.order_id
      JOIN items AS i ON i.item_id = io.item_id
      GROUP BY c.id, c.name
      ORDER BY max_item_price DESC, c.id ASC
      LIMIT 1;
    `,
      { transaction },
    );

    await transaction.commit();

    res.json({ success: true, data: rows[0] || null });
  } catch (error) {
    await rollbackTransaction(transaction);
    next(error);
  }
};
