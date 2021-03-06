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
      return this.age + ' y.o.'
    }
    getName(){
      let fname = this.first_name.split('')
      let lname = this.last_name.split('')
      let fullName = ''
      for(let [i, char] of fname.entries()){
        if(i==0) fullName+=char.toUpperCase()
        else fullName+=char
      }
      fullName+=' '
      for(let [i, char] of lname.entries()){
        if(i==0) fullName+=char.toUpperCase()
        else fullName+=char
      }
      return fullName
    }
    getGender(){
      return this.gender=='Female'? '♀️' : '♂';
    }
  };
  Athlete.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `❌️ First Name must be filled ❌️`
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `❌️ Gender must be filled ❌️`
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: `❌️ Age must be filled ❌️`
        },
        isNumeric: {
          msg: `❌️ Age must be a number ❌️`
        },
        isNumeric: {
          msg: `❌️ Age must be a number ❌️`
        },
        min: {
          args: 20,
          msg: `❌️ Age must be greater than or equal 20 ❌️`
        },
        max: {
          args: 30,
          msg: `❌️ Age must be lower than or equal 20 ❌️`
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
    if(!instance.last_name) instance.last_name = instance.first_name

  })
  
  Athlete.addHook('beforeUpdate', (instance, options)=>{
    if(!instance.last_name) instance.last_name = instance.first_name
  })
  return Athlete;
};