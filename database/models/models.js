import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class models extends Model {
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
          msg: 'Model title is required',
        },
        len: {
          args: [2, 255],
          msg: 'Model title must be between 2 and 255 characters',
        },
      }
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: {
          msg: 'Brand id must be an integer',
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
    tableName: 'models',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "models_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
