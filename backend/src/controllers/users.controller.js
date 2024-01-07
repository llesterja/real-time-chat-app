class UserController{
  constructor(db){
    this.db=db;
  }
  //list all users in the chat app (admin purposes)
  list = async (req, res) => {
    const users = await this.db.users.findAll(); // select * from users;
    res.status(200).json(users);
  };

  listAllFriends = async(req,res)=>{
    const {userId} = req.params;
    console.log(userId);
    try{
      const friends = await this.db.friends.findAll({
        where: {userId},
        include:[
          {
            model:this.db.users,
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

  getIdByUsername = async(req,res) => {
    const {username} = req.params;
    try{
      const user = await this.db.users.findOne({
        where: {username}
      })
      console.log(user)
      res.status(200).json(user.id)
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }

  createUser = async(req,res) =>{
    const {username,mobile}=req.body;
    try{
      const newUser = await this.db.users.create({
        username: username,
        mobile: mobile,
      })
      res.status(200).json(newUser)
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }

  createFriend = async(req,res) =>{
    const {friendId,friendName,userId}=req.body;
    try{
      const newFriend = await this.db.friends.create({
        friendId:friendId,
        friendName: friendName,
        userId:userId,
      })
      res.status(200).json(newFriend)
    }catch (err){
      console.log(err);
      throw new Error(err);
    }
  }


}



module.exports = UserController;