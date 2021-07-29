'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Athlete extends Model {
    static associate(models) {
      Athlete.belongsTo(models.Sport, { foreignKey: 'SportId' })
      Athlete.belongsTo(models.Country, { foreignKey: 'CountryId' })
    }
    getAge(){
      return this.age + ' years'
    }
  };
  Athlete.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `❌️ Name must be filled ❌️`
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: `❌️ Age must be filled ❌️`
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `❌️ Phone Number must be filled ❌️`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `❌️ Email must be filled ❌️`
        }
      }
    },
    SportId: DataTypes.INTEGER,
    CountryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Athlete',
  });

  Athlete.addHook('beforeCreate', (instance, options)=>{
    //TODO
  })
  
  Athlete.addHook('beforeUpdate', (instance, options)=>{
    //TODO
  })
  return Athlete;
};