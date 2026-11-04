import express from 'express';
import {
  createCustomerData,
  getAllLimited,
  getGreaterThanMiddleId,
  getByMultipleValues,
  deleteByAttributeArray,
  updateCustomerData,
  getCustomerWithMostOrders,
  getCustomerWithMostExpensiveItem,
} from '../controllers/customersController.js';
import validate from '../middleware/validate.js';
import { deleteValuesSchema } from '../utils/deleteSchemas.js';
import { customerCreateSchema, customerUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', getAllLimited);
router.get('/middle', getGreaterThanMiddleId);
router.get('/multiple', getByMultipleValues);
router.get('/top-orders', getCustomerWithMostOrders);
router.get('/top-expensive-item', getCustomerWithMostExpensiveItem);
router.post('/create', validate(customerCreateSchema), createCustomerData);
router.delete('/multiple', validate(deleteValuesSchema), deleteByAttributeArray);
router.patch('/update', validate(customerUpdateSchema), updateCustomerData);

export default router;
