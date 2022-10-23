const http = require('http');
require('dotenv').config();
const cluster = require('cluster');
const app = require('./src/utils/expressInit')
const os = require('os');
const { mode, server_port, } = require('./config')

const server = http.createServer(app);
//Websocket
const { Server: IOServer } = require("socket.io");
const ioController = require('./src/controllers/socketController');
const ioCont = new ioController();
const ioServer = new IOServer(server);
ioServer.on("connection", async (socket) => ioCont.websocketController(socket, ioServer));

//PUERTO
const minimist = require('minimist');
const minimistArg = minimist(process.argv, { alias: {'p': 'port'}});
const port = minimistArg.port || server_port || 3000;
const modeServer = mode || 'FORK';

//Configuracion PID
const numeroCpus = os.cpus().length;
const processId = process.pid;
const isMaster = cluster.isMaster;

if (isMaster && modeServer === 'CLUSTER') {
   for (let i = 0; i < numeroCpus; i++) {
     cluster.fork();
   }
   cluster.on('exit', (worker) => {
     console.log(`Proceso worker con PID ${worker.process.pid} salio`);
   });
} else {
   server.listen(port, () => {
      console.log(`Servidor express - Puerto ${port} - PID ${processId} - Fecha y hora ${(new Date().toLocaleString())}`);
   });
}