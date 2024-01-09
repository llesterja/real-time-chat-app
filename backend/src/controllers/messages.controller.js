class MessageController{
  constructor(db){
    this.db=db;
  }
  //list all Messages in the chat app (admin purposes)
  list = async (req, res) => {
    const messages = await this.db.messages.findAll(); // select * from messages;
    res.status(200).json(messages);
  };

  listMessagesByUser = async(req,res)=>{
    const {userId} = req.params;
    try{
      const messages = await this.db.messages.findAll({
        where:{userId},
        include:[
          {
            model: this.db.chatrooms,
            include:[
              {
                model:this.db.users,
                through: {
                  model:this.db.userChatrooms,
                }
              }
            ]
          }
        ]
      });
      res.status(200).json(messages);
    }catch (err) {
      console.error(err);
      throw new Error(err);
    }    
  };
  listMessagesByUserV2 = async(req,res)=>{
    const {userId} = req.params;
    try{
      const messages = await this.db.userChatrooms.findAll({
        where:{userId},
        include:[
          {
            model: this.db.chatrooms,
            include:[
              {
                model:this.db.messages,
              }
            ]
          }
        ]
      });
      res.status(200).json(messages);
    }catch (err) {
      console.error(err);
      throw new Error(err);
    }    
  };

  listMessagesByChatroom = async(req,res)=>{
    const {chatroomId} = req.params;
    try{
      const messages = await this.db.messages.findAll({
        where:{chatroomId},
        include:[
          {
            model: this.db.chatrooms,
            include:[
              {
                model:this.db.users,
                through: {
                  model:this.db.userChatrooms,
                }
              }
            ]
          }
        ]
      });
      res.status(200).json(messages);
    }catch (err) {
      console.error(err);
      throw new Error(err);
    }    
  }

}

module.exports = MessageController;