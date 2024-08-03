const dotenv = require('dotenv');
dotenv.config();


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const searchForm = document.getElementById('search-form');

    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (signupForm) signupForm.addEventListener('submit', handleSignup);
    if (searchForm) searchForm.addEventListener('submit', handleSearch);

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login successful');
            // Store the token
            localStorage.setItem('authToken', data.token);
            // Redirect to user dashboard
            window.location.href = '/dashboard.html';
        } else {
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Signup successful');
            // Store the token
            localStorage.setItem('authToken', data.token);
            // Redirect to user dashboard
            window.location.href = '/dashboard.html';
        } else {
            alert(`Signup failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during signup');
    }
}

async function handleSearch(e) {
    e.preventDefault();
    const from = document.getElementById('departure').value;
    const to = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const type = document.getElementById('type').value;
  
    
    try {
        const response = await fetch(`/api/tickets/search?from=${from}&to=${to}&date=${date}&type=${type}`);
        const flights = await response.json();
        displayFlights(flights);
    } catch (error) {
        console.error('Error searching flights:', error);
        alert('An error occurred while searching for flights');
    }
}

function displayFlights(flights) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (flights.length === 0) {
        resultsContainer.innerHTML = '<p>No flights found matching your criteria.</p>';
        return;
    }

    flights.forEach(flight => {
        const flightElement = document.createElement('div');
        flightElement.className = 'flight-card';
        flightElement.innerHTML = `
            <h3>${flight.name}</h3>
            <p>From: ${flight.from}</p>
            <p>To: ${flight.to}</p>
            <p>Departure: ${new Date(flight.departureTime).toLocaleString()}</p>
            <p>Arrival: ${new Date(flight.arrivalTime).toLocaleString()}</p>
            <p>Price: $${flight.price}</p>
            <p>Available Seats: ${flight.availableSeats}</p>
            <button onclick="bookFlight('${flight._id}')">Book Now</button>
        `;
        resultsContainer.appendChild(flightElement);
    });
}

async function bookFlight(flightId) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in to book a flight');
        return;
    }

    try {
        const response = await fetch('/api/tickets/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({ flightId })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Ticket booked successfully!');
            // Optionally, update the UI or redirect to a booking confirmation page
        } else {
            alert(`Booking failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error booking flight:', error);
        alert('An error occurred while booking the flight');
    }
}
