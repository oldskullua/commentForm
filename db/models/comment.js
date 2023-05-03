'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Product);
    }
  }
  Comment.init({
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(320), // username@hostname 255 chars for username, 64 chars for hostname + 1 for '@'
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
        isInt: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};