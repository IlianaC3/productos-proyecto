const express = require('express');
const { Router } = express;
const ProductosController = require('../controllers/productosController');
const Producto = new ProductosController();
const upload = require("../utils/multer");
const router = new Router();

router.get('/', Producto.getProductos);

router.get('/:id', Producto.getProductoById);

router.get('/categorias/:data', Producto.getProductoByCategory);

router.post('/', upload.single('thumbnail'), Producto.saveProducto);

router.put('/:id', upload.single('thumbnail'), Producto.updateProducto);

router.delete('/:id', Producto.deleteProducto);

module.exports = router;
