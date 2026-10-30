import express from 'express';
import brandsRoutes from './brands.js';
import customersRoutes from './customers.js';
import itemsRoutes from './items.js';
import modelsRoutes from './models.js';
import ordersRoutes from './orders.js';
import storesRoutes from './stores.js';
import itemCategoriesRoutes from './item_categories.js';
import itemTypesRoutes from './item_types.js';
import itemOrderRoutes from './item_order.js';

const router = express.Router();

router.use('/brands', brandsRoutes);
router.use('/customers', customersRoutes);
router.use('/items', itemsRoutes);
router.use('/models', modelsRoutes);
router.use('/orders', ordersRoutes);
router.use('/stores', storesRoutes);
router.use('/item-categories', itemCategoriesRoutes);
router.use('/item-types', itemTypesRoutes);
router.use('/item-order', itemOrderRoutes);

export default router;
