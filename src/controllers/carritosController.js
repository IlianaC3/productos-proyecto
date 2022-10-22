const { carritosDao, usuariosDao } = require('../services/index');
const logger = require('../utils/logger');

class CarritoController {

    async carritoUser(req, res, next) {
        let user = req.user;
        carritosDao.findCarrito(user.email, false).then(result => {
            if (result !== undefined) {
                if (result === null) {
                    logger.warn(`No existe carrito para usuario ${user.email}`)
                    res.status(404).json({
                        error: `Carrito no encontrado para el usuario ${user.email}`,
                    });
                } else {
                    logger.info(`Carrito para usuario ${user.email} encontrado`)
                    res.status(200).json({
                        message: `Carrito usuario: ${user.email}`,
                        result: result
                    });
                }
            } else {
                logger.error(`Ocurrio error al buscar carrito para ${user.email}`)
                res.status(404).json({
                    error: `El archivo no se puede leer`,
                });
            }
        });
    }

    async saveCarrito(req, res, next) {
        let { id_prod, cantidad } = req.body;
        let user = req.user;
        let nuevoProducto = {
            id_prod,
            cantidad
        }
        console.log(nuevoProducto)
        if (cantidad != '' && cantidad > 0) {
            carritosDao.save(nuevoProducto, user).then(result => {
                if (result !== undefined) {
                    logger.info(`${result} de usuario ${user.email}`)
                    res.status(200).json({
                        message: `Nuevo Carrito`,
                        result: result
                    });
                } else {
                    logger.error(`No se puede crear carrito de usuario ${user.email}`)
                    res.status(404).json({
                        error: `No se pudo guardar el Carrito`,
                    });
                }
            });
        } else {
            logger.error(`No se puede crear carrito de usuario ${user.email} porque la cantidad no es válida para producto ${id_prod}`)
            res.status(201).json({
                error: `No se pudo guardar el Carrito porque cantidad no es válida`,
            });
        }

    }

    async deleteCarrito(req, res, next) {
        let id = req.params.id;
        let user = req.user;
        carritosDao.deleteById(id, user.email).then(result => {
            if (result !== undefined) {
                logger.info(`${result} de usuario ${user.email}`)
                res.status(200).json({
                    message: `Eliminar Carrito ${id}`,
                    result: result
                });
            } else {
                logger.error(`No se puede eliminar carrito de usuario ${user.email}`)
                res.status(404).json({
                    error: `No se pudo eliminar el Carrito`,
                });
            }
        });
    }

    async productosCarrito(req, res, next) {
        let id = req.params.id;
        let user = req.user;
        carritosDao.getProductsById(id, user.email).then(result => {
            if (result !== undefined) {
                if (result === null) {
                    logger.warn(`No existe carrito ${id}`)
                    res.status(404).json({
                        error: `Carrito no encontrado para el id ${id}`,
                    });
                } else {
                    logger.info(`Carrito con id ${id} encontrado`)
                    res.status(200).json({
                        message: `Carrito ID: ${id}`,
                        result: result
                    });
                }
            } else {
                logger.error(`Ocurrio error al buscar carrito con id ${id}`)
                res.status(404).json({
                    error: `El archivo no se puede leer`,
                });
            }
        });
    }

    async saveProductoCarrito(req, res, next) {
        let id = req.params.id;
        let { id_prod, cantidad } = req.body;
        let editarCarrito = {
            id_prod,
            cantidad
        }
        if (cantidad != '' && cantidad > 0) {
            console.log("editar carrito", editarCarrito)
            let user = req.user;
            carritosDao.addProductsById(id, editarCarrito, user.email).then(result => {
                // console.log(result)
                if (result !== undefined) {
                    logger.info(`Editar Carrito: ${result}`)
                    res.status(200).json({
                        message: `Editar Carrito ${id}`,
                        result: result
                    });
                } else {
                    logger.error(`No se puede editar carrito ${id} con nuevos productos`)
                    res.status(404).json({
                        error: `No se pudo modificar el Carrito`,
                    });
                }
            });
        } else {
            logger.error(`No se puede editar carrito de usuario ${user.email} porque la cantidad no es válida`)
            res.status(201).json({
                error: `No se pudo editar el Carrito porque cantidad no es válida`,
            });
        }

    }

    async updateCarrito(req, res, next) {
        let id = req.params.id;
        let user = req.user;
        usuariosDao.findUser(user.email).then(resultU => {
            console.log(resultU)
            carritosDao.comprarCarrito(id, resultU).then(result => {
                // console.log(result)
                if (result !== undefined) {
                    logger.info(`${result} de usuario ${user.email}`)
                    res.status(200).json({
                        message: `Editar Carrito ${id}`,
                        result: result
                    });
                } else {
                    logger.error(`No se puede editar carrito de usuario ${user.email}`)
                    res.status(404).json({
                        error: `No se pudo modificar el Carrito`,
                    });
                }
            });
        })
    }

    async deleteProductoCarrito(req, res, next) {
        let id = req.params.id;
        let id_prod = req.params.id_prod;
        let user = req.user;
        carritosDao.deleteProductById(id, id_prod, user.email).then(result => {
            if (result !== undefined) {
                logger.info(`Editar Carrito: ${result}`)
                res.status(200).json({
                    message: `Eliminar Producto Carrito ${id}`,
                    result: result
                });
            } else {
                logger.error(`No se puede editar carrito ${id}`)
                res.status(404).json({
                    error: `No se pudo eliminar el Producto del Carrito`,
                });
            }
        });
    }

    //Ordenes
    async ordenesUsuario(req, res, next) {
        let user = req.user;
        carritosDao.findOrdenes(user.email).then(result => {
            if (result !== undefined) {
                if (result === null) {
                    logger.warn(`No existen ordenes para usuario ${user.email}`)
                    res.status(404).json({
                        error: `Ordenes no encontradas para el usuario ${user.email}`,
                    });
                } else {
                    logger.info(`Ordenes para usuario ${user.email} encontradas`)
                    res.status(200).json({
                        message: `Ordenes usuario: ${user.email}`,
                        result: result
                    });
                }
            } else {
                logger.error(`Ocurrio error al buscar ordenes para ${user.email}`)
                res.status(404).json({
                    error: `El archivo no se puede leer`,
                });
            }
        });
    }

    async ordenesAll(req, res, next) {
        if (req.query.admin) {
            carritosDao.findOrdenesAll().then(result => {
                if (result !== undefined) {
                    if (result === null) {
                        logger.warn(`No existen ordenes`)
                        res.status(404).json({
                            error: `Ordenes no encontradas`,
                        });
                    } else {
                        logger.info(`Ordenes encontradas`)
                        res.status(200).json({
                            message: `Ordenes`,
                            result: result
                        });
                    }
                } else {
                    logger.error(`Ocurrio error al buscar ordenes`)
                    res.status(404).json({
                        error: `El archivo no se puede leer`,
                    });
                }
            });
        } else {
            logger.warn(`Usuario no tiene accesos para esta sección`)
            res.status(404).json({
                error: `No tienes acceso`,
            });
        }
    }

}

module.exports = CarritoController