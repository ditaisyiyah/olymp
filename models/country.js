'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    static associate(models) {
      Country.hasMany(models.Athlete, { foreignKey: 'CountryId' })
      Country.belongsToMany(models.Sport, { through: 'CountriesSport', foreignKey: 'CountryId'})
    }
  };
  Country.init({
    code: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `❌️ Country Code must be filled ❌️`
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `❌️ Country Name must be filled ❌️`
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `❌️ Username must be filled ❌️`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `❌️ Password must be filled ❌️`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Country',
  });

  Country.addHook('beforeCreate', (instance, options)=>{
    instance.password = hashPassword(instance.password)
  })

  Country.addHook('beforeUpdate', (instance, options)=>{
    //TODO
  })
  return Country;
};