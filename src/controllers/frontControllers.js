const { carritosDao, usuariosDao, productosDao, chatDao } = require('../services/index');
const phones = require('../utils/countryCodes.json');
const { readFileLog } = require('../utils/fs');
const { dataConfig } = require('../utils/configData');
const logger = require('../utils/logger');

class Front {
    async Home(req, res) {
        logger.info(`${req.user.email} ingresa a home`)
        let user = req.user
        const productos = await productosDao.getAll().then(result => { if(result == null) {
            return []
        } else {return result} });
        const categorias = await productosDao.getAllCategories().then(result => { if(result == null) {
            return []
        } else {return result} });
        const carrito = await carritosDao.findCarrito(user.email, false).then(result => { if(result == null) {
            return []
        } else {return result} });
        res.render('content/index', { data: productos, dataCar: carrito, user: user, datCat: categorias });
    }

    async Productos(req, res) {
        logger.info(`${req.user.email} ingresa a productos por categoria`)
        let user = req.user;
        let data = req.params.categoria;
        const productos = await productosDao.getProductoByCategory(data).then(result => { if(result == null) {
            return []
        } else {return result} });
        const carrito = await carritosDao.findCarrito(user.email, false).then(result => { if(result == null) {
            return []
        } else {return result} });
        res.render('content/productos', { data: productos, user: user, dataCar: carrito});
    }

    async Chat(req, res) {
        logger.info(`${req.user.email} ingresa a chat`)
        let user = req.user
        const usuario = await usuariosDao.findUser(user.email).then(result => { return result });
        res.render('content/chat', { user: user, data: usuario });
    }

    async ChatIndividual(req, res) {
        logger.info(`${req.user.email} ingresa a chat individual`)
        const mensajes = await chatDao.getAllMessagesAutor(req.params.email).then(result => { return result });
        res.render('content/chatEmail', { data: mensajes });
    }

    async Carrito(req, res) {
        logger.info(`${req.user.email} ingresa a carrito`)
        let user = req.user
        const carrito = await carritosDao.findCarrito(user.email, false).then(result => { return result });
        res.render('content/carrito', { data: carrito });
    }

    async Ordenes(req, res) {
        logger.info(`${req.user.email} ingresa a ordenes`)
        let user = req.user
        const ordenes = await carritosDao.findOrdenes(user.email).then(result => { return result });
        res.render('content/ordenes', { data: ordenes });
    }

    async Usuario(req, res) {
        logger.info(`${req.user.email} ingresa a usuario`)
        let user = req.user
        const usuario = await usuariosDao.findUser(user.email).then(result => { return result });
        res.render('content/usuario', { data: usuario });
    }

    async Administrador(req, res) {
        logger.info(`Usuario especial ingresa a administrador`)
        if (req.query.admin) {
            const productos = await productosDao.getAll().then(result => { return result });
            res.render('content/admin', { data: productos });
        } else {
            logger.warn(`Usuario no tiene privilegios para administrador`)
            res.render('content/unauthorized', {
                data: {
                    error: -1,
                    descripcion: 'Ruta /admin método vista no autorizada'
                }
            })
        }
    }

    async Agregar(req, res) {
        logger.info(`Usuario especial ingresa a agregar producto`)
        const categorias = await productosDao.getAllCategories().then(result => { if(result == null) {
            return []
        } else {return result} });
        if (req.query.admin) {
            res.render('content/agregar', { datCat: categorias });
        } else {
            logger.warn(`Usuario no tiene privilegios para administrador`)
            res.render('content/unauthorized', {
                data: {
                    error: -1,
                    descripcion: 'Ruta /agregar método agregar no autorizada'
                }
            })
        }
    }

    async Editar(req, res) {
        logger.info(`Usuario especial ingresa a agregar editar producto`)
        const categorias = await productosDao.getAllCategories().then(result => { if(result == null) {
            return []
        } else {return result} });
        if (req.query.admin) {
            const productos = await productosDao.getById(req.params.id).then(result => { return result });
            res.render('content/editar', { data: productos, datCat: categorias });
        } else {
            logger.warn(`Usuario no tiene privilegios para administrador`)
            res.render('content/unauthorized', {
                data: {
                    error: -1,
                    descripcion: 'Ruta /editar método editar no autorizada'
                }
            })
        }
    }

    async Login(req, res) {
        logger.info(`Nuevo ingreso a login`)
        const person = req.user;
        if (person) {
            res.redirect('/')
        } else {
            res.render('content/login');
        }
    }

    async Logout(req, res) {
        logger.info(`Usuario deslogueado`)
        req.logout(function(err) {
            if (err) { return next(err); }
            res.render('content/logout');
        });
    }

    async Signup(req, res) {
        logger.info(`Nuevo ingreso a registro de usuario`)
        res.render('content/signup', { data: phones });
    }

    async ConfigSystem(req, res) {
        if (req.query.admin) {
            logger.info("Usuario revisa configuración de sistema")
            let config = dataConfig;
            res.render('content/config', { data: config });
        } else {
            logger.warn(`Usuario no tiene privilegios para administrador`)
            res.render('content/unauthorized', {
                data: {
                    error: -1,
                    descripcion: 'Ruta /config no autorizada'
                }
            })
        }
    }

    async ErrorLog(req,res) {
        if (req.query.admin) {
            let data = await readFileLog('error.log');
            // console.log(data);
            res.render('content/errLog', { data: data });
        } else {
            logger.warn(`Usuario no tiene privilegios para administrador`)
            res.render('content/unauthorized', {
                data: {
                    error: -1,
                    descripcion: 'Ruta /config no autorizada'
                }
            })
        }
    }

    async WarningLog(req,res) {
        if (req.query.admin) {
            logger.info("Usuario revisa configuración de sistema")
            let data = await readFileLog('warning.log');
            // console.log(data);
            res.render('content/warnLog', { data: data });
        } else {
            logger.warn(`Usuario no tiene privilegios para administrador`)
            res.render('content/unauthorized', {
                data: {
                    error: -1,
                    descripcion: 'Ruta /config no autorizada'
                }
            })
        }
    }
}

module.exports = Front;