class MessageController{
  constructor(db){
    this.db=db;
  }
  //list all Messages in the chat app (admin purposes)
    list = async (req, res) => {
    const messages = await this.db.messages.findAll(); // select * from messages;
    res.status(200).json(messages);
  };
}

module.exports = MessageController;