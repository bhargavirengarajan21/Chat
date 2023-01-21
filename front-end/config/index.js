const dotenv = require('dotenv');
dotenv.config();
const config  = {
  "appRoute": '/chat',
  redisPort: process.env.REDIS_PORT,
  integrateUrl: process.env.INTEGRATION_URL,
  port: 3000
}

module.exports = {
  config
}