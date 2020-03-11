const axios = require('axios');

const createAxios = ({
  baseURL
}) => {
  const defaultConfig = {
    baseURL
  };

  const get = config => axios({
    method: "get",
    ...defaultConfig,
    ...config
  });

  const post = config => axios({
    method: "post",
    ...defaultConfig,
    ...config
  });

  return {
    get,
    post
  };
};

module.exports = createAxios;
