import express from 'express';
import itemCategoriesController from "../controllers/itemCategoriesController.js";
import validate from '../middleware/validate.js';
import { deleteValuesSchema } from '../utils/deleteSchemas.js';
import { itemCategoryCreateSchema, itemCategoryUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', itemCategoriesController.getAllLimited);
router.get('/middle', itemCategoriesController.getGreaterThanMiddleId);
router.get('/multiple', itemCategoriesController.getByMultipleValues);
router.post('/create', validate(itemCategoryCreateSchema), itemCategoriesController.create);
router.delete('/multiple', validate(deleteValuesSchema), itemCategoriesController.deleteByAttributeArray);
router.patch('/update', validate(itemCategoryUpdateSchema), itemCategoriesController.update);

export default router;
