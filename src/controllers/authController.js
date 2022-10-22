const logger = require('../utils/logger');

class PublicAuth {
    async publicAuthorization(req, res, next) {
        if (req.isAuthenticated()) {
            logger.info("Ingresa a sección")
            next()
        } else {
            logger.info("Redirección a logging")
            res.redirect('/login')
        }
    }
    
}


module.exports = PublicAuth