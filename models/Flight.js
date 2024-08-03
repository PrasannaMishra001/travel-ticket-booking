const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['flight', 'train', 'package'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Flight', FlightSchema);