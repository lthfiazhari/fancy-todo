'use strict';
const {
  Model
} = require('sequelize');
const dateParsing = require('../helpers/dateParsing')
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        dateConv(value) {
          let now = dateParsing()
          // console.log(value, 'value');
          // console.log(now, 'now');
          if (value > now) {
            throw new Error('Input Tanggal tidak boleh melewati hari ini')
          }
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(user, option) {
        if (!user.status) {
          user.status = false
        }
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};