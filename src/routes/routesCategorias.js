const express = require('express');
const { Router } = express;
const CategoriasController = require('../controllers/categoriasControllers');
const Categoria = new CategoriasController();
const router = new Router();

router.get('/', Categoria.getCategorias);

router.post('/', Categoria.saveCategoria);

router.put('/:id', Categoria.updateCategory);

router.delete('/:id', Categoria.deleteCategory);

module.exports = router;
