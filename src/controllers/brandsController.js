import BaseController from "./BaseController.js";
import db from "../database/models/index.js";

export class BrandsController extends BaseController {
  constructor() {
    super(db.Brands, {
      createFields: ["title", "description"],
      filterField: "title",
      queryParameter: "titles",
      defaultValues: ["Samsung", "Dell", "Xiaomi"],
      numericValues: false,
      idFromParams: true,
    });
  }

  getCreateData(req) {
    return {
      ...super.getCreateData(req),
      logo: req.file ? `/uploads/brands/${req.file.filename}` : null,
    };
  }

  updateBrandLogo = async (req, res, next) => {
    const { id } = req.params;
    if (!id || !req.file) {
      return res.status(400).json({
        success: false,
        message: !id ? "id is required" : "logo file is required",
      });
    }
    return this.execute(res, next, async (transaction) => {
      const logo = `/uploads/brands/${req.file.filename}`;
      const [, [updatedBrand]] = await this.model.update(
        { logo },
        { where: { id }, returning: true, transaction },
      );
      return { data: updatedBrand || null };
    });
  };
}

export default new BrandsController();
