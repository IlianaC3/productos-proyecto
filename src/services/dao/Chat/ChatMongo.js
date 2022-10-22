const { collMensaje, collUsuarios } = require('../../db/collections')
const { parseJSON } = require('../../../utils/functions');
const { connectionFinal } = require('../../db/connections')
const chatsNorm = require('../../../utils/normalizer')
const logger = require('../../../utils/logger');

class Contenedor {
    constructor() {
        this.mensajesColl = collMensaje;
        this.usuariosColl = collUsuarios;
        this.autorObject = {}
        this.object = {}
    }
    async save(chat) {
        try {
            connectionFinal();
            const checkUser = await this.usuariosColl.findOne({ 'email': chat.autor.email }, { __v: 0 });
            let isSystem = checkUser.isAdmin == false ? false : true;
            this.autorObject = {
                id: chat.autor.email,
                nombre: chat.autor.nombre,
                edad: chat.autor.edad,
                avatar: chat.autor.foto,
                isSystem: isSystem
            }
            this.object = {
                text: chat.text,
                timestamp: new Date(),
                autor: this.autorObject
            }
            let doc = await this.mensajesColl.create(this.object);
            doc = parseJSON(doc)
            return 'Mensaje enviado' + doc
        } catch (e) {
            logger.error(`No se puede guardar mensaje ${chat.text} de ${chat.autor.email} por error: ${e}`)
            return undefined;
        }
    }

    async getAll() {
        try {
            connectionFinal();
            let docs = await this.mensajesColl.find({}, { __v: 0 }).lean()
            // console.log("esta es el resultado", docs)
            docs = docs.map(parseJSON)
            return chatsNorm(docs)
        } catch (error) {
            logger.error(`No se pueden encontrar los mensajes de chat por error: ${e}`)
            return undefined;
        }
    }

    async getAllMessagesAutor(id) {
        try {
            connectionFinal();
            let docs = await this.mensajesColl.find({ 'autor.id': id }, { __v: 0 })
            // console.log("esta es el resultado individual", docs)
            docs = docs.map(parseJSON)
            return docs
        } catch (error) {
            logger.error(`No se pueden encontrar los mensajes de usuario ${id} por error: ${e}`)
            return undefined;
        }
    }

}

module.exports = Contenedor;