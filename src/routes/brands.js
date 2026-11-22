import express from "express";
import brandsController from "../controllers/brandsController.js";
import validate from "../middleware/validate.js";
import multerBrandLogo from "../middleware/multerBrandLogo.js";
import { deleteValuesSchema } from "../utils/deleteSchemas.js";
import {
  brandCreateSchema,
  brandUpdateSchema,
} from "../utils/validationSchemas.js";

const router = express.Router();

router.get("/limited", brandsController.getAllLimited);
router.get("/middle", brandsController.getGreaterThanMiddleId);
router.get("/multiple", brandsController.getByMultipleValues);
router.post(
  "/create",
  multerBrandLogo.single("logo"),
  validate(brandCreateSchema),
  brandsController.create,
);
router.delete(
  "/multiple",
  validate(deleteValuesSchema),
  brandsController.deleteByAttributeArray,
);
router.put("/update/:id", validate(brandUpdateSchema), brandsController.update);
router.put("/update-logo/:id", multerBrandLogo.single("logo"), brandsController.updateBrandLogo);

export default router;
