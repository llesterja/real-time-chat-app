import FriendModel from '../db/models/friends';
import UserModel from '../db/models/users';

class UserService {
  constructor(){
    this.friendModel = FriendModel;
    this.userModel = UserModel;
  }
  async listFriendsByUser(userId){
    try{
      const friends = await this.friendModel.findAll({
        where: {userId},
        include:[
          {
            model:this.userModel,
            foreignKey:'friendId',
            as:'friend',
          }
        ]
      });
      res.status(200).json(friends);
    }catch (err) {
      console.error(err);
      throw new Error(err);
    }    
  }
  

}

export default UserService;