import { Op } from "sequelize";
import { models } from "../db.js";

export const getAllLimited = async (req, res, next) => {
  try {
    const rows = await models.customers.findAll({
      limit: 10,
      order: ["id"],
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getGreaterThanMiddleId = async (req, res, next) => {
  try {
    const total = await models.customers.count();
    const startFrom = Math.floor(total / 2);

    const rows = await models.customers.findAll({
      where: { id: { [Op.gt]: startFrom } },
      order: ["id"],
    });

    res.json({ success: true, startFrom, total, data: rows });
  } catch (error) {
    next(error);
  }
};

export const getByMultipleValues = async (req, res, next) => {
  try {
    const ids = req.query.ids
      ? req.query.ids.split(",").map(Number)
      : [10, 11, 12];

    const rows = await models.customers.findAll({
      where: { id: { [Op.in]: ids } },
      order: ["id"],
    });

    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

export const deleteByAttributeArray = async (req, res, next) => {
  const attribute = "email";
  try {
    const { values } = req.body;

    if (!Array.isArray(values) || !values.length) {
      return res
        .status(400)
        .json({ success: false, message: "values must be a non-empty array" });
    }

    const deleted = await models.customers.destroy({
      where: { [attribute]: { [Op.in]: values } },
    });

    res.json({ success: true, deletedCount: deleted, attribute });
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

    const [updatedRows, [updatedCustomer]] = await models.customers.update(
      { name, email },
      { where: { id }, returning: true },
    );

    res.json({ success: true, updatedRows, data: updatedCustomer || null });
  } catch (error) {
    next(error);
  }
};
