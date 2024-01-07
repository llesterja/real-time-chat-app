const { Router } = require('express');
const UserController = require('../controllers/users.controller');
const db = require('../db/models/index');

class UserRouter {
  path = '/users';

  router = Router();

  controller = new UserController(db);

  constructor() {
    this.initializeRoutes(); // whatever we put inside the contructor will trigger when initialising the class
  }

  initializeRoutes = () => {
    this.router.get(`${this.path}/`, this.controller.list);
    this.router.get(`${this.path}/login/:username`, this.controller.getIdByUsername);
    this.router.get(`${this.path}/friends/:userId`, this.controller.listAllFriends);
    this.router.post(`${this.path}/login`, this.controller.createUser);
    this.router.post(`${this.path}/friends`, this.controller.createFriend);
    // this.router.put(`${this.path}/:id`, this.controller.edit);
    // this.router.delete(`${this.path}/:id`, this.controller.delete);
  };
}

module.exports = UserRouter;