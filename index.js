const webscraping = require('./websites/funkoScraper');
const compareResults = require('./results');
const { URL } = require('./data');
//const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');

webscraping(URL)
.then(productObj => {
    compareResults(productObj);
})
.catch(error => {
    console.error(error);
})