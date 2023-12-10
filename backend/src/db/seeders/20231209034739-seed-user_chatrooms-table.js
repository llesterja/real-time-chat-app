'use strict';
const userChatrooms = [
  {
    isAdmin:"false",
    userId:1,
    chatroomId:1,
  },
  {
    isAdmin:"false",
    userId:2,
    chatroomId:1,
  },
  {
    isAdmin:"false",
    userId:1,
    chatroomId:2,
  },
  {
    isAdmin:"false",
    userId:2,
    chatroomId:2,
  },
  {
    isAdmin:"false",
    userId:3,
    chatroomId:2,
  },
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(  
      'userChatrooms',
      userChatrooms.map((userChatroom) => ({
        ...userChatroom,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('userChatrooms', null, {});
  }
};
