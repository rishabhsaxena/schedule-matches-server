const config = require('config');
const createPgConnection = require('../common/src/createPGConnection');

module.exports = createPgConnection(config.get('DATABASE_URL'));
