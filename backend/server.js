require('./environment');
const express = require('express');
const cors = require('cors');

const UserRouter = require('./src/routers/users.route');
const ChatroomRouter = require('./src/routers/chatrooms.route');
const MessageRouter = require('./src/routers/messages.route');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes for admin testing purposes to check on db issues
const routers = [new UserRouter(),new ChatroomRouter(),new MessageRouter()];
routers.forEach((router) => app.use('/', router.router));

const PORT = process.env.PORT || 8080;

app.listen(PORT);
console.log(`🚀 App listening on the port ${PORT}`);