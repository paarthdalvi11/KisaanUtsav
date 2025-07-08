const mongoose = require('mongoose');

const SeedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    image : {
        type : String
    },
    price : {
        type : Number,
        required : true
    },
    season : {
        type : String,
        requied : true
    },
    distributer: {
        type: String,
        default: "Unknown"
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {
        collection : 'seeds'
});

const Seed = mongoose.model('Seed', SeedSchema);
module.exports = Seed;
