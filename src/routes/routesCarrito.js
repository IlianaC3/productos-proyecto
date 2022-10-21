const express = require('express');
const { Router } = express;
const PublicAuth = require('../controllers/authController');
const CarritoController = require('../controllers/carritosController');
const Carrito = new CarritoController();
const publicAuthorization = new PublicAuth();
const router = new Router();

//Carrito
//Falta listar carrito :/
router.get('/',  publicAuthorization.publicAuthorization, Carrito.carritoUser);

router.post('/', publicAuthorization.publicAuthorization, Carrito.saveCarrito);

router.delete('/:id', publicAuthorization.publicAuthorization, Carrito.deleteCarrito);

//Productos carrito
router.get('/:id/productos',  publicAuthorization.publicAuthorization, Carrito.productosCarrito);

router.post('/:id/productos', publicAuthorization.publicAuthorization, Carrito.saveProductoCarrito);

router.put('/:id/', publicAuthorization.publicAuthorization, Carrito.updateCarrito);

router.delete('/:id/productos/:id_prod', publicAuthorization.publicAuthorization, Carrito.deleteProductoCarrito);

module.exports = router;
