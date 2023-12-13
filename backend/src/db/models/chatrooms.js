const {Model,DataTypes} = require('sequelize');

module.exports = (sequelize,DataTypes) =>{
  class Chatrooms extends Model{
    static associate(models){
      this.belongsToMany(models.users,{
        through:models.userChatrooms,
        key:'chatroomId'
      });
      this.hasMany(models.messages);
    }
  }
  Chatrooms.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      chatroomName: { type: DataTypes.STRING(255) },
      isGroup: { type: DataTypes.BOOLEAN },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },

    },{
      sequelize,
      modelName:'chatrooms',
    }
  )
  return Chatrooms ;
};