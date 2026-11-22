import BaseController from "./BaseController.js";
import db from "../database/models/index.js";

export class ModelsController extends BaseController {
  constructor() {
    super(db.Models, {
      createFields: ["title", "brand_id", "description"],
    });
  }
}

export default new ModelsController();
