import express from 'express';
import {
  createItemTypeData,
  getAllLimited,
  getGreaterThanMiddleId,
  getByMultipleValues,
  deleteByAttributeArray,
  updateItemTypeData,
} from '../controllers/itemTypesController.js';
import validate from '../middleware/validate.js';
import { deleteValuesSchema } from '../utils/deleteSchemas.js';
import { itemTypeCreateSchema, itemTypeUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', getAllLimited);
router.get('/middle', getGreaterThanMiddleId);
router.get('/multiple', getByMultipleValues);
router.post('/create', validate(itemTypeCreateSchema), createItemTypeData);
router.delete('/multiple', validate(deleteValuesSchema), deleteByAttributeArray);
router.patch('/update', validate(itemTypeUpdateSchema), updateItemTypeData);

export default router;
