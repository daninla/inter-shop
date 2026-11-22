import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Items extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      item_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      categ_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      model_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
            msg: 'Price must be a valid decimal value',
          },
          min: {
            args: [0],
            msg: 'Price must be greater than or equal to 0',
          },
        },
      },
      store_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: {
            args: [0],
            msg: 'Amount cannot be negative',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'items',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'items_pkey',
          unique: true,
          fields: [{ name: 'item_id' }],
        },
      ],
    });
  }

  static associate(models) {
    Items.belongsTo(models.ItemCategories, {
      foreignKey: 'categ_id',
      as: 'category',
    });

    Items.belongsTo(models.ItemTypes, {
      foreignKey: 'type_id',
      as: 'type',
    });

    Items.belongsTo(models.Brands, {
      foreignKey: 'brand_id',
      as: 'brand',
    });

    Items.belongsTo(models.Models, {
      foreignKey: 'model_id',
      as: 'model',
    });

    Items.belongsTo(models.Stores, {
      foreignKey: 'store_id',
      as: 'store',
    });

    Items.belongsToMany(models.Orders, {
      through: models.ItemOrder,
      foreignKey: 'item_id',
      otherKey: 'order_id',
      as: 'orders',
    });
  }
}
