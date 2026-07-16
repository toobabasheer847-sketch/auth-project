export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("users", "updatedAt", {
    type: Sequelize.DATE,
    allowNull: true,
  });

  await queryInterface.sequelize.query(
    `UPDATE "users" SET "updatedAt" = COALESCE("createdAt", NOW()) WHERE "updatedAt" IS NULL`
  );

  await queryInterface.changeColumn("users", "updatedAt", {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn("users", "updatedAt");
}
