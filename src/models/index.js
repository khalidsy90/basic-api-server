'use strict';

require('dotenv').config();

// Connects to our database depending on the URI as an environmental variable
const POSTGRES_URI =process.env.NODE_ENV ==="test" ? "sqlite:memory:" :process.env.DATABASE_URL
// require both the Sequelize and Datatype  constructor from the sequelize package
const {Sequelize,DataTypes}=require('sequelize')
// We will configure our connection options for production

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  } : {};
// our connection object
// we are going to use this to connect to Postgres
//connection string

  const sequelize=new Sequelize(POSTGRES_URI,sequelizeOptions)

  const food=require('./food.model')
  const clothes=require('./clothes.model')


  module.exports = {
    db: sequelize,
    Food : food(sequelize, DataTypes),
    Clothes : clothes(sequelize, DataTypes)
  };