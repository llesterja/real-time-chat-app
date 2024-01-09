const { Router } = require('express');
const MessageController = require('../controllers/messages.controller');
const db = require('../db/models/index');

class MessageRouter {
  path = '/messages';

  router = Router();

  controller = new MessageController(db);

  constructor() {
    this.initializeRoutes(); // whatever we put inside the contructor will trigger when initialising the class
  }

  initializeRoutes = () => {
    this.router.get(`${this.path}/`, this.controller.list);
    this.router.get(`${this.path}/userId/:userId`, this.controller.listMessagesByUser);
    this.router.get(`${this.path}/userId/v2/:userId`, this.controller.listMessagesByUserV2);
    this.router.get(`${this.path}/chatroomId/:chatroomId`, this.controller.listMessagesByChatroom);
    // this.router.get(`${this.path}/`, this.controller.list);
    // this.router.post(`${this.path}/`, this.controller.add);
    // this.router.put(`${this.path}/:id`, this.controller.edit);
    // this.router.delete(`${this.path}/:id`, this.controller.delete);
  };
}

module.exports = MessageRouter;