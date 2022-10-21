
const views = require('./routesInit')
const PublicAuth = require('../controllers/authController');
const FrontController = require('../controllers/frontControllers')
const Front = new FrontController();

const publicAuthorization = new PublicAuth();

views.get('/', publicAuthorization.publicAuthorization, Front.Home);

views.get('/productos/:categoria', publicAuthorization.publicAuthorization, Front.Productos);

views.get('/carrito', publicAuthorization.publicAuthorization, Front.Carrito);

views.get('/ordenes', publicAuthorization.publicAuthorization, Front.Ordenes);

views.get('/usuario', publicAuthorization.publicAuthorization, Front.Usuario);

views.get('/administrador', Front.Administrador);
 
views.get('/agregar', Front.Agregar);
 
views.get('/editar/:id', Front.Editar);

 
// LOGIN //
views.get('/login', Front.Login)

views.get('/logout', Front.Logout)

//REGISTRO
views.get('/signup', Front.Signup)

//Chat
views.get('/chat/', publicAuthorization.publicAuthorization, Front.Chat)

views.get('/chat/:email', publicAuthorization.publicAuthorization, Front.ChatIndividual)

//Configuración de Sistema
views.get('/config', Front.ConfigSystem)

 module.exports = views;