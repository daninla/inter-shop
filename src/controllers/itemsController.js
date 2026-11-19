import { Op } from "sequelize";
import db from "../../database/models/index.js";

export const createItemData = async (req, res, next) => {
  let transaction;
  try {
    const { brand_id, model_id, item_type_id, title, price, amount } = req.body;

    transaction = await db.sequelize.transaction();

    const newItem = await db.Items.create(
      {
        brand_id,
        model_id,
        item_type_id,
        title,
        price,
        amount,
      },
      { transaction },
    );

    await transaction.commit();

    res.status(201).json({ success: true, data: newItem });
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

    const rows = await db.Items.findAll({
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

    const total = await db.Items.count({ transaction });
    const startFrom = Math.floor(total / 2);

    const rows = await db.Items.findAll({
      transaction,
      where: { item_id: { [Op.gt]: startFrom } },
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

    const rows = await db.Items.findAll({
      transaction,
      where: { brand_id: { [Op.in]: ids } },
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

    const deleted = await db.Items.destroy({
      transaction,
      where: { brand_id: { [Op.in]: values } },
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

export const updateItemData = async (req, res, next) => {
  let transaction;
  try {
    const { item_id, price, amount } = req.body;

    if (!item_id) {
      return res
        .status(400)
        .json({ success: false, message: "item_id is required" });
    }

    transaction = await db.sequelize.transaction();

    const [, [updatedItem]] = await db.Items.update(
      { price, amount },
      { where: { item_id }, returning: true, transaction },
    );

    await transaction.commit();

    res.json({ success: true, data: updatedItem || null });
  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }
    next(error);
  }
};
