const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// Initialize Twilio client
let twilioClient;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    console.log('Twilio client configured successfully.');
} else {
    console.warn('Twilio credentials not found. SMS notifications will not be sent.');
}

/**
 * Sends an email using nodemailer
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email body
 */
exports.sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

/**
 * Sends an SMS using Twilio
 * @param {string} to - Recipient phone number
 * @param {string} body - SMS body
 */
exports.sendSMS = async (to, body) => {
    if (!twilioClient) {
        console.error('Twilio client not configured. Cannot send SMS.');
        return;
    }
    try {
        await twilioClient.messages.create({
            body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to
        });
        console.log(`SMS sent successfully to ${to}`);
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
};
