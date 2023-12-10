'use strict';
const messages = [
  {
    messageBody: "hello, can you hear me?",
    userId: 1,
    chatroomId:1
  },
  {
    messageBody: "hello, can hear",
    userId: 2,
    chatroomId:1
  },
  {
    messageBody: "hello",
    userId: 1,
    chatroomId:1
  },
  {
    messageBody: "hello",
    userId: 2,
    chatroomId:1
  },
  {
    messageBody: "hello, can you hear me?",
    userId: 1,
    chatroomId:2
  },
  {
    messageBody: "hello, can you hear me?",
    userId: 2,
    chatroomId:2
  },
  {
    messageBody: "hello, can you hear me?",
    userId: 3,
    chatroomId:2
  },
]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(  
      'messages',
      messages.map((message) => ({
        ...message,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messages', null, {});
  }
};
