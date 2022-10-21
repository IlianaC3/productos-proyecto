const normalizr = require("normalizr");

const autoresSchema = new normalizr.schema.Entity('autor', {}, { idAttribute: 'id' });
const chatsSchema = new normalizr.schema.Entity('mensajes', {
  autor: autoresSchema
}, { idAttribute: 'id' });

function ChatsNorm(data) {
  let chatArr = {
    "id": 0,
    "mensajes": data
  }
  const normalized = normalizr.normalize(chatArr, chatsSchema);
  return normalized
}

module.exports = ChatsNorm
