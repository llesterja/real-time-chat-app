'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('chatrooms', {
       id: {type: Sequelize.INTEGER, autoIncrement:true,primaryKey:true},
       chatroomName: {allowNull:false,type: Sequelize.TEXT}, 
       isGroup: {allowNull:false,type: Sequelize.BOOLEAN},
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
    await queryInterface.dropTable('chatrooms');
  }
};
