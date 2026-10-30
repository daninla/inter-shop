import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class brands extends Model {
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
          msg: 'Brand title is required',
        },
        len: {
          args: [2, 255],
          msg: 'Brand title must be between 2 and 255 characters',
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
    tableName: 'brands',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "brands_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
