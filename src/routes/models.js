import express from 'express';
import {
  createModelData,
  getAllLimited,
  getGreaterThanMiddleId,
  getByMultipleValues,
  deleteByAttributeArray,
  updateModelData,
} from '../controllers/modelsController.js';
import validate from '../middleware/validate.js';
import { deleteValuesSchema } from '../utils/deleteSchemas.js';
import { modelCreateSchema, modelUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', getAllLimited);
router.get('/middle', getGreaterThanMiddleId);
router.get('/multiple', getByMultipleValues);
router.post('/create', validate(modelCreateSchema), createModelData);
router.delete('/multiple', validate(deleteValuesSchema), deleteByAttributeArray);
router.patch('/update', validate(modelUpdateSchema), updateModelData);

export default router;
