import ChatroomModel from '../db/models/chatrooms';
import UserModel from '../db/models/users';
import UserChatroomModel from '../db/models/userChatrooms';

class ChatroomService {
  constructor(){
    this.chatroomModel = ChatroomModel;
    this.userModel = UserModel;
    this.userChatroomModel = UserChatroomModel;
  }
  async listChatByUser(userId){
     try{
      const rooms = await this.chatroomModel.findAll({
        include:[
          {
            model: this.userModel,
            through:{
              model:this.userChatroomModel,
              where:{userId:userId}
            }
          }
        ]
      });

      res.status(200).json(rooms);
    }catch (err) {
      console.error(err);
      throw new Error(err);
    }    
  }
  
  async joinChatByName(roomName){
    try {
      const room = await this.chatroomModel.findOne({
        where: {
          name: roomName,
        },
      });

      if (!room) return null;
      return room.toJSON();
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }    
  }

  async createRoom(roomName) {
    try {
      const newRoom = await this.chatroomModel.create({ name: roomName });
      console.log('creating room...')
      return newRoom.toJSON();
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

}

export default ChatroomService;