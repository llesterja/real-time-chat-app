require('./environment');
const express = require('express');
const cors = require('cors');
const { Server } = require("socket.io");
const {createServer} = require('http');

const UserRouter = require('./src/routers/users.route');
const ChatroomRouter = require('./src/routers/chatrooms.route');
const MessageRouter = require('./src/routers/messages.route');

const app = express();
const http = createServer(app);
const io = new Server(http,{
  cors:{
    origin: '*',
    methods: ['GET','POST'],
  }
})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes for admin testing purposes to check on db issues
const routers = [new UserRouter(),new ChatroomRouter(),new MessageRouter()];
routers.forEach((router) => app.use('/', router.router));

const PORT = process.env.PORT || 8080;

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})

http.listen(PORT,'0.0.0.0',()=>{
  console.log(`🚀 App listening on the port ${PORT}`);
});
