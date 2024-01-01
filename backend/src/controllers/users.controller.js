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
}

module.exports = UserController;