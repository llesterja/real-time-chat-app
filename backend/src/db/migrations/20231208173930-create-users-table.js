'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('users', {
       id: {type: Sequelize.INTEGER, autoIncrement:true,primaryKey:true},
       username: {allowNull:false,type: Sequelize.TEXT}, 
       mobile: {allowNull:false, type:Sequelize.BIGINT},
       createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
       },
       updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
       },
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
