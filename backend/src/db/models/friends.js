const {Model,DataTypes} = require('sequelize');

module.exports = (sequelize,DataTypes) =>{
  class Friends extends Model{
    static associate(models){
      this.belongsTo(models.users, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(models.users, { foreignKey: 'friendId', as: 'friend' });
    }
  }
  Friends.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      friendName: { type: DataTypes.STRING(255) },
      userId: {
        references: {
          model: 'users',
          key: 'id',
        },
        type: DataTypes.INTEGER,
      },
      friendId: {
        references: {
          model: 'users',
          key: 'id',
        },
        type: DataTypes.INTEGER,
      },
      createdAt: { type: DataTypes.DATE },
      updatedAt: { type: DataTypes.DATE },

    },{
      sequelize,
      modelName:'friends',
      paranoid:false,
    }
  )
  return Friends ;
};