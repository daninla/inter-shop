import { Op } from "sequelize";
import { rollbackTransaction } from "../utils/transactionResponse.js";

export default class BaseController {
  constructor(model, options) {
    this.model = model;
    this.primaryKey = model.primaryKeyAttribute;
    this.createFields = options.createFields;
    this.updateFields = options.updateFields || options.createFields;
    this.filterField = options.filterField || this.primaryKey;
    this.deleteField = options.deleteField || this.filterField;
    this.queryParameter = options.queryParameter || "ids";
    this.defaultValues = options.defaultValues || [10, 11, 12];
    this.numericValues = options.numericValues ?? true;
    this.idFromParams = options.idFromParams || false;
  }

  async execute(res, next, action, status = 200) {
    let transaction;
    try {
      transaction = await this.model.sequelize.transaction();
      const result = await action(transaction);
      await transaction.commit();
      return res.status(status).json({ success: true, ...result });
    } catch (error) {
      await rollbackTransaction(transaction);
      if (error.status) {
        return res
          .status(error.status)
          .json({ success: false, message: error.message });
      }
      next(error);
    }
  }

  pickFields(body, fields) {
    return Object.fromEntries(fields.map((field) => [field, body[field]]));
  }

  getCreateData(req) {
    return this.pickFields(req.body, this.createFields);
  }

  create = async (req, res, next) => {
    return this.execute(
      res,
      next,
      async (transaction) => {
        const data = await this.model.create(this.getCreateData(req), {
          transaction,
        });
        return { data };
      },
      201,
    );
  };

  getAllLimited = async (req, res, next) => {
    return this.execute(res, next, async (transaction) => {
      const limit = Number(req.query.limit) || 10;
      const safeLimit = Math.max(1, Math.min(limit, 100));
      const data = await this.model.findAll({ limit: safeLimit, transaction });
      return { data };
    });
  };

  getGreaterThanMiddleId = async (req, res, next) => {
    return this.execute(res, next, async (transaction) => {
      const total = await this.model.count({ transaction });
      const data = await this.model.findAll({
        offset: Math.floor(total / 2),
        order: this.model.primaryKeyAttributes.map((key) => [key, "ASC"]),
        transaction,
      });
      return { data };
    });
  };

  getByMultipleValues = async (req, res, next) => {
    return this.execute(res, next, async (transaction) => {
      const query = req.query[this.queryParameter];
      const values = query
        ? query
            .split(",")
            .map((value) => (this.numericValues ? Number(value) : value))
        : this.defaultValues;
      const data = await this.model.findAll({
        where: { [this.filterField]: { [Op.in]: values } },
        transaction,
      });
      return { data };
    });
  };

  deleteByAttributeArray = async (req, res, next) => {
    const { values } = req.body;
    if (!Array.isArray(values) || !values.length) {
      return res
        .status(400)
        .json({ success: false, message: "values must be a non-empty array" });
    }
    return this.execute(res, next, async (transaction) => {
      const deletedCount = await this.model.destroy({
        where: { [this.deleteField]: { [Op.in]: values } },
        transaction,
      });
      return { deletedCount };
    });
  };

  update = async (req, res, next) => {
    const id = this.idFromParams ? req.params.id : req.body[this.primaryKey];
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: `${this.primaryKey} is required` });
    }
    return this.execute(res, next, async (transaction) => {
      const [, [updatedRecord]] = await this.model.update(
        this.pickFields(req.body, this.updateFields),
        { where: { [this.primaryKey]: id }, returning: true, transaction },
      );
      return { data: updatedRecord || null };
    });
  };
}
