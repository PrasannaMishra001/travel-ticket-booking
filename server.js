const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));