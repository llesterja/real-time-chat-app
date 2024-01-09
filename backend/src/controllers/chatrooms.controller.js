class ChatroomController{
  constructor(db){
    this.db=db;
  }
  //list all Chatrooms in the chat app (admin purposes)
    list = async (req, res) => {
    const chatrooms = await this.db.chatrooms.findAll(); // select * from users;
    res.status(200).json(chatrooms);
  };

  listChatByUser = async(req,res)=>{
    const {userId} = req.params;
    console.log(userId);
    try{
      const rooms = await this.db.chatrooms.findAll({
        where: {'$users.id$': userId},
        include:[
          {
            model: this.db.users,
            through:{
              model:this.db.userChatrooms,
            }
          }
        ],

      });
      res.status(200).json(rooms);
    }catch (err) {
      console.error(err);
      throw new Error(err);
    }    
  }

  listChatByUser2 = async(req,res)=>{
    const {userId} = req.params;
    console.log(userId);
    try{
      const rooms = await this.db.userChatrooms.findAll({
        where: {userId},
        include:[
          {
            model: this.db.chatrooms,
            include:[
              {model:this.db.users}
            ]
          }
        ],

      });
      res.status(200).json(rooms);
    }catch (err) {
      console.error(err);
      throw new Error(err);
    }    
  }
}

module.exports = ChatroomController;