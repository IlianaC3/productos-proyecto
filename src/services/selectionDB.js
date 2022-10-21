require('dotenv').config();

let dataDB = process.env.DAO || 'mongodbAtlas'

module.exports = dataDB;