'use strict';

const db = require('../../models')

module.exports = {
  up: function (queryInterface, Sequelize) {

    const password = 'Demo123$';
    return db.user.build(
      {
        fullname: 'Victor Cornejo',
        username: 'admin',
        email: 'rex2002xp@gmail.com',
        password: password,
        is_admin: true,
        active: true
      }
    ).save()
    
    
  },

  down: function (queryInterface, Sequelize) {
    return db.user.destroy({
      where: {
        username: 'admin'
      }
    });
  }
};
