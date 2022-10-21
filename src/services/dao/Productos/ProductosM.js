const { codeGenerator, findIdFunction, findIndexFunction } = require('../../../utils/functions')

class Contenedor {
    constructor() {
        this.productosArr = [];
    }

    async save(product) {
        let code = await codeGenerator(5);
        let id = this.productosArr.length > 0 ? this.productosArr[this.productosArr.length-1].id + 1 : 1;
        if (this.productosArr.length > 0) {
            let objectWithId = {
                id: id,
                code: code,
                timestamp: new Date(),
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                stock: product.stock
            }
            this.productosArr.push(objectWithId);
        } else {
            this.productosArr = [{
                id: id,
                code: code,
                timestamp: new Date(),
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                stock: product.stock
            }]
        }
        try {
            return `Producto guardado con id: ${id}`
        } catch (e) {
            return `No se pudo guardar el producto`;
        }
    }

    async getById(id) {
        try {
            let result = await findIdFunction(this.productosArr, id);
            return result === undefined ? null : result;
        } catch {
            return "Error al leer archivo";
        }
    }

    async getAll() {
        try {
            return this.productosArr;
        } catch {
            return "Error al leer arreglo";
        }
    }

    async updateById(id, product) {
        try {
            let result = await findIndexFunction(this.productosArr, id);
            if (result > -1) {
                this.productosArr[result].title = product.title;
                this.productosArr[result].price = product.price;
                this.productosArr[result].thumbnail = product.thumbnail;
                this.productosArr[result].description = product.description;
                this.productosArr[result].stock = product.stock;
                try {
                    return `Producto editado con id: ${id}`
                } catch (e) {
                    return `No se pudo guardar el producto`;
                }
            } else{
                return "No existe el producto"
            }
        } catch {
            return "Error al ejecutar acción";
        }
    }

    async deleteById(id) {
        try {
            let result = await findIndexFunction(this.productosArr, id);
            if (result > -1) {
                this.productosArr.splice(result, 1);
                try {
                    return `Producto eliminado con id: ${id}`
                } catch (e) {
                    return `No se pudo eliminar el producto`;
                }
            } else {
                return `El producto con ID ${id} no existe`
            }
        } catch {
            return "Error al eliminar producto"
        }
    }
}



module.exports = Contenedor;