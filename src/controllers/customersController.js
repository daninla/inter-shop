import { Op } from "sequelize";
import db from "../../database/models/index.js";

export const createCustomerData = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const newCustomer = await db.Customers.create({ name, email });

    res.status(201).json({ success: true, data: newCustomer });
  } catch (error) {
    next(error);
  }
};

export const getAllLimited = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const safeLimit = Math.max(1, Math.min(limit, 100));

    const rows = await db.Customers.findAll({
      limit: safeLimit,
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  try {
    const total = await db.Customers.count();
    const startFrom = Math.floor(total / 2);

    const rows = await db.Customers.findAll({
      where: { id: { [Op.gt]: startFrom } },
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getByMultipleValues = async (req, res, next) => {
  try {
    const ids = req.query.ids
      ? req.query.ids.split(",").map(Number)
      : [10, 11, 12];

    const rows = await db.Customers.findAll({
      where: { id: { [Op.in]: ids } },
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const deleteByAttributeArray = async (req, res, next) => {
  try {
    const { values } = req.body;

    if (!Array.isArray(values) || !values.length) {
      return res
        .status(400)
        .json({ success: false, message: "values must be a non-empty array" });
    }

    const deleted = await db.Customers.destroy({
      where: { email: { [Op.in]: values } },
    });

    res.json({ success: true, deletedCount: deleted });
  } catch (error) {
    next(error);
  }
};

export const updateCustomerData = async (req, res, next) => {
  try {
    const { id, name, email } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "id is required" });
    }

    const [, [updatedCustomer]] = await db.Customers.update(
      { name, email },
      { where: { id }, returning: true },
    );

    res.json({ success: true, data: updatedCustomer || null });
  } catch (error) {
    next(error);
  }
};
