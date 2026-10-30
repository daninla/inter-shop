import express from 'express';
import {
  getAllLimited,
  getGreaterThanMiddleId,
  getByMultipleValues,
  deleteByAttributeArray,
  updateOrderData,
} from '../controllers/ordersController.js';
import validate from '../middleware/validate.js';
import { deleteValuesSchema, orderUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', getAllLimited);
router.get('/middle', getGreaterThanMiddleId);
router.get('/multiple', getByMultipleValues);
router.delete('/multiple', validate(deleteValuesSchema), deleteByAttributeArray);
router.patch('/update', validate(orderUpdateSchema), updateOrderData);

export default router;
