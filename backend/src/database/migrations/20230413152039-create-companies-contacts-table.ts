import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("companies_contacts", {
      companyId: {
        type: DataTypes.INTEGER,
        references: { model: "Companies", key: "id"},
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      contactId: {
        type: DataTypes.INTEGER,
        references: { model: "Contacts", key: "id"},
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("companies_contacts");
  }
};

