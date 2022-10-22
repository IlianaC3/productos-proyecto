const { collUsuarios } = require('../../db/collections')
const { parseJSON, renameField } = require('../../../utils/functions');
const bcrypt = require('bcrypt');
const { connectionFinal } = require('../../db/connections')
const nodemailer = require('../../../utils/emailMsg')
const logger = require('../../../utils/logger');

class Contenedor {
    constructor() {
        this.coleccion = collUsuarios
    }

    async save(usuario) {
        try {
            connectionFinal();
            //guardar foto con fs
            let url = '';
            if (usuario.foto != '') {
                url = `./fotos/${usuario.foto}`;
            } else {
                url = 'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png'
            }

            let userObject = {};
            const usuarioInfo = await this.coleccion.find({ 'email': usuario.email }, { __v: 0 });
            if (usuarioInfo.length < 1) {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(usuario.password, salt);
                userObject = {
                    email: usuario.email,
                    nombre: usuario.nombre,
                    direccion: usuario.direccion,
                    edad: usuario.edad,
                    telefono: usuario.telefono,
                    foto: url,
                    password: hash,
                    isAdmin: false
                };
                let doc = await this.coleccion.create(userObject);
                console.log("doc", doc)
                doc = parseJSON(doc)
                //envio de mensaje
                const sendMail = await nodemailer.sendMailRegistration(userObject)
                return userObject
            } else {
                return null;
            }
        } catch (e) {
            logger.error(`No se puede guardar usuario ${usuario.email} por error: ${e}`)
            return undefined;
        }
    }

    async loginUser(usuario) {
        try {
            console.log("llega aqui")
            connectionFinal();
            console.log(usuario)
            const docs = await this.coleccion.findOne({ 'email': usuario.email }, { __v: 0 })
            console.log(docs)
            // docs = docs.map(parseJSON);
            let hash = docs.password;
            // console.log(docs.password, usuario.password);
            let verify = bcrypt.compareSync(usuario.password, hash);
            // console.log(hash, usuario.password, verify)
            if (verify) {
                let info = {
                    email: docs.email,
                    nombre: docs.nombre,
                    admin: docs.isAdmin
                }
                return info
            } else {
                return null
            }
        } catch (e) {
            logger.error(`No se puede logear a usuario ${usuario.email} por error: ${e}`)
            return undefined;
        }
    }

    async checkUser(user) {
        try {
            connectionFinal();
            const docs = await this.coleccion.findOne({ 'email': user }, { __v: 0 })
            console.log(docs)
            docs = docs.map(parseJSON)
            docs = docs.map(d => renameField(d, '_id', 'id'));
            let result = docs[0]
            return result === undefined ? false : true
        } catch(e) {
            logger.error(`No se puede verificar usuario ${user} por error: ${e}`)
            return undefined;
        }
    }

    async findUser(user) {
        try {
            connectionFinal();
            const docs = await this.coleccion.findOne({ 'email': user }, { __v: 0 })
            // console.log("doc ", docs)
            let result = docs
            // console.log("hasta aqui el result", result)
            return result === undefined ? null : [result]
        } catch (e) {
            logger.error(`No se puede encontrar usuario ${user} por error: ${e}`)
            return undefined;
        }
    }

}

module.exports = Contenedor;