import express from 'express';
import {
  getAllLimited,
  getGreaterThanMiddleId,
  getByMultipleValues,
  deleteByAttributeArray,
  updateModelData,
} from '../controllers/modelsController.js';
import validate from '../middleware/validate.js';
import { deleteValuesSchema, modelUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', getAllLimited);
router.get('/middle', getGreaterThanMiddleId);
router.get('/multiple', getByMultipleValues);
router.delete('/multiple', validate(deleteValuesSchema), deleteByAttributeArray);
router.patch('/update', validate(modelUpdateSchema), updateModelData);

export default router;
