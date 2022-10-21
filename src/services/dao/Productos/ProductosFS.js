const {readFile, writeFile} = require('../../../utils/fs')
const { codeGenerator, findIdFunction, findIndexFunction } = require('../../../utils/functions');

class Contenedor {
    constructor(nameFile) {
        this.nameFile = nameFile; 
        this.productosArr = [];
    }

    async save(product) {
        const findAll = await readFile(this.nameFile);
        this.productosArr = JSON.parse(findAll);
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
            await writeFile(this.nameFile, this.productosArr);
            return `Producto guardado con id: ${id}`
        } catch (e) {
            return `No se pudo guardar el producto`;
        }
    }

    async getById(id) {
        try {
            let findId = await readFile(this.nameFile);
            this.productosArr = JSON.parse(findId);
            let result = await findIdFunction(this.productosArr, id);
            return result === undefined ? null : result;
        } catch {
            return "Error al leer archivo";
        }
    }

    async getAll() {
        try {
            let findId = await readFile(this.nameFile);
            this.productosArr = JSON.parse(findId);
            return this.productosArr;
        } catch {
            return "Error al leer arreglo";
        }
    }

    async updateById(id, product) {
        try {
            let findId = await readFile(this.nameFile);
            this.productosArr = JSON.parse(findId);
            let result = await findIndexFunction(this.productosArr, id);
            if (result > -1) {
                this.productosArr[result].title = product.title;
                this.productosArr[result].price = product.price;
                this.productosArr[result].thumbnail = product.thumbnail;
                this.productosArr[result].description = product.description;
                this.productosArr[result].stock = product.stock;
                try {
                    await writeFile(this.nameFile, this.productosArr);
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
            console.log("este es el id", id);
            let findId = await readFile(this.nameFile);
            this.productosArr = JSON.parse(findId);
            console.log(this.productosArr);
            let result = await findIndexFunction(this.productosArr, id);
            if (result > -1) {
                this.productosArr.splice(result, 1);
                try {
                    let saveData = await writeFile(this.nameFile, this.productosArr);
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