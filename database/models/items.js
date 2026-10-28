import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class items extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    item_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categ_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'items',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "items_pkey",
        unique: true,
        fields: [
          { name: "item_id" },
        ]
      },
    ]
  });
  }
}
