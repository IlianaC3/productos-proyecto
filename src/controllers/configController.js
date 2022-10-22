const { readFileLog } = require('../utils/fs');
const { dataConfig } = require('../utils/configData');
const logger = require('../utils/logger');

class Config {
    async ConfigSystem(req, res) {
        if (req.query.admin) {
            logger.info("Usuario revisa configuración de sistema")
            let config = dataConfig;
            res.status(200).json({
                message: `Configuración`,
                result: config
            });
        } else {
            logger.warn(`Usuario no tiene privilegios para administrador`)
            res.status(404).json({
                error: `No tienes acceso`,
            });
        }
    }

    async ErrorLog(req,res) {
        if (req.query.admin) {
            let data = await readFileLog('error.log');
            res.status(200).json({
                message: `Errores`,
                result: data
            });
        } else {
            logger.warn(`Usuario no tiene privilegios para administrador`)
            res.status(404).json({
                error: `No tienes acceso`,
            });
        }
    }

    async WarningLog(req,res) {
        if (req.query.admin) {
            logger.info("Usuario revisa configuración de sistema")
            let data = await readFileLog('warning.log');
            res.status(200).json({
                message: `Warnings`,
                result: data
            });
        } else {
            logger.warn(`Usuario no tiene privilegios para administrador`)
            res.status(404).json({
                error: `No tienes acceso`,
            });
        }
    }
}

module.exports = Config;