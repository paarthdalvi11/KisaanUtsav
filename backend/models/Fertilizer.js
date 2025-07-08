const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    weight: {type : Number, default : 1},
    disc: { type: String, required: true },
    image: { type: String }
});

const Fertilizer = mongoose.model('Fertilizer', fertilizerSchema);

module.exports = Fertilizer;
