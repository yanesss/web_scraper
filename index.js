const webscraping = require('./websites/funkoScraper');
const compareResults = require('./query/results');
const { URL } = require('./data');
const mongoose = require('mongoose');

webscraping(URL)
.then(productObj => {
    compareResults(productObj);
})
.catch(error => {
    console.error(error);
})