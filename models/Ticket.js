const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['booked', 'cancelled'],
        default: 'booked'
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);