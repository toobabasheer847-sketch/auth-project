export async function up(queryInterface, Sequelize) {

  await queryInterface.createTable("user_otps", {

    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },


    userEmail: {
      type: Sequelize.STRING,
      allowNull: false,

      references: {
        model: "users",
        key: "email",
      },

      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },


    otp: {
      type: Sequelize.STRING,
      allowNull: false,
    },


    used: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },


    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },

  });

}


export async function down(queryInterface) {

  await queryInterface.dropTable("user_otps");

}