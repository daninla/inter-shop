import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _brands from  "./brands.js";
import _customers from  "./customers.js";
import _item_categories from  "./item_categories.js";
import _item_order from  "./item_order.js";
import _item_types from  "./item_types.js";
import _items from  "./items.js";
import _models from  "./models.js";
import _orders from  "./orders.js";
import _stores from  "./stores.js";

export default function initModels(sequelize) {
  const brands = _brands.init(sequelize, DataTypes);
  const customers = _customers.init(sequelize, DataTypes);
  const item_categories = _item_categories.init(sequelize, DataTypes);
  const item_order = _item_order.init(sequelize, DataTypes);
  const item_types = _item_types.init(sequelize, DataTypes);
  const items = _items.init(sequelize, DataTypes);
  const models = _models.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const stores = _stores.init(sequelize, DataTypes);


  return {
    brands,
    customers,
    item_categories,
    item_order,
    item_types,
    items,
    models,
    orders,
    stores,
  };
}
