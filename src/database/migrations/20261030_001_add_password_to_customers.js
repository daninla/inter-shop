module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('customers');

    if (!table.password) {
      await queryInterface.addColumn('customers', 'password', {
        type: Sequelize.STRING(255),
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable('customers');

    if (table.password) {
      await queryInterface.removeColumn('customers', 'password');
    }
  },
};
