const { collCarrito, collProducto, collUsuarios, collOrdenes } = require('../../db/collections')
const { parseJSON , renameField, removeField, codeGenerator } = require('../../../utils/functions');
const { connectionFinal } = require('../../db/connections')
const nodemailer = require('../../../utils/emailMsg')
const logger = require('../../../utils/logger');

class Contenedor {
    constructor() {
        this.coleccion = collCarrito
    }
    async findCarrito(user, comprado) {
        try {
            connectionFinal();
            let docs = await this.coleccion.find({ 'user': `${user}`, 'comprado': comprado}, { __v: 0 }).lean();
            // console.log(docs)
            docs = docs.map(parseJSON)
            docs = docs.map(d => renameField(d, '_id', 'id'));
            
            let result = docs[0]
            // console.log(result)
            return result === undefined ? null : [ result ]
        } catch(e) {
            logger.error(`No se puede encontrar carrito para ${user} por error: ${e}`)
            return undefined;
        }
    }

    async save(product, user) {
        try {
            connectionFinal();
            const Producto = await collProducto.find({ '_id': product.id_prod }, { __v: 0 });
            const usuarioInfo = await collUsuarios.find({ 'email': user.email }, { __v: 0 });
            // console.log(usuarioInfo)
            if(product.cantidad > Producto[0].stock) {
                return "La cantidad ingresada es superior al stock disponible";
            } else {
                let newPr = {
                    code: Producto[0].code,
                    title: Producto[0].title,
                    description: Producto[0].description,
                    price: Producto[0].price,
                    quantity: product.cantidad,
                    thumbnail: Producto[0].thumbnail,
                    id: Producto[0]._id
                }
                let object = {
                    timestamp: new Date(),
                    user: user.email,
                    direccion: usuarioInfo[0].direccion,
                    comprado: false,
                    productos: [newPr]
                }
                // console.log(object)
                let doc = await this.coleccion.create(object);
                doc = parseJSON(doc)
                // console.log(doc)
                renameField(doc, '_id', 'id')
                removeField(doc, '__v')
                return "Carrito guardado con el id " + doc.id
            }

        } catch(e) {
            logger.error(`No se puede guadar carrito para ${user} por error: ${e}`)
            return undefined;
        }
    }

    async deleteById(id, user) {
        try {
            connectionFinal();
            const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id, 'user': `${user}`})
            if (n == 0 || nDeleted == 0) {
                return 'Error al borrar: no encontrado'
            } else {
                return `Carrito eliminado con id: ${id}`
            }
        } catch (e) {
            logger.error(`No se puede borrar carrito ${id} por error: ${e}`)
            return undefined;
        }
    }

    async getProductsById(id, user) {
        try {
            connectionFinal();
            const docs = await this.coleccion.find({ '_id': id, user: `${user}`}, { __v: 0 })
            if (docs.length == 0) {
               return 'Error al listar por id: no encontrado'
            } else {
                const result = renameField(parseJSON(docs[0]), '_id', 'id')
                return result.productos
            }
        } catch (e) {
            logger.error(`No se puede pueden obtener los productos de carrito ${id} por error: ${e}`)
            return undefined;
        }
    }

    async addProductsById(id, product, user) {
        try {
            connectionFinal();
            let newArray = [];
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 })
            const Producto = await collProducto.find({ '_id': product.id_prod }, { __v: 0 })
            if(product.cantidad > Producto[0].stock) {
                return "La cantidad ingresada es superior al stock disponible";
            } else {
                let newPr = {
                    code: Producto[0].code,
                    title: Producto[0].title,
                    description: Producto[0].description,
                    price: Producto[0].price,
                    quantity: product.cantidad,
                    thumbnail: Producto[0].thumbnail,
                    id: Producto[0]._id
                }
                newArray = docs[0].productos;
                newArray.push(newPr);
                const { n, nModified } = await this.coleccion.replaceOne({ '_id': id }, {'productos': newArray, 'comprado': false, 'timestamp': new Date(), 'user': `${user}`})
                if (n == 0 || nModified == 0) {
                    return 'Error al actualizar: no encontrado';
                } else {
                    renameField(product, '_id', 'id')
                    removeField(product, '__v')
                    return `Carrito editado con id: ${id}`
                }
            }
        } catch(e) {
            logger.error(`No se puede agregar producto ${product.id} a carrito ${id} por error: ${e}`)
            return undefined;
        }
    }

    async deleteProductById(id, id_prod, user) {
        try {
            connectionFinal();
            let newArray = [];
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 })
            newArray = docs[0].productos;
            let index = newArray.filter(obj => obj.id != id_prod);
            const { n, nModified, nDeleted } = index.length == 0 ? await this.coleccion.deleteOne({ '_id': id, 'user': `${user}`}) : await this.coleccion.replaceOne({ '_id': id }, {'productos': index, 'comprado': false, 'timestamp': new Date(), 'user': `${user}`})
            if (n == 0 || nModified == 0 || nDeleted == 0) {
                return 'Error al actualizar: no encontrado';
            } else {
                return `Carrito editado con id: ${id}`
            }
        } catch (e) {
            logger.error(`No se puede borrar producto ${id_prod} de carrito ${id} por error: ${e}`)
            return undefined;
        }
    }

    async comprarCarrito(id, user) {
        try {
            connectionFinal();
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 });
            // console.log(docs)
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': id }, {'productos': docs[0].productos, 'comprado': true, 'timestamp': new Date(), 'user': `${user[0].email}`})
            if (n == 0 || nModified == 0 ) {
                return 'Error al actualizar: no encontrado';
            } else {
                let total = 0;
                docs[0].productos.forEach(product => {
                    total = parseFloat(total) + (parseFloat(product.price)*parseInt(product.quantity));
                });
                // console.log(docs[0].direccion)
                let orden = {
                    timestamp: new Date(),
                    user: user[0].email,
                    estado: 'generado',
                    direccion: docs[0].direccion,
                    code: await codeGenerator(5),
                    total: total,
                    productos: docs[0].productos
                }
                let doc = await collOrdenes.create(orden);
                //OBJETO COMPRADO AHORA PROCEDO A ENVIAR CORREO Y MENSAJE
                //FUNCION CORREO
                // console.log(doc)
                if (doc) {
                    docs[0].productos.forEach(async product => {
                        const Producto = await collProducto.find({ '_id': product.id }, { __v: 0 })
                        let newStock = Producto[0].stock - product.quantity;
                        let updateProduct = {
                            code: Producto[0].code,
                            title: Producto[0].title,
                            description: Producto[0].description,
                            price: Producto[0].price,
                            thumbnail: Producto[0].thumbnail,
                            stock: newStock,
                            category: Producto[0].category
                        }
                        const { n, nModified } = await collProducto.replaceOne({ '_id': product.id }, updateProduct)
                    });
                    const sendMail = await nodemailer.sendMailShop(orden, user[0])
                    //FUNCION MENSAJE
                    const sendMsgUser = await nodemailer.sendMsgShop(orden, user[0]);
                    const sendMsgAdmin = await nodemailer.sendMsgShopAdmin(user);

                    return `Carrito editado con id: ${id}`
                } else {
                    return "No se pudo realizar la orden"
                }
                
            }
        }  catch (e) {
            logger.error(`No se puede borrar carrito ${id} por error: ${e}`)
            return undefined;
        }
        
       
    }

    async findOrdenes(user) {
        try {
            connectionFinal();
            let docs = await collOrdenes.find({ 'user': `${user}`}, { __v: 0 }).lean();
            // console.log(docs)
            docs = docs.map(parseJSON)
            docs = docs.map(d => renameField(d, '_id', 'id'));
            
            let result = docs
            // console.log(result)
            return result === undefined ? null : result
        } catch(e) {
            logger.error(`No se pueden encontrar las ordenes de ${user} por error: ${e}`)
            return undefined;
        }
    }

    async findOrdenesAll() {
        try {
            connectionFinal();
            let docs = await collOrdenes.find({}, { __v: 0 }).lean()
            // console.log(docs)
            docs = docs.map(parseJSON)
            docs = docs.map(d => renameField(d, '_id', 'id'));
            
            let result = docs
            // console.log(result)
            return result === undefined ? null : result
        } catch(e) {
            logger.error(`No se pueden encontrar las ordenes por error: ${e}`)
            return undefined;
        }
    }

}

module.exports = Contenedor;