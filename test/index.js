
require('dotenv').config();

const _ = require('lodash');
const Promise = require('bluebird');
const faker = require('faker/locale/nl');
const Firestore = require('@google-cloud/firestore');

const mobilesList = require('./mobiles-list');

function randomMobile () {
    const len = mobilesList.length;
    const index = Math.floor(Math.random() * len);
    return mobilesList[index];
}

function imeiGen () {
    return Math.floor(Math.random() * 900000000000000) + 100000000000000;
}

function newDevice () {
    const owner = faker.name.findName();
    const emailAddress = `${_.kebabCase(owner)}@${faker.internet.domainName()}`;
    const city = faker.address.city();
    const imei1 = imeiGen();
    const imei2 = Math.random() > 0.6 ? imeiGen() : '';
    const mobileNumber = faker.phone.phoneNumber();

    const { name: model, brand } = randomMobile();

    return {
        owner,
        emailAddress,
        mobileNumber,
        city,
        brand,
        model,
        imei1,
        imei2
    };
}


const firestore = new Firestore({
    timestampsInSnapshots: true
});

Promise.map(Array(200).fill(), () => {
    const dev = newDevice();

    return firestore.collection('devices')
        .doc(`${dev.imei1}`)
        .set(dev)
        .then(() => {
            console.log(`Doc ${dev.imei1} has been added!`);
        });

}, { concurrency: 8 }).then(() => {
    console.log('All documents have been inserted!');
});
