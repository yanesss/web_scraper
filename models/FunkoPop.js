const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FunkoSchema = new Schema({
    name: String,
    price: String,
    link: String,
    image: String
});


module.exports = mongoose.model("FunkoPops", FunkoSchema);