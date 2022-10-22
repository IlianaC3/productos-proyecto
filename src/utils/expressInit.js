const express = require('express');
require('dotenv').config();
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const passport = require('./passport')
const { mongodbU} = require('../services/db/config')
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({limit: '10mb'}))
app.use(cookieParser())

console.log(process.env.SESSION_TIME)

//SESSION
app.use(session({
	store: MongoStore.create({ mongoUrl: mongodbU.cnxStr }),
	secret: process.env.SECRET_KEY,
	resave: true,
	saveUninitialized: false,
	rolling: true,
	cookie: {
		maxAge: parseInt(process.env.SESSION_TIME) || 60000
	}
}))

app.set('view engine', 'ejs');
app.set('views', './public');

app.use(express.static('public')); 
app.use('/fotos', express.static('fotos'));

app.use(passport.initialize());
app.use(passport.session());

const routes_user = require('../routes/routesUser');
app.use("/api/user", routes_user);

const routes_productos = require('../routes/routesProductos');
app.use("/api/productos", routes_productos);

const routes_categorias = require('../routes/routesCategorias');
app.use("/api/categorias", routes_categorias);

const routes_carritos = require('../routes/routesCarrito');
app.use("/api/carrito", routes_carritos);

const routes_ordenes = require('../routes/routesOrdenes');
app.use("/api/ordenes", routes_ordenes);

const routes_config = require('../routes/routesConfig');
app.use("/api/config", routes_config);

const routes_front = require('../routes/routesFront');
app.use('', routes_front)

app.use((req, res, next) => {
    msg = 'Ruta no encontrada',
    res.render('content/error', { data: msg })
});


module.exports = app;