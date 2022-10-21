const mongoose = require('mongoose')
const { mongodb, mongodbU, firebase } = require("./config");
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const dataB = require('../selectionDB')

let firebaseInit;

const connectionFinal = async function() {
    if (dataB == 'mongodb') {
        return await mongoose.connect(mongodb.cnxStr, mongodb.options);
    } else if (dataB == 'mongodbAtlas') {
        return await mongoose.connect(mongodbU.cnxStr, mongodbU.options);
    } else if (dataB == 'firebase') {
        firebaseInit = initializeApp({
            credential: cert(firebase)
        })
        return getFirestore();
    }
}

connectionFinal();


module.exports = { connectionFinal, firebaseInit }