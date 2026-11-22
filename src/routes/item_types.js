import express from 'express';
import itemTypesController from "../controllers/itemTypesController.js";
import validate from '../middleware/validate.js';
import { deleteValuesSchema } from '../utils/deleteSchemas.js';
import { itemTypeCreateSchema, itemTypeUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', itemTypesController.getAllLimited);
router.get('/middle', itemTypesController.getGreaterThanMiddleId);
router.get('/multiple', itemTypesController.getByMultipleValues);
router.post('/create', validate(itemTypeCreateSchema), itemTypesController.create);
router.delete('/multiple', validate(deleteValuesSchema), itemTypesController.deleteByAttributeArray);
router.patch('/update', validate(itemTypeUpdateSchema), itemTypesController.update);

export default router;
