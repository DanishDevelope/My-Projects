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

    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;

    var payload = {
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
    fetch('https://script.google.com/macros/s/AKfycbxFTVbYYuTu7l4JXyNCYQ5RR9gZp-OPYHvotfUtZDrYwpthx3XnWiGJdvc2EFcX09u_tw/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${payload.email}&password=${payload.password}&action=${payload.action}`,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success" && payload.action === 'login') {
            window.location.href="snake.html";  // Redirect on successful login
        } else if (data.status === "success" && payload.action === 'signup') {
            alert('Sign-up successful! You can now log in.');
            document.getElementById('signupEmail').value = '';
            document.getElementById('signupPassword').value = '';
            document.getElementById('signupErrorMessage').textContent = ''; 
        } else {
            if (payload.action === 'login') {
                document.getElementById('loginErrorMessage').textContent = "Invalid email or password.";
            } else if (payload.action === 'signup') {
                document.getElementById('signupErrorMessage').textContent = "Email is already registered.";
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
