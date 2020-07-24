const { mongoURI } = require('../data');
const mongoose = require('mongoose');
const notifyDiscord = require('../webhooks/discordHook');

// set up connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB connected\n"))
.catch(err => console.error(err));

const compareResults = dataObj => {
    try {
        const FunkoProduct = require('../models/FunkoPop');
        // finds all data in DB
        FunkoProduct.find({}, (err, funkoList) => {
            return funkoList;
        })
        .then(funkoList => {
            // if there is no list of funko products
            if (funkoList == "") {
                const { funkoDetails } = dataObj;
                for (let item of funkoDetails) {
                    const [name, price, link] = item;
                    const funko = {
                        name: name,
                        price: price,
                        link: link
                    }

                   const newProducts = new FunkoProduct(funko);
                   newProducts.save().catch(err => console.error(err));
                }
            }
            
            (async () => { 
                const { funkoDetails } = dataObj;
                for (const product of funkoDetails) {
                    const [ name, price, link ] = product;
    
                    // check if any of these items do not exist in the db
                    const checkIfExists = await FunkoProduct.exists({ name: name, price: price , link: link });
                    console.log(checkIfExists, name);

                    if (!checkIfExists) {
                        const funko = {
                            name: name,
                            price: price,
                            link: link
                        }
                        // notify discord right here as well
                        notifyDiscord(name, price, link);
                        const newProducts = new FunkoProduct(funko);
                        newProducts.save().catch(err => console.error(err));
                    }
                }
            })();
        })
        .catch(err => {
            console.error(err);
        });
 
    } catch (err) {
        console.error(err);
    }
} 


module.exports = compareResults;