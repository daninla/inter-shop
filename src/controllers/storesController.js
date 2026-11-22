import BaseController from "./BaseController.js";
import db from "../database/models/index.js";

export class StoresController extends BaseController {
  constructor() {
    super(db.Stores, {
      createFields: ["title", "description"],
    });
  }
}

export default new StoresController();
