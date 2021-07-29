'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CountriesSport extends Model {
    static associate(models) {
      // define association here
    }
  };
  CountriesSport.init({
    CountryId: DataTypes.INTEGER,
    SportId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CountriesSport',
  });
  return CountriesSport;
};