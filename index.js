const http = require('http');
const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded());

const routes_productos = require('./routes/routes_productos');
app.use("/api/productos", routes_productos);

const routes_carritos = require('./routes/routes_carrito.js');
app.use("/api/carrito", routes_carritos);

const routes_front = require('./routes/routes_front.js');
app.use('', routes_front)

const server = http.createServer(app);

server.listen(port, () => {
   console.log(`Aplicación ejecutandose en el puerto: ${port}`);
});
