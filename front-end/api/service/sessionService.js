const redis = require('../../redis-store/redis');

const getSession = async(key) => {
  console.log("getSession",key);
  const response =  await redis.getSessionValue(key);
  return response;
}

const setSession = async(key, value) => {
  if(Object.keys(value).length == 0) {
   return await redis.deleteSession(key);
  }
  return await redis.setSession(key, value);
}

module.exports = {
  getSession,
  setSession,
}