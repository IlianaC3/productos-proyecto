const mongoose = require('mongoose')
const { connectionFinal, firebaseInit } = require('./connections')
const dataB = require('../selectionDB')

//Firebase
const collProdFirebase = dataB == 'firebase' ? connectionFinal.collection('productos') : null;
const collCarFirebase = dataB == 'firebase' ? connectionFinal.collection('carrito') : null;

//Mongoose
const collProducto = dataB == 'mongodb' || dataB == 'mongodbAtlas' ? mongoose.model('productos', {
    code: { type: String, required: true },
    timestamp: { type : Date, default: Date.now, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, required: true }
}) : null;

const collCategoria = dataB == 'mongodb' || dataB == 'mongodbAtlas' ? mongoose.model('categorias', {
    code: { type: String, required: true },
    name: { type: String, required: true },
}) : null;

const collCarrito = dataB == 'mongodb' || dataB == 'mongodbAtlas' ?  mongoose.model('carritos', {
    timestamp: { type: Date, default: new Date(), required: true },
    user: { type: String, required: true },
    comprado: { type: Boolean, required: true },
    productos: { type: [], required: true }
}) : null;

const collOrdenes = dataB == 'mongodb' || dataB == 'mongodbAtlas' ?  mongoose.model('ordenes', {
    timestamp: { type: Date, default: new Date(), required: true },
    user: { type: String, required: true },
    code: { type: String, required: true },
    estado: { type: String, required: true },
    total:  { type: Number, required: true },
    productos: { type: [], required: true }
}) : null;

const collUsuarios = dataB == 'mongodb' || dataB == 'mongodbAtlas' ? mongoose.model('usuarios', {
    email: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    edad: { type: Number, required: true },
    telefono: { type: String, required: true },
    foto: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true } 
}) : null;

const collMensaje = dataB == 'mongodb' || dataB == 'mongodbAtlas' ? mongoose.model('mensajes', {
    text: { type: String, required: true },
    timestamp: { type: Date, default: new Date(), required: true },
    autor: { type: {}, required: true }
}) : null;


module.exports = {collProducto, collCarrito, collUsuarios, firebaseInit, collCarFirebase, collProdFirebase, collMensaje, collCategoria, collOrdenes}