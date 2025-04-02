/* JavaScript for Login Page */

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    var payload = {
        email: email,
        password: password,
        action: 'login'  // Action type to distinguish login
    };

    handleAuthRequest(payload);
});

document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('signupName').value;  // New Name Field
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;

    var payload = {
        name: name,  // Including name
        email: email,
        password: password,
        action: 'signup'  // Action type to distinguish signup
    };

    handleAuthRequest(payload);
});

document.getElementById('showSignUp').addEventListener('click', function () {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('loginErrorMessage').textContent = '';  // Clear error message
});

document.getElementById('showLogin').addEventListener('click', function () {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signupErrorMessage').textContent = '';  // Clear error message
});

function handleAuthRequest(payload) {
    fetch('https://script.google.com/macros/s/AKfycbxRkFXTkp24L-I4CWg4-IgbgXmlAf4wq4SY4XaPYicxCgZJR3WltkgqAELH9o0acuaI/exec', { // Updated API URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(payload.name)}&email=${encodeURIComponent(payload.email)}&password=${encodeURIComponent(payload.password)}&action=${payload.action}`,
    })
    .then(response => response.json())
    .then(data => {
        console.log("Login Response Data:", data); // Debugging output
        if (data.status === "success" && payload.action === 'login') {
            // Store the logged-in user's name in localStorage
            localStorage.setItem("userName", data.name);  // Store the name
            window.location.href = "snake.html";  // Redirect on successful login
        } else if (data.status === "success" && payload.action === 'signup') {
            alert('Sign-up successful! You can now log in.');
            document.getElementById('signupName').value = '';  // Clear name field
            document.getElementById('signupEmail').value = '';
            document.getElementById('signupPassword').value = '';
            document.getElementById('signupErrorMessage').textContent = ''; 
        } else {
            if (payload.action === 'login') {
                document.getElementById('loginErrorMessage').textContent = data.message || "Invalid email or password.";
            } else if (payload.action === 'signup') {
                document.getElementById('signupErrorMessage').textContent = data.message || "Email is already registered.";
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        if (payload.action === 'login') {
            document.getElementById('loginErrorMessage').textContent = "An error occurred. Please try again.";
        } else if (payload.action === 'signup') {
            document.getElementById('signupErrorMessage').textContent = "An error occurred. Please try again.";
        }
    });
}
