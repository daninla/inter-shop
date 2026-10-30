import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class item_categories extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Category title is required',
        },
        len: {
          args: [2, 255],
          msg: 'Category title must be between 2 and 255 characters',
        },
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 2000],
          msg: 'Description must not exceed 2000 characters',
        },
      }
    }
  }, {
    sequelize,
    tableName: 'item_categories',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "item_categories_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
