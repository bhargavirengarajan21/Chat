const Redis = require('ioredis');
const {config} = require('../config');

const redis = new Redis({
    port: config.redisPort,
});



const setSession = (key, value) => {
  try {
    redis.set(key,JSON.stringify(value));
    return {
      success: true,
    }
  } catch(error) {
    console.log("Not able to set Session Value");
    throw new Error("Not able to set Session Value");
  }
}

const getSessionValue = async(key) => {
  try{
    const res = await redis.get(key);
    return res;
  } catch(error) {
    console.log("Error getting value", error);
    throw new Error("Not able to set Session Value");
  }
}

const deleteSession = (key) => {
  try {
    console.log("**",key);
    redis.del(key);
    return {};
  } catch(error) {
    console.log("Not able to delete session",error);
    throw new Error("Not able to delete session");
  }
}


const startRedis = () => {
  redis.on("connect", () => {
    logger.info({ message: "connected to redis" });
  });

  redis.on("error", () => {
    airbrake.notify({ error: "error connecting to redis" });
    logger.error({ message: "error connecting to redis" });
  });
}


module.exports  = {
  startRedis,
  setSession,
  getSessionValue,
  deleteSession
}