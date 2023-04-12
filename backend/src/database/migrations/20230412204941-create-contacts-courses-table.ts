import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("contacts_courses", {
      courseId: {
        type: DataTypes.INTEGER,
        references: { model: "Courses", key: "id"},
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      contactId: {
        type: DataTypes.INTEGER,
        references: { model: "Contacts", key: "id"},
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false
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
    return queryInterface.dropTable("contacts_courses");
  }
};
