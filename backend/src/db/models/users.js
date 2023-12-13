const {Model,DataTypes} = require('sequelize');

module.exports = (sequelize,DataTypes) =>{
  class Users extends Model{
    static associate(models){
      this.belongsToMany(models.chatrooms,{
        through:models.userChatrooms,
        key:'userId'
      });
      this.hasMany(models.friends);
      this.hasMany(models.messages);
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: { type: DataTypes.STRING(255) },
      mobile: { type: DataTypes.INTEGER },
      username: { type: DataTypes.STRING(255) },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },

    },{
      sequelize,
      modelName:'users',
    }
  )
  return Users ;
};