const dotenv = require('dotenv');
dotenv.config();


document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLogin);

    // Initialize Google Sign-In
    google.accounts.id.initialize({
        client_id: '911225846681-qr2sj8rbj5aj5i9jj5eplq1g2vkd4oek.apps.googleusercontent.com', // Replace with your Google Client ID
        callback: handleGoogleSignIn
    });

    google.accounts.id.renderButton(
        document.getElementById("google-signin-btn"),
        { theme: "outline", size: "large", type: "standard" }
    );
});

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful login (e.g., store token, redirect)
            alert('Login successful');
            localStorage.setItem('authToken', data.token);
            window.location.href = '/dashboard.html';
        } else {
            // Handle login error
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
}

function handleGoogleSignIn(response) {
    const id_token = response.credential;
    
    fetch('/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: id_token }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle successful Google sign-in (e.g., store token, redirect)
        alert('Google sign-in successful');
        localStorage.setItem('authToken', data.token);
        window.location.href = '/dashboard.html';
    })
    .catch(error => {
        console.error('Google sign-in error:', error);
        alert('An error occurred during Google sign-in');
    });
}
