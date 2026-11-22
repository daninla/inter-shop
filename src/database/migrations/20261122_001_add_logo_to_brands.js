module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("brands");

    if (!table.logo) {
      await queryInterface.addColumn("brands", "logo", {
        type: Sequelize.STRING(255),
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable("brands");

    if (table.logo) {
      await queryInterface.removeColumn("brands", "logo");
    }
  },
};
