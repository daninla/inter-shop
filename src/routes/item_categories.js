import express from 'express';
import {
  getAllLimited,
  getGreaterThanMiddleId,
  getByMultipleValues,
  deleteByAttributeArray,
  updateItemCategoryData,
} from '../controllers/itemCategoriesController.js';
import validate from '../middleware/validate.js';
import { deleteValuesSchema, itemCategoryUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', getAllLimited);
router.get('/middle', getGreaterThanMiddleId);
router.get('/multiple', getByMultipleValues);
router.delete('/multiple', validate(deleteValuesSchema), deleteByAttributeArray);
router.patch('/update', validate(itemCategoryUpdateSchema), updateItemCategoryData);

export default router;
