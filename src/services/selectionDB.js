require('dotenv').config();
const { dao } = require('../../config');
let dataDB = dao || 'mongodbAtlas'

module.exports = dataDB;