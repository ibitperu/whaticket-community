import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("classes", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      classVideo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      moduleId: {
        type: DataTypes.INTEGER,
        references: { model: "Modules", key: "id"},
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
    return queryInterface.dropTable("classes");
  }
};


