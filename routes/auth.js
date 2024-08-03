const express = require('express');
const router = express.Router();

const passport = require('passport');
const { signup, login, googleAuth } = require('../controllers/authController');


// Route for user signup
router.post('/signup', async (req, res) => {
    try {
        await signup(req, res); // Call signup function from authController
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    try {
        await login(req, res); // Call login function from authController
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Google authentication route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleAuth);
// Google authentication callback route
router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/' }, (err, user, info) => {
        if (err) {
            console.error('Google authentication error:', err);
            return res.status(500).json({ message: 'Authentication failed' });
        }
        if (!user) {
            return res.redirect('/');
        }
        // If authentication is successful, call the googleAuth controller function
        req.user = user;
        return googleAuth(req, res);
    })(req, res, next);
});


module.exports = router;