class ChatroomController{
  constructor(db){
    this.db=db;
  }
  //list all Chatrooms in the chat app (admin purposes)
    list = async (req, res) => {
    const chatrooms = await this.db.chatrooms.findAll(); // select * from users;
    res.status(200).json(chatrooms);
  };
}

module.exports = ChatroomController;