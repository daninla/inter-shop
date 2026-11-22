import express from 'express';
import itemsController from "../controllers/itemsController.js";
import validate from '../middleware/validate.js';
import { deleteValuesSchema } from '../utils/deleteSchemas.js';
import { itemCreateSchema, itemUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', itemsController.getAllLimited);
router.get('/middle', itemsController.getGreaterThanMiddleId);
router.get('/multiple', itemsController.getByMultipleValues);
router.post('/create', validate(itemCreateSchema), itemsController.create);
router.delete('/multiple', validate(deleteValuesSchema), itemsController.deleteByAttributeArray);
router.patch('/update', validate(itemUpdateSchema), itemsController.update);

export default router;
