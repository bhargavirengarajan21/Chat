const axios = require('axios');

const httpRequest = async(method,options) => {
  console.log(options);
  return await axios({method, ...options, 'Accept-Type': 'application/json'});
}

const get = (options) => httpRequest('get',options);
const post = (options) => httpRequest('post', options);
const del = (options) => httpRequest('delete', options);
const put = (options) => httpRequest('put',options);
const patch = (options) => httpRequest('patch', options);

module.exports = {
  get,
  post,
  del,
  put,
  patch
}