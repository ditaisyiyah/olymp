const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

function hashPassword (plainPassword) {
  return bcrypt.hashSync(plainPassword, salt)
}

function checkPassword (plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = { hashPassword, checkPassword }