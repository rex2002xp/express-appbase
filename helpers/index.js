const bcrypt = require('bcrypt');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function hashPassword(userPassword) {
  return bcrypt.hashSync(userPassword, bcrypt.genSaltSync(8), null);
}

module.exports = {
  comparePass,
  hashPassword
};