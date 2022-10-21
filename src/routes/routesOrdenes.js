const express = require('express');
const { Router } = express;
const PublicAuth = require('../controllers/authController');
const CarritoController = require('../controllers/carritosController');
const Carrito = new CarritoController();
const publicAuthorization = new PublicAuth();
const router = new Router();

//Ordenes
router.get('/',  publicAuthorization.publicAuthorization, Carrito.ordenesUsuario);

//Ordenes admin
router.get('/all', Carrito.ordenesAll);

module.exports = router;
