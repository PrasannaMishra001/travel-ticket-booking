const Flight = require('../models/Flight');
const Ticket = require('../models/Ticket');
const { sendEmail, sendSMS } = require('../utils/notifications');

exports.searchFlights = async (req, res) => {
    try {
        const { from, to, date, type } = req.query;
        
        const query = {
            from,
            to,
            departureTime: { $gte: new Date(date) },
            type
        };

        const flights = await Flight.find(query);
        res.json(flights);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.bookTicket = async (req, res) => {
    try {
        const { flightId } = req.body;
        const userId = req.user.id;

        const flight = await Flight.findById(flightId);

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        if (flight.availableSeats <= 0) {
            return res.status(400).json({ message: 'No available seats' });
        }

        flight.availableSeats -= 1;
        await flight.save();

        const ticket = new Ticket({
            flight: flightId,
            user: userId
        });

        await ticket.save();

        await sendEmail(
            req.user.email,
            'Ticket Booking Confirmation',
            `Your ticket for ${flight.type} from ${flight.from} to ${flight.to} has been booked successfully.`
        );

        if (req.user.phone) {
            await sendSMS(
                req.user.phone,
                `Your ticket for ${flight.type} from ${flight.from} to ${flight.to} has been booked successfully.`
            );
        }

        res.json({ message: 'Ticket booked successfully', ticket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};