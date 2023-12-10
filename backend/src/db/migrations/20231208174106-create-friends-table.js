'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('friends', {
       id: {type: Sequelize.INTEGER, autoIncrement:true,primaryKey:true},
       friendName: {allowNull:false,type: Sequelize.TEXT}, 
       userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id',
        }
       },
       friendId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'users',
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
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('friends');
  }
};
