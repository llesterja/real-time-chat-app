const {Model,DataTypes} = require('sequelize');

module.exports = (sequelize,DataTypes) =>{
  class Messages extends Model{
    static associate(models){
      this.belongsTo(models.users);
      this.belongsTo(models.chatrooms);
    }
  }
  Messages.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      messageBody: { type: DataTypes.STRING(255) },
      userId: {
        references: {
          model: 'users',
          key: 'id',
        },
        type: DataTypes.INTEGER,
      },
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
      modelName:'messages',
      // paranoid:true,
    }
  )
  return Messages ;
};