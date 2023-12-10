'use strict';
const friends = [
  {
    friendName: "my first friend",
    userId:1,
    friendId:2,
  },
  {
    friendName: "my second friend",
    userId:1,
    friendId:3,
  },
  {
    friendName: "i am number 1",
    userId:2,
    friendId:1,
  },
  {
    friendName: "i am number 3",
    userId:2,
    friendId:3,
  },
  {
    friendName: "kaki 1",
    userId:3,
    friendId:1,
  },
  {
    friendName: "kaki 2",
    userId:3,
    friendId:2,
  },
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(  
      'friends',
      friends.map((friend) => ({
        ...friend,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('friends', null, {});
  }
};
