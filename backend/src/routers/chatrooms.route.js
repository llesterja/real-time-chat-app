const { Router } = require('express');
const ChatroomController = require('../controllers/chatrooms.controller');
const db = require('../db/models/index');

class ChatroomRouter {
  path = '/chatrooms';

  router = Router();

  controller = new ChatroomController(db);

  constructor() {
    this.initializeRoutes(); // whatever we put inside the contructor will trigger when initialising the class
  }

  initializeRoutes = () => {
    this.router.get(`${this.path}/`, this.controller.list);
    this.router.get(`${this.path}/:userId`, this.controller.listChatByUser);
    // this.router.get(`${this.path}/`, this.controller.list);
    // this.router.post(`${this.path}/`, this.controller.add);
    // this.router.put(`${this.path}/:id`, this.controller.edit);
    // this.router.delete(`${this.path}/:id`, this.controller.delete);
  };
}

module.exports = ChatroomRouter;