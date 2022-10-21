//Socket
const { chatDao } = require('../services/index');
const logger = require('../utils/logger');

class SocketController {
   async websocketController (socket, ioServer) {
      logger.info('Lista de chats')
      socket.emit('listMessages', await chatDao.getAll());

      socket.on("messages", async (data) => {
         logger.info(`Envía mensaje: ${data}`)
         await chatDao.save(data);
         ioServer.sockets.emit("listMessages", await chatDao.getAll());
      });
   }
}

module.exports = SocketController;