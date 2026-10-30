import express from 'express';
import brandsRoutes from './brands.js';
import customersRoutes from './customers.js';
import itemsRoutes from './items.js';

const router = express.Router();

router.use('/brands', brandsRoutes);
router.use('/customers', customersRoutes);
router.use('/items', itemsRoutes);

export default router;
