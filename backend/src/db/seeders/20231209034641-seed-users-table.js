'use strict';

const users = [
  {
    username : 'user0',
    mobile: 90000000,
  },
  {
    username: 'testuser1',
    mobile: 80000000,
  },
  {
    username: 'testuser2',
    mobile: 70000000,
  },
]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      users.map((user) => ({
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
