'use strict';
const chatrooms = [
  {
    chatroomName : "test1",
    isGroup: false,
  },
  {
    chatroomName : "test2",
    isGroup: true,
  }
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(  
      'chatrooms',
      chatrooms.map((chatroom) => ({
        ...chatroom,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('chatrooms', null, {});
  }
};
