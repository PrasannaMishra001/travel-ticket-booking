const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');

const passport = require('passport');
const session = require('express-session');

dotenv.config();

const app = express();

// Connect to MongoDB
(async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
})();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);


// Serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public', 'about.html')));
app.get('/offers', (req, res) => res.sendFile(path.join(__dirname, 'public', 'offers.html')));
app.get('/seats', (req, res) => res.sendFile(path.join(__dirname, 'public', 'seats.html')));
app.get('/destinations', (req, res) => res.sendFile(path.join(__dirname, 'public', 'destinations.html')));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));