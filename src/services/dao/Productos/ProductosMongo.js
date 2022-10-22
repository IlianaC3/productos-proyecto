const { collProducto, collCategoria } = require('../../db/collections')
const { parseJSON, renameField, removeField, codeGenerator } = require('../../../utils/functions');
const { connectionFinal } = require('../../db/connections')
const logger = require('../../../utils/logger');

class Contenedor {
    constructor() {
        this.coleccion = collProducto,
            this.categoria = collCategoria
    }

    async save(product) {
        try {
            connectionFinal();
            let code = await codeGenerator(5);
            let object = {
                code: code,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: `./fotos/${product.thumbnail}`,
                stock: product.stock,
                category: product.category
            }
            let doc = await this.coleccion.create(object);
            doc = parseJSON(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return "Producto guardado con el id " + doc.id
        } catch (e) {
            logger.error(`No se puede guardar producto ${product.title} por error: ${e}`)
            return undefined;
        }
    }

    async getById(id) {
        try {
            connectionFinal();
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 })
            if (docs.length == 0) {
                logger.error(`No se puede obtener producto ${id}, no existe`)
                return 'Error al listar por id: no encontrado'
            } else {
                const result = renameField(parseJSON(docs[0]), '_id', 'id')
                return result
            }
        } catch (e) {
            logger.error(`No se puede obtener producto ${id} por error: ${e}`)
            return undefined;
        }
    }

    async getProductoByCategory(data) {
        try {
            connectionFinal();
            const docs = await this.coleccion.find({ 'category': data }, { __v: 0 })
            if (docs.length == 0) {
                logger.error(`No se puede obtener productos de categoría ${data}, no existen`)
                return [];
            } else {
                const result = renameField(parseJSON(docs), '_id', 'id')
                return result
            }
        } catch (e) {
            logger.error(`No se puede obtener productos de categoría ${data} por error: ${e}`)
            return undefined;
        }
    }

    async getAll() {
        try {
            connectionFinal();
            let docs = await this.coleccion.find({}, { __v: 0 }).lean()
            docs = docs.map(parseJSON)
            docs = docs.map(d => renameField(d, '_id', 'id'))
            return docs
        } catch (e) {
            logger.error(`No se puede obtener productos por error: ${e}`)
            return undefined;
        }
    }

    async updateById(id, product) {
        try {
            connectionFinal();
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': id }, product)
            if (n == 0 || nModified == 0) {
                logger.error(`No se puede editar producto ${id}, no existe`)
                return 'Error al actualizar: no encontrado';
            } else {
                renameField(product, '_id', 'id')
                removeField(product, '__v')
                console.log(product)
                return `Producto editado con id: ${id}`
            }
        } catch (e) {
            logger.error(`No se puede editar producto ${id} por error: ${e}`)
            return undefined;
        }
    }

    async deleteById(id) {
        try {
            connectionFinal();
            const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id })
            if (n == 0 || nDeleted == 0) {
                logger.error(`No se puede eliminar producto ${id}, no existe`)
                return 'Error al borrar: no encontrado'
            } else {
                return `Producto eliminado con id: ${id}`
            }
        } catch (e) {
            logger.error(`No se puede eliminar producto ${id} por error: ${e}`)
            return undefined;
        }
    }

    //Categorias
    async saveCategory(product) {
        try {
            connectionFinal();
            let code = await codeGenerator(5);
            let object = {
                code: code,
                name: product.name
            }
            let doc = await this.categoria.create(object);
            console.log("resultado", doc)
            doc = parseJSON(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return "Categoría guardada con el id " + doc.id
        } catch (e) {
            logger.error(`No se puede guardar categoria ${product.name} por error: ${e}`)
            return undefined;
        }
    }

    async getAllCategories() {
        try {
            connectionFinal();
            let docs = await this.categoria.find({}, { __v: 0 }).lean()
            docs = docs.map(parseJSON)
            docs = docs.map(d => renameField(d, '_id', 'id'))
            return docs
        } catch (e) {
            logger.error(`No se puede obtener todas las categorias por error: ${e}`)
            return undefined;
        }
    }

    async updateCategoryById(id, product) {
        try {
            connectionFinal();
            const { n, nModified } = await this.categoria.replaceOne({ '_id': id }, product)
            if (n == 0 || nModified == 0) {
                logger.error(`No se puede editar categoria ${id}, no existe`)
                return 'Error al actualizar: no encontrado';
            } else {
                renameField(product, '_id', 'id')
                removeField(product, '__v')
                console.log(product)
                return `Categoria editada con id: ${id}`
            }
        } catch (e) {
            logger.error(`No se puede editar categoria ${id} por error: ${e}`)
            return undefined;
        }
    }

    async deleteByIdCat(id) {
        try {
            connectionFinal();
            const { n, nDeleted } = await this.categoria.deleteOne({ '_id': id })
            if (n == 0 || nDeleted == 0) {
                logger.error(`No se puede eliminar categoria ${id}, no existe`)
                return 'Error al borrar: no encontrado'
            } else {
                return `Producto eliminado con id: ${id}`
            }
        } catch (e) {
            logger.error(`No se puede eliminar categoria ${id} por error: ${e}`)
            return undefined;
        }
    }
}



module.exports = Contenedor;