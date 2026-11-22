import BaseController from "./BaseController.js";
import db from "../database/models/index.js";

export class ItemTypesController extends BaseController {
  constructor() {
    super(db.ItemTypes, {
      createFields: ["title", "description"],
    });
  }
}

export default new ItemTypesController();
