// African countries
const africanCountries = [
    "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cameroon", "Central African Republic", "Chad",
    "Comoros", "Congo", "Côte d'Ivoire", "Djibouti", "Democratic Republic of the Congo",
    "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia",
    "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau",
    "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar",
    "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco",
    "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda",
    "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia",
    "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo",
    "Tunisia", "Uganda", "Zambia", "Zimbabwe"
];

document.addEventListener('DOMContentLoaded', function() {
    // Populate nationality dropdown
    const nationalitySelect = document.getElementById('nationality');
    africanCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        nationalitySelect.appendChild(option);
    });

    // Login form submission (let Django handle it)
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        // Optional: Add client-side validation if needed
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        if (!email || !password) {
            e.preventDefault();
            alert('Please enter both email and password.');
            return;
        }
        // Let the form submit to Django
    });

    // Signup form submission
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        // Check password strength
        const strength = document.getElementById('password-strength').textContent;
        if (strength === "Weak") {
            e.preventDefault();
            alert("Please choose a stronger password (at least 8 characters).");
            document.getElementById('signupPassword').focus();
            return;
        }

        // Validate passwords match
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            e.preventDefault();
            alert('Passwords do not match!');
            return;
        }

        // Let Django handle the rest (remove e.preventDefault)
    });
});

function showSignup() {
    document.querySelector('.login-form').classList.add('hidden');
    document.querySelector('.signup-form').classList.remove('hidden');
}

function showLogin() {
    document.querySelector('.signup-form').classList.add('hidden');
    document.querySelector('.login-form').classList.remove('hidden');
}

function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function showVerificationModal() {
    document.querySelector('.verification-modal').classList.add('active');
}

function closeModal() {
    document.querySelector('.verification-modal').classList.remove('active');
    showLogin(); // Switch to login after signup
}

// Social login placeholders
function loginWithGoogle() {
    alert('Sorry! Login using Google account will be implemented soon. Please sign up/log in with email and password.');
}

function loginWithGithub() {
    alert('Sorry! Login using GitHub account will be implemented soon. Please sign up/log in with email and password.');
}

function loginWithFacebook() {
    alert('Sorry! Login using Facebook account will be implemented soon. Please sign up/log in with email and password.');
}

// Password strength checker
function checkPasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strength = document.getElementById('password-strength');
    if (password.length < 6) {
        strength.textContent = 'Weak';
        strength.style.color = 'red';
        return 'Weak';
    } else if (password.length < 10) {
        strength.textContent = 'Medium';
        strength.style.color = 'orange';
        return 'Medium';
    } else {
        strength.textContent = 'Strong';
        strength.style.color = 'green';
        return 'Strong';
    }
}

// Forgot password placeholder
function forgotPassword() {
    alert("Password reset instructions will be sent to your email (feature coming soon).");
}