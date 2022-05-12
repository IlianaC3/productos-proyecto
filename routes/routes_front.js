const express = require('express');
const app = express();

const arrayProd = require('../db/productos.json')
const arrayCar = require('../db/carrito.json')

app.set('view engine', 'ejs');
app.set('views', './public');

app.get('/', (req, res) => {
   res.render('index', {data: arrayProd, dataCar: arrayCar});
});

app.get('/carrito', (req, res) => {
   res.render('carrito', {data: arrayCar});
});

app.get('/administrador', (req, res) => {
   if (req.query.admin) {
      res.render('admin', {data: arrayProd});
   } else {
      res.render('unauthorized', {data:{
         error : -1,
         descripcion: 'Ruta /admin método vista no autorizada'
      }})
   }
 });
 
 app.get('/agregar', (req, res) => {
   if (req.query.admin) {
      res.render('agregar');
   } else {
      res.render('unauthorized', {data:{
         error : -1,
         descripcion: 'Ruta /agregar método agregar no autorizada'
      }})
   }
 });
 
 app.get('/editar/:id', (req, res) => {
   if (req.query.admin) {
      let index = arrayProd.findIndex(obj => obj.id === parseInt(req.params.id))
      res.render('editar', {data: arrayProd[index]});
   } else {
      res.render('unauthorized', {data:{
         error : -1,
         descripcion: 'Ruta /editar método editar no autorizada'
      }})
   }
 });

 app.get(/^\/[A-Za-z0-9.-_/*]/, (req, res) => {
      res.render('error')
 });

 module.exports = app;