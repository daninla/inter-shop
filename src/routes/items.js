import express from 'express';
import {
  createItemData,
  getAllLimited,
  getGreaterThanMiddleId,
  getByMultipleValues,
  deleteByAttributeArray,
  updateItemData,
} from '../controllers/itemsController.js';
import validate from '../middleware/validate.js';
import { deleteValuesSchema } from '../utils/deleteSchemas.js';
import { itemCreateSchema, itemUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', getAllLimited);
router.get('/middle', getGreaterThanMiddleId);
router.get('/multiple', getByMultipleValues);
router.post('/create', validate(itemCreateSchema), createItemData);
router.delete('/multiple', validate(deleteValuesSchema), deleteByAttributeArray);
router.patch('/update', validate(itemUpdateSchema), updateItemData);

export default router;
