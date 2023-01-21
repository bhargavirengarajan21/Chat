const dotenv = require('dotenv');
dotenv.config();
const config = {
  port: process.env.PORT,
  MongoDB_URI: process.env.MONGO_DB_URI,
}
console.log(config);

module.exports = {
  config
}