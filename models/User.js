const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Ensure email is stored in lowercase
        trim: true // Remove extra spaces
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
        default: null // Default to null if not provided
    },
    phone: {
        type: String,
        default: null, // Default to null if not provided
        validate: {
            validator: function(v) {
                // Simple phone number validation (adjust regex as needed)
                return /^[\d\s\+\-()]{7,15}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
