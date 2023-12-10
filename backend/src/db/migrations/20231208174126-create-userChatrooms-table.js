'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('userChatrooms', {
       id: {type: Sequelize.INTEGER, autoIncrement:true,primaryKey:true},
       isAdmin: {allowNull:false,type: Sequelize.BOOLEAN}, 
       userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id',
        }
      },
       chatroomId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'chatrooms',
          key:'id',
        }
      },
       createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
       },
       updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
       }
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('userChatrooms');
  }
};
