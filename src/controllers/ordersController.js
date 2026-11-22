import BaseController from "./BaseController.js";
import db from "../database/models/index.js";

export class OrdersController extends BaseController {
  constructor() {
    super(db.Orders, {
      createFields: ["code", "date", "customer", "amount", "paid"],
      filterField: "customer",
    });
  }
}

export default new OrdersController();
