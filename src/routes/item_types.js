import express from 'express';
import {
  getAllLimited,
  getGreaterThanMiddleId,
  getByMultipleValues,
  deleteByAttributeArray,
  updateItemTypeData,
} from '../controllers/itemTypesController.js';
import validate from '../middleware/validate.js';
import { deleteValuesSchema, itemTypeUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', getAllLimited);
router.get('/middle', getGreaterThanMiddleId);
router.get('/multiple', getByMultipleValues);
router.delete('/multiple', validate(deleteValuesSchema), deleteByAttributeArray);
router.patch('/update', validate(itemTypeUpdateSchema), updateItemTypeData);

export default router;
