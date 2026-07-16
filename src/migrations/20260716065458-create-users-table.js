export async function up(queryInterface, Sequelize) {

  await queryInterface.createTable("users", {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
    },

    email: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },

    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },

    verifiedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    }

  });

}


export async function down(queryInterface) {

  await queryInterface.dropTable("users");

}