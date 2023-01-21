const { config } = require('../../config');
const {get, post, put} = require("../helper");

const getCreatedEvents = async(token,userId) => {
  try{ 
    const options = {
      headers: {
        authorization: 'Bearer '+ token
      },
      url: `${config.integrateUrl}/api/event/created`,
      params: {
        user_id: userId,
      }
   }
    const response = await get(options);
    return response;
  }catch {
    throw new Error("API failed");
  }
}

const getVolunteerEvents = async(token,userId) => {
  try{ 
    const options = {
      headers: {
        authorization: 'Bearer '+ token
      },
      url: `${config.integrateUrl}/api/event/volunteer`,
      params: {
        user_id: userId,
      }
   }
    const response = await get(options);
    return response;
  }catch {
    throw new Error("API failed");
  }
}

const getAllEvents = async(token,userId) => {
  try{ 
    const options = {
      headers: {
        authorization: 'Bearer '+ token
      },
      url: `${config.integrateUrl}/api/event/otherEvent`,
      params: {
        user_id: userId,
      }
   }
    const response = await get(options);
    return response;
  }catch {
    throw new Error("API failed");
  }
}

module.exports = {
  getAllEvents,
  getCreatedEvents,
  getVolunteerEvents
}