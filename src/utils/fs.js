const fs = require('fs');

const readFile = async function(nameFile) {
    return await fs.promises.readFile(`./src/services/db/${nameFile}`, 'utf-8');
}

const writeFile = async function() {
    return await fs.promises.writeFile(`./src/services/db/${nameFile}`, JSON.stringify(carritosArr, null, 2), 'utf-8');
}

module.exports = { readFile, writeFile}