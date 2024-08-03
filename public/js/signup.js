const dotenv = require('dotenv');
dotenv.config();


document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', handleSignup);

    // Initialize Google Sign-In
    google.accounts.id.initialize({
        client_id: '911225846681-qr2sj8rbj5aj5i9jj5eplq1g2vkd4oek.apps.googleusercontent.com', // Replace with your Google Client ID
        callback: handleGoogleSignUp
    });

    google.accounts.id.renderButton(
        document.getElementById("google-signup-btn"),
        { theme: "outline", size: "large", type: "standard" }
    );
});

async function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful signup (e.g., store token, redirect)
            alert('Signup successful');
            localStorage.setItem('authToken', data.token);
            window.location.href = '/dashboard.html';
        } else {
            // Handle signup error
            alert(`Signup failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred during signup');
    }
}

function handleGoogleSignUp(response) {
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
        // Handle successful Google sign-up (e.g., store token, redirect)
        alert('Google sign-up successful');
        localStorage.setItem('authToken', data.token);
        window.location.href = '/dashboard.html';
    })
    .catch(error => {
        console.error('Google sign-up error:', error);
        alert('An error occurred during Google sign-up');
    });
}
