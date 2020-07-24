require('dotenv').config();

const URL = 'https://www.funko.com/shop?filter:feature=new%20releases&page:on=1';
const mongoURI = process.env.MONGOURI;
const webhook = process.env.WEBHOOK;

module.exports = {
    URL,
    mongoURI,
    webhook
}