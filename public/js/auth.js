// Modal functionality
const signinModal = document.getElementById('signin-modal');
const signupModal = document.getElementById('signup-modal');
const signinBtn = document.querySelector('a[href="#signin"]');
const signupBtn = document.querySelector('a[href="#signup"]');
const closeBtns = document.getElementsByClassName('close');
const showSignupLink = document.getElementById('show-signup');
const showSigninLink = document.getElementById('show-signin');

signinBtn.onclick = () => signinModal.style.display = 'block';
signupBtn.onclick = () => signupModal.style.display = 'block';

Array.from(closeBtns).forEach(btn => {
  btn.onclick = function() {
    signinModal.style.display = 'none';
    signupModal.style.display = 'none';
  }
});

window.onclick = function(event) {
  if (event.target == signinModal || event.target == signupModal) {
    signinModal.style.display = 'none';
    signupModal.style.display = 'none';
  }
}

showSignupLink.onclick = function() {
  signinModal.style.display = 'none';
  signupModal.style.display = 'block';
}

showSigninLink.onclick = function() {
  signupModal.style.display = 'none';
  signinModal.style.display = 'block';
}

// Form submission
document.getElementById('signin-form').onsubmit = function(e) {
  e.preventDefault();
  // Add your sign-in logic here
  console.log('Sign in submitted');
}

document.getElementById('signup-form').onsubmit = function(e) {
  e.preventDefault();
  // Add your sign-up logic here
  console.log('Sign up submitted');
}

// Google Sign-In
function handleCredentialResponse(response) {
  // Send the token to your server to validate and create a session
  console.log('Google Sign-In token:', response.credential);
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id: '911225846681-qr2sj8rbj5aj5i9jj5eplq1g2vkd4oek.apps.googleusercontent.com', // Replace with your Google Client ID
    callback: handleCredentialResponse
  });
  
  google.accounts.id.renderButton(
    document.getElementById("google-signin-btn"),
    { theme: "outline", size: "large" }
  );
  
  google.accounts.id.renderButton(
    document.getElementById("google-signup-btn"),
    { theme: "outline", size: "large" }
  );
}