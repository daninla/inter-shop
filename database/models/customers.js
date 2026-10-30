import _sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
const { Model, Sequelize } = _sequelize;

export default class customers extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'customers_email_key',
        validate: {
          isEmail: {
            msg: 'Email is not valid',
          },
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [6, 255],
            msg: 'Password must be at least 6 characters long',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'customers',
      schema: 'public',
      timestamps: false,
      hooks: {
        beforeCreate: async (customer) => {
          if (customer.password) {
            customer.password = await bcrypt.hash(customer.password, 10);
          }
        },
        beforeUpdate: async (customer) => {
          if (customer.changed('password') && customer.password) {
            customer.password = await bcrypt.hash(customer.password, 10);
          }
        },
      },
      indexes: [
        {
          name: 'customers_email_key',
          unique: true,
          fields: [{ name: 'email' }],
        },
        {
          name: 'customers_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    });
  }
}
