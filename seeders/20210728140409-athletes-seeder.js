'use strict';
const fs = require('fs/promises')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return fs.readFile('./seeders/athletes.json', 'utf8')
      .then(res => {
        const data = JSON.parse(res)
        data.forEach(el => {
          el.createdAt = new Date(),
          el.updatedAt = new Date()
        })

        return queryInterface.bulkInsert('Athletes', data, {})
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Athletes', null, {})
  }
};
