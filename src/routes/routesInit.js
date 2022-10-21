const express = require('express');
const views = express();

views.set('view engine', 'ejs');
views.set('views', './public');

module.exports = views;