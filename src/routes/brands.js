import express from "express";
import {
  createBrandData,
  getAllLimited,
  getGreaterThanMiddleId,
  getByMultipleValues,
  deleteByAttributeArray,
  updateBrandData,
  updateBrandLogo,
} from "../controllers/brandsController.js";
import validate from "../middleware/validate.js";
import multerBrandLogo from "../middleware/multerBrandLogo.js";
import { deleteValuesSchema } from "../utils/deleteSchemas.js";
import {
  brandCreateSchema,
  brandUpdateSchema,
} from "../utils/validationSchemas.js";

const router = express.Router();

router.get("/limited", getAllLimited);
router.get("/middle", getGreaterThanMiddleId);
router.get("/multiple", getByMultipleValues);
router.post(
  "/create",
  multerBrandLogo.single("logo"),
  validate(brandCreateSchema),
  createBrandData,
);
router.delete(
  "/multiple",
  validate(deleteValuesSchema),
  deleteByAttributeArray,
);
router.put("/update/:id", validate(brandUpdateSchema), updateBrandData);
router.put("/update-logo/:id", multerBrandLogo.single("logo"), updateBrandLogo);

export default router;
