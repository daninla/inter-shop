import express from 'express';
import modelsController from "../controllers/modelsController.js";
import validate from '../middleware/validate.js';
import { deleteValuesSchema } from '../utils/deleteSchemas.js';
import { modelCreateSchema, modelUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', modelsController.getAllLimited);
router.get('/middle', modelsController.getGreaterThanMiddleId);
router.get('/multiple', modelsController.getByMultipleValues);
router.post('/create', validate(modelCreateSchema), modelsController.create);
router.delete('/multiple', validate(deleteValuesSchema), modelsController.deleteByAttributeArray);
router.patch('/update', validate(modelUpdateSchema), modelsController.update);

export default router;
