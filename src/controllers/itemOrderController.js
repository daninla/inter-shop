import BaseController from "./BaseController.js";
import db from "../database/models/index.js";

export class ItemOrderController extends BaseController {
  constructor() {
    super(db.ItemOrder, {
      createFields: ["item_id", "order_id"],
    });
  }

  update = async (req, res, next) => {
    const { item_id, order_id, newItemId, newOrderId } = req.body;
    if (!item_id || !order_id) {
      return res.status(400).json({
        success: false,
        message: "item_id and order_id are required",
      });
    }
    return this.execute(res, next, async (transaction) => {
      const where = { item_id, order_id };
      const currentRecord = await this.model.findOne({
        where,
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!currentRecord) {
        const error = new Error("item_order not found");
        error.status = 404;
        throw error;
      }

      // Static update can change the composite primary key; instance.update cannot.
      const [, [updatedRecord]] = await this.model.update(
        { item_id: newItemId ?? item_id, order_id: newOrderId ?? order_id },
        { where, returning: true, transaction },
      );
      return { data: updatedRecord };
    });
  };
}

export default new ItemOrderController();
