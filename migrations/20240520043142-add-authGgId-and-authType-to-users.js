"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "authGgId", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("Users", "authType", {
      type: Sequelize.ENUM("local", "google", "facebook"),
      defaultValue: "local",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "authGgId");
    await queryInterface.removeColumn("Users", "authType");
  },
};
