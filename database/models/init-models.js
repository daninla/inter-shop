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
  const Brands = _brands.init(sequelize, DataTypes);
  const Customers = _customers.init(sequelize, DataTypes);
  const ItemCategories = _item_categories.init(sequelize, DataTypes);
  const ItemOrder = _item_order.init(sequelize, DataTypes);
  const ItemTypes = _item_types.init(sequelize, DataTypes);
  const Items = _items.init(sequelize, DataTypes);
  const Models = _models.init(sequelize, DataTypes);
  const Orders = _orders.init(sequelize, DataTypes);
  const Stores = _stores.init(sequelize, DataTypes);

  return {
    Brands,
    Customers,
    ItemCategories,
    ItemOrder,
    ItemTypes,
    Items,
    Models,
    Orders,
    Stores,
  };
}
