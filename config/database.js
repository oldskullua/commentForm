const path = require('path');
console.log(path.resolve(__dirname, `../.${process.env.NODE_ENV || 'development'}.env`));
require('dotenv').config({
  path: path.resolve(__dirname, `../.${process.env.NODE_ENV || 'development'}.env`)
});

const config = {
  dialect: "postgres",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
}

module.exports = {
  development: config,
  production: config,
  test: {
    
  }
}
