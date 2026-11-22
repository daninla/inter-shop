import express from 'express';
import customersController from "../controllers/customersController.js";
import validate from '../middleware/validate.js';
import { deleteValuesSchema } from '../utils/deleteSchemas.js';
import { customerCreateSchema, customerUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', customersController.getAllLimited);
router.get('/middle', customersController.getGreaterThanMiddleId);
router.get('/multiple', customersController.getByMultipleValues);
router.get('/top-orders', customersController.getCustomerWithMostOrders);
router.get('/top-expensive-item', customersController.getCustomerWithMostExpensiveItem);
router.post('/create', validate(customerCreateSchema), customersController.create);
router.delete('/multiple', validate(deleteValuesSchema), customersController.deleteByAttributeArray);
router.patch('/update', validate(customerUpdateSchema), customersController.update);

export default router;
