import ChatroomModel from '../db/models/chatrooms';

class ChatroomService {
  constructor(){
    this.chatroomModel = ChatroomModel;
  }
  async listChatByUser(userId){
       
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