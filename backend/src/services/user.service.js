import FriendModel from '../db/models/friends';
import UserModel from '../db/models/users';

class UserService {
  constructor(){
    this.friendModel = FriendModel;
    this.userModel = UserModel;
  }

  async getIdByUsername(username){
    try{
      const user = await this.userModel.findOne({
        where: {username}
      })
      console.log(user)
      res.status(200).json(user.id)
    }catch (err){
      console.log(err);
      throw new Error(err);
    }

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
  
  async createUser(username, mobile){
    try{
      this.userModel.create({
        username: username,
        mobile: mobile,
      })
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }
}

export default UserService;