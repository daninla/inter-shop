import express from 'express';
import storesController from "../controllers/storesController.js";
import validate from '../middleware/validate.js';
import { deleteValuesSchema } from '../utils/deleteSchemas.js';
import { storeCreateSchema, storeUpdateSchema } from '../utils/validationSchemas.js';

const router = express.Router();

router.get('/limited', storesController.getAllLimited);
router.get('/middle', storesController.getGreaterThanMiddleId);
router.get('/multiple', storesController.getByMultipleValues);
router.post('/create', validate(storeCreateSchema), storesController.create);
router.delete('/multiple', validate(deleteValuesSchema), storesController.deleteByAttributeArray);
router.patch('/update', validate(storeUpdateSchema), storesController.update);

export default router;
