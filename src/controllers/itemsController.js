import BaseController from "./BaseController.js";
import db from "../database/models/index.js";

export class ItemsController extends BaseController {
  constructor() {
    super(db.Items, {
      createFields: ["brand_id", "model_id", "type_id", "categ_id", "store_id", "price", "amount"],
      updateFields: ["price", "amount"],
      filterField: "brand_id",
    });
  }
}

export default new ItemsController();
