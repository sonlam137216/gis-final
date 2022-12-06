const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NodeSchema = new Schema({
    IDN: {
        type: Number,
        // required: true
    },
    x: {
        type: Number,
        // required: true
    },
    y: {
        type: Number,
        // required: true
    }
})

const BodySchema = new Schema({
    IDB: {
        type: Number,
        // required: true
    },
    NumOfFloors: {
        type: Number,
        // required: true
    },
    Height: {
        type: Number,
        // required: true
    },
    Face: [{}]
})

const ArcGisSchema = new Schema({

    IDBD: {
        type: Number,
        required: true
    },

    Name: {
        type: String,
        required: true
    }, 

    Color: {
        type: String,
        required: true
    },

    Body: [{}]

}, {
    timestamps: true
})

module.exports = mongoose.model('arcgis', ArcGisSchema)