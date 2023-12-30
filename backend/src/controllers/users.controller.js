class UserController{
  constructor(db){
    this.db=db;
  }
  //list all users in the chat app (admin purposes)
    list = async (req, res) => {
    const users = await this.db.users.findAll(); // select * from users;
    res.status(200).json(users);
  };
}

module.exports = UserController;