const codeGenerator = async function(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let index = 0; index < length; index++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return result;
}

const parseJSON = obj => JSON.parse(JSON.stringify(obj))

const renameField = (record, from, to) => {
    record[to] = record[from]
    delete record[from]
    return record
}
const removeField = (record, field) => {
    const value = record[field]
    delete record[field]
    return value
}

const findIdFunction = async function(arr, id) {
    return arr.find(obj => obj.id === parseInt(id))
};

const findIndexFunction = async function(arr, id) {
    return arr.findIndex(obj => obj.id === parseInt(id))
}

const filterIdFunction = async function(arr, id) {
    return arr.filter(obj => obj.id !== id)
}


module.exports = {codeGenerator, parseJSON, renameField, removeField, findIdFunction, findIndexFunction, filterIdFunction}