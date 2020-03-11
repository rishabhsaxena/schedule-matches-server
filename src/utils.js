const { camelCase } = require('change-case');

const iterate = (obj) => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
      iterate(obj[key])
    } else {
      obj[camelCase(key, 'camel')] = obj[key];
      if (key.indexOf("_") !== -1) {
        delete obj[key];
      }
    }
  });

  return obj;
}

const toCamelCase = data => {
  if (!data || typeof data !== "object") {
    return data
  }

  return iterate(data);
}

module.exports = {
  toCamelCase
};
