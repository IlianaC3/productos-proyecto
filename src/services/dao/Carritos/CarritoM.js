const { findIdFunction, findIndexFunction } = require('../../../utils/functions')

class Contenedor {
    constructor() {
        this.productosArr = [];
        this.carritosArr = [];
    }

    async findCarrito() {
        try {
            let result = this.carritosArr[0]
            return result === undefined ? [] : [result];
        } catch {
            return "Error al leer archivo";
        }
    }

    async save(product) {
        let id = this.carritosArr.length > 0 ? this.carritosArr[this.carritosArr.length-1].id + 1 : 1;
        let newProducto = await findIdFunction(this.productosArr, product.id_prod);
        if (this.carritosArr.length > 0) {
            let objectWithId = {
                id: id,
                timestamp: new Date(),
                productos: [newProducto]
            }
            this.carritosArr.push(objectWithId);
        } else {
            this.carritosArr = [{
                id: id,
                timestamp: new Date(),
                productos: [newProducto]
            }]
        }
        try {
            return `Producto guardado con id: ${id}`
        } catch (e) {
            return `No se pudo guardar el producto`;
        }
    }

    async deleteById(id) {
        try {
            let result = await findIndexFunction(this.carritosArr, id);
            if (result > -1) {
                this.carritosArr.splice(result, 1);
                try {
                    return `Carrito eliminado con id: ${id}`
                } catch (e) {
                    return `No se pudo eliminar el Carrito`;
                }
            } else {
                return `El Carrito con ID ${id} no existe`
            }
        } catch {
            return "Error al eliminar Carrito"
        }
    }

    async getProductsById(id) {
        try {
            let result = await findIdFunction(this.carritosArr, id);
            return result === undefined ? null : result.productos;
        } catch {
            return "Error al leer archivo";
        }
    }

    async addProductsById(id, product) {
        try {
            let result = await findIndexFunction(this.carritosArr, id);
            if (result > -1) {
                let newProducto = await this.productosArr(this.productosArr, product.id_prod);
                this.carritosArr[result].productos.push(newProducto)
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

    async deleteProductById(id, id_prod) {
        try {
            let result = await findIndexFunction(this.carritosArr, id);
            if (result > -1) {
                let resultProd = await findIndexFunction(this.carritosArr[index].productos, id_prod);
                if (resultProd > -1) {
                    this.carritosArr[result].productos.splice(resultProd, 1);
                    
                    if (this.carritosArr[result].productos.length === 0) {
                        this.carritosArr.splice(result, 1);
                    }
                    try {
                        return `Producto eliminado con id: ${id}`
                    } catch (e) {
                        return `No se pudo eliminar el producto`;
                    }
                } else {
                    return `El producto con ID ${id} no existe`
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