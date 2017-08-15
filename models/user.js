'use strict';

var helpers = require('../helpers')

module.exports = function (sequelize, DataTypes) {

  var fields = {
    fullname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: true,
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: true,
      }
    },
  };

  var configuration = {
    underscored: true,
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    },
    instanceMethods: {      
    },
  };

  var User = sequelize.define('user', fields, configuration );

  User.hook('beforeCreate', (user, options) => { 
    user.password = helpers.hashPassword(user.password)
  });
  
  return User;
};