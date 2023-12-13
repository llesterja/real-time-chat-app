const {Model,DataTypes} = require('sequelize');

module.exports = (sequelize,DataTypes) =>{
  class UserChatrooms extends Model{
    static associate(models){
      this.belongsTo(models.users);
      this.belongsTo(models.chatrooms);
    }
  }
  UserChatrooms.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        references: {
          model: 'users',
          key: 'id',
        },
        type: DataTypes.INTEGER,
      },
      isAdmin: {type: DataTypes.BOOLEAN},
      chatroomId: {
        references: {
          model: 'chatrooms',
          key: 'id',
        },
        type: DataTypes.INTEGER,
      },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },

    },{
      sequelize,
      modelName:'userChatrooms',
      paranoid:true,
    }
  )
  return UserChatrooms ;
};