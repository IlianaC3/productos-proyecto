const fs = require('fs');

const readFile = async function(nameFile) {
    return await fs.promises.readFile(`./src/services/db/${nameFile}`, 'utf-8');
}

const readFileLog = async function(nameFile) {
    return await fs.promises.readFile(`./${nameFile}`, 'utf-8');
}

module.exports = { readFile, readFileLog }