'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Athletes', 'CountryId', {
      // allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Countries',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' 
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Athletes', 'CountryId', {})
  }
};
