import express from 'express';
import itemOrderController from "../controllers/itemOrderController.js";
import validate from '../middleware/validate.js';
import { deleteValuesSchema } from '../utils/deleteSchemas.js';
import { itemOrderCreateSchema, itemOrderUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', itemOrderController.getAllLimited);
router.get('/middle', itemOrderController.getGreaterThanMiddleId);
router.get('/multiple', itemOrderController.getByMultipleValues);
router.post('/create', validate(itemOrderCreateSchema), itemOrderController.create);
router.delete('/multiple', validate(deleteValuesSchema), itemOrderController.deleteByAttributeArray);
router.patch('/update', validate(itemOrderUpdateSchema), itemOrderController.update);

export default router;
