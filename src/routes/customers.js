import express from 'express';
import {
  getAllLimited,
  getGreaterThanMiddleId,
  getByMultipleValues,
  deleteByAttributeArray,
  updateCustomerData,
} from '../controllers/customersController.js';
import validate from '../middleware/validate.js';
import { deleteValuesSchema, customerUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', getAllLimited);
router.get('/middle', getGreaterThanMiddleId);
router.get('/multiple', getByMultipleValues);
router.delete('/multiple', validate(deleteValuesSchema), deleteByAttributeArray);
router.patch('/update', validate(customerUpdateSchema), updateCustomerData);

export default router;
