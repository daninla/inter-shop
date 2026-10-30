import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class item_order extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        isInt: {
          msg: 'Item id must be an integer',
        },
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      validate: {
        isInt: {
          msg: 'Order id must be an integer',
        },
      }
    }
  }, {
    sequelize,
    tableName: 'item_order',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "item_order_pkey",
        unique: true,
        fields: [
          { name: "item_id" },
          { name: "order_id" },
        ]
      },
    ]
  });
  }
}
