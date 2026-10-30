import express from 'express';
import {
  getAllLimited,
  getGreaterThanMiddleId,
  getByMultipleValues,
  deleteByAttributeArray,
  updateItemData,
} from '../controllers/itemsController.js';
import validate from '../middleware/validate.js';
import { deleteValuesSchema, itemUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', getAllLimited);
router.get('/middle', getGreaterThanMiddleId);
router.get('/multiple', getByMultipleValues);
router.delete('/multiple', validate(deleteValuesSchema), deleteByAttributeArray);
router.patch('/update', validate(itemUpdateSchema), updateItemData);

export default router;
