const dataB = require('./selectionDB')
let productosDao
let carritosDao
let usuariosDao //Sólo Configuración Mongo Atlas
let chatDao //solo config Mongo Atlas

console.log(dataB)

switch (dataB) {
    case 'json':
        const ProductosFS = require('./dao/Productos/ProductosFS')
        const CarritoFS = require('./dao/Carritos/CarritoFS')
        const UsuariosDaoFS = require('./dao/Usuarios/Usuarios')
        const ChatDaoFS = require('./dao/Chat/ChatMongo')
        productosDao = new ProductosFS('productos.json')
        carritosDao = new CarritoFS('carrito.json')
        usuariosDao = new UsuariosDaoFS();
        chatDao = new ChatDaoFS();
        break
    case 'firebase':
        const ProductosFirebase = require('./dao/Productos/ProductosFirebase')
        const CarritosFirebase = require('./dao/Carritos/CarritoFirebase')
        const UsuariosDaoFire = require('./dao/Usuarios/Usuarios')
        const ChatDaoFire = require('./dao/Chat/ChatMongo')
        productosDao = new ProductosFirebase()
        carritosDao = new CarritosFirebase()
        usuariosDao = new UsuariosDaoFire()
        chatDao = new ChatDaoFire();
        break
    case 'mongodb':
        const ProductosMongo = require('./dao/Productos/ProductosMongo')
        const CarritosMongo = require('./dao/Carritos/CarritoMongo')
        const UsuariosDaoM = require('./dao/Usuarios/Usuarios')
        const ChatDaoM = require('./dao/Chat/ChatMongo')
        productosDao = new ProductosMongo()
        carritosDao = new CarritosMongo()
        usuariosDao = new UsuariosDaoM()
        chatDao = new ChatDaoM();
        break
    case 'mongodbAtlas':
        const ProductosMongoA = require('./dao/Productos/ProductosMongo')
        const CarritosMongoA = require('./dao/Carritos/CarritoMongo')
        const UsuariosDaoA = require('./dao/Usuarios/Usuarios')
        const ChatDaoA = require('./dao/Chat/ChatMongo')
        productosDao = new ProductosMongoA()
        carritosDao = new CarritosMongoA()
        usuariosDao = new UsuariosDaoA()
        chatDao = new ChatDaoA();
        break
    default:
        const ProductosM = require('./dao/Productos/ProductosM')
        const CarritosM = require('./dao/Carritos/CarritoM')
        const UsuariosDaoMD = require('./dao/Usuarios/Usuarios')
        const ChatDaoMD = require('./dao/Chat/ChatMongo')
        productosDao = new ProductosM()
        carritosDao = new CarritosM()
        usuariosDao = new UsuariosDaoMD()
        chatDao = new ChatDaoMD();
        break
}

module.exports = { productosDao, carritosDao, usuariosDao, chatDao }