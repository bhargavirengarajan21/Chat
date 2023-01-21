const redis = require('../../redis-store/redis');
const { config } = require('../../config');
const {get, post} = require("../helper");

const loginUser = async (email, password) => {
  try { 
    const options = {
      url: `${config.integrateUrl}/api/user/login`, 
      params: {
        email,
        password
      }
    }
    const response = await get(options);
    const id = response.data._id;
    redis.setSession('data_'+id, { userInfo: {...response.data}});
    return response;
  } catch {
    throw new Error("API failed");
  }
}

const createUser = async (data) => {
  try { 
    const options = {
      url: `${config.integrateUrl}/api/user`, 
      data: {...data},
    }
    const response = await post(options);
    const id = response.data._id;
    redis.setSession('data_'+id, { userInfo: {...response.data}});
    return response;
  } catch {
    throw new Error("API failed");
  }
}

const getAllUser = async (token) => {
  try { 
    const options = {
      header: {
        Authorization : token
      },
      url: `${config.integrateUrl}/api/user`
    }
    const response = await get(options);
    return response;
  } catch {
    throw new Error("API failed");
  }
}

const getSearchUser = async(token,data) => {
  try{ 
    const options = {
      headers: {
        authorization : 'Bearer '+ token,
      },
      url: `${config.integrateUrl}/api/user`,
      params: {
        search: data,
      }
    }
    const response = await get(options);
    return response;
  }catch(e) {
    throw new Error("API failed",e);
  }
}

module.exports = {
  loginUser,
  createUser,
  getAllUser,
  getSearchUser
}