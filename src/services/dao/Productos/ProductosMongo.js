const { collProducto, collCategoria } = require('../../db/collections')
const { parseJSON , renameField, removeField, codeGenerator } = require('../../../utils/functions');
const { connectionFinal } = require('../../db/connections')

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
        } catch(error) {
            return "Error al leer archivo" + error;
        }
    }

    async getById(id) {
        try {
            connectionFinal();
            const docs = await this.coleccion.find({ '_id': id }, { __v: 0 })
            if (docs.length == 0) {
               return 'Error al listar por id: no encontrado'
            } else {
                const result = renameField(parseJSON(docs[0]), '_id', 'id')
                return result
            }
        } catch (error) {
            return `Error al listar por id: ${error}`
        }
    }

    async getProductoByCategory(data) {
        try {
            connectionFinal();
            const docs = await this.coleccion.find({ 'category': data }, { __v: 0 })
            if (docs.length == 0) {
               return 'Error al listar por id: no encontrado'
            } else {
                const result = renameField(parseJSON(docs), '_id', 'id')
                return result
            }
        } catch (error) {
            return `Error al listar por id: ${error}`
        }
    }

    async getAll() {
        try {
            connectionFinal();
            let docs = await this.coleccion.find({}, { __v: 0 }).lean()
            docs = docs.map(parseJSON)
            docs = docs.map(d => renameField(d, '_id', 'id'))
            return docs
            } catch (error) {
                return `Error al listar todo: ${error}`
            }
    }

    async updateById(id, product) {
        try {
            connectionFinal();
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': id }, product)
            if (n == 0 || nModified == 0) {
                return 'Error al actualizar: no encontrado';
            } else {
                renameField(product, '_id', 'id')
                removeField(product, '__v')
                console.log(product)
                return `Producto editado con id: ${id}`
            }
        } catch (error) {
            return `Error al actualizar: ${error}`
        }
    }

    async deleteById(id) {
        try {
            connectionFinal();
            const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id })
            if (n == 0 || nDeleted == 0) {
                return 'Error al borrar: no encontrado'
            } else {
                return `Producto eliminado con id: ${id}`
            }
        } catch (error) {
            return `Error al borrar: ${error}`
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
        } catch(error) {
            return "Error al leer archivo" + error;
        }
    }

    async getAllCategories() {
        try {
            console.log("llega aqui")
            connectionFinal();
            let docs = await this.categoria.find({}, { __v: 0 }).lean()
            docs = docs.map(parseJSON)
            docs = docs.map(d => renameField(d, '_id', 'id'))
            return docs
            } catch (error) {
                return `Error al listar todo: ${error}`
            }
    }

    async updateCategoryById(id, product) {
        try {
            connectionFinal();
            const { n, nModified } = await this.categoria.replaceOne({ '_id': id }, product)
            if (n == 0 || nModified == 0) {
                return 'Error al actualizar: no encontrado';
            } else {
                renameField(product, '_id', 'id')
                removeField(product, '__v')
                console.log(product)
                return `Categoria editada con id: ${id}`
            }
        } catch (error) {
            return `Error al actualizar: ${error}`
        }
    }

    async deleteByIdCat(id) {
        try {
            connectionFinal();
            const { n, nDeleted } = await this.categoria.deleteOne({ '_id': id })
            if (n == 0 || nDeleted == 0) {
                return 'Error al borrar: no encontrado'
            } else {
                return `Producto eliminado con id: ${id}`
            }
        } catch (error) {
            return `Error al borrar: ${error}`
        }
    }
}



module.exports = Contenedor;