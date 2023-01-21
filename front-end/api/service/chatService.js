const { config } = require('../../config');
const {get, post, put} = require("../helper");

const postUserChatResponse = async(token, data) => {
  try{ 
    const options = {
    headers: {
      authorization: 'Bearer '+ token
    },
    url: `${config.integrateUrl}/api/chat`,
    data: {
      userId: data,
    }
  }
  const response = await post(options);
  return response;
  }catch {
    throw new Error("API failed");
  }
}

const createGroup = async(token, name, user) => {
  try{ 
    const options = {
      headers: {
        authorization: 'Bearer '+ token
      },
      url: `${config.integrateUrl}/api/chat/group`,
      data: {
        users: user,
        name: name
      }
   }
    const response = await post(options);
    return response;
  }catch {
    throw new Error("API failed");
  }
}

const userChatResponse = async(token, userId) => {
  try{ 
    const options = {
      headers: {
        authorization: 'Bearer '+ token
      },
      params: {
        userId: userId,
      },
      url: `${config.integrateUrl}/api/chat/`,
    }
    const response = await get(options);
    return response;
  }catch(error) {
    throw new Error("API failed"+error);
  }
}

const sendMessage = async(token, data) => {
  try {
    const options = {
      headers: {
        authorization: 'Bearer '+ token
      },
      url: `${config.integrateUrl}/api/message`,
      data: {
        content: data.content,
        chatId: data.chatId,
      }
    }
    console.log(token);
    const response = await post(options);
    return response;
  } catch(error) {
    throw new Error("Api failed",error);
  }
}


const getMessage = async(token, data) => {
  try {
    const options = {
      headers: {
        authorization: 'Bearer '+ token
      },
      url: `${config.integrateUrl}/api/message/${data.userId}`,
    }

    const response = await get(options);
    console.log(response);
    return response;
  } catch(error) {
    console.log("enee",error);
    throw new Error(error);
  }
}

const removeUser = async(token, data) => {
  try {
    const options = {
      headers: {
        authorization: 'Bearer '+ token
      },
      url: `${config.integrateUrl}/api/chat/removeGroup`,
      data: {
        userId: data.userId,
        chatId: data.chatId
      }
    }
    const response = await put(options);
    return response;
  } catch(error) {
    throw new Error(error);
  }
}

module.exports = {
  postUserChatResponse,
  createGroup,
  userChatResponse,
  getMessage,
  sendMessage,
  removeUser
}