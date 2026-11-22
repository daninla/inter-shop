import express from 'express';
import ordersController from "../controllers/ordersController.js";
import validate from '../middleware/validate.js';
import { deleteValuesSchema } from '../utils/deleteSchemas.js';
import { orderCreateSchema, orderUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', ordersController.getAllLimited);
router.get('/middle', ordersController.getGreaterThanMiddleId);
router.get('/multiple', ordersController.getByMultipleValues);
router.post('/create', validate(orderCreateSchema), ordersController.create);
router.delete('/multiple', validate(deleteValuesSchema), ordersController.deleteByAttributeArray);
router.patch('/update', validate(orderUpdateSchema), ordersController.update);

export default router;
