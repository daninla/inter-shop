import express from 'express';
import {
  getAllLimited,
  getGreaterThanMiddleId,
  getByMultipleValues,
  deleteByAttributeArray,
  updateItemOrderData,
} from '../controllers/itemOrderController.js';
import validate from '../middleware/validate.js';
import { deleteValuesSchema, itemOrderUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', getAllLimited);
router.get('/middle', getGreaterThanMiddleId);
router.get('/multiple', getByMultipleValues);
router.delete('/multiple', validate(deleteValuesSchema), deleteByAttributeArray);
router.patch('/update', validate(itemOrderUpdateSchema), updateItemOrderData);

export default router;
