const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./passport')

app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({limit: '10mb'}))

//SESSION
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: true,
	saveUninitialized: false,
	rolling: true,
	cookie: {
		maxAge: 600000
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

const routes_front = require('../routes/routesFront');
app.use('', routes_front)

app.use((req, res, next) => {
    msg = 'Ruta no encontrada',
    res.render('content/error', { data: msg })
});


module.exports = app;