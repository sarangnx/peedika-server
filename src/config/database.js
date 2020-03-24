/**
 * This file contains configuration for database
 * connection in dev, test and prod servers.
 */

module.exports = {
    "development": {
      "username": "sarang",
      "password": "sarang123",
      "database": "peedia",
      "host": "localhost",
      "port":"3306",
      "dialect": "mysql",
      "define":{
          "freezeTableName": true
      }
    },
    "test": {
      "username": "sarang",
      "password": "sarang123",
      "database": "testdb",
      "host": "localhost",
      "port":"3306",
      "dialect": "mysql",
      "define":{
          "freezeTableName": true
      },
      "logging": false
    },
    "production": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "port": process.env.DB_PORT,
      "dialect": process.env.DB_DIALECT,
      "define":{
          "freezeTableName": true
      },
      "logging": false
    }
  }
  