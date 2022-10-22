const express = require('express');
const { Router } = express;
const ConfigControllers = require('../controllers/configController');
const Config = new ConfigControllers();
const router = new Router();

router.get('/config', Config.ConfigSystem);

router.get('/error', Config.ErrorLog);

router.get('/warning', Config.WarningLog);

module.exports = router;
