import BaseController from "./BaseController.js";
import db from "../database/models/index.js";

export class ItemCategoriesController extends BaseController {
  constructor() {
    super(db.ItemCategories, {
      createFields: ["title", "description"],
    });
  }
}

export default new ItemCategoriesController();
