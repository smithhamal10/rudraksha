document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Password strength checker
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }

    // Form validation
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            handleSocialLogin(provider);
        });
    });
});

function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthBar || !strengthText) return;

    let strength = 0;
    let feedback = '';

    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;

    strengthBar.style.width = strength + '%';

    if (strength < 25) {
        feedback = 'Very weak';
        strengthBar.style.background = '#ff4444';
    } else if (strength < 50) {
        feedback = 'Weak';
        strengthBar.style.background = '#ffaa00';
    } else if (strength < 75) {
        feedback = 'Good';
        strengthBar.style.background = '#00aa00';
    } else {
        feedback = 'Strong';
        strengthBar.style.background = '#00aa00';
    }

    strengthText.textContent = feedback;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        const container = input.parentElement;
        const existingError = container.parentElement.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }

        container.classList.remove('error', 'success');

        if (!input.value.trim()) {
            showFieldError(container, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            showFieldError(container, 'Please enter a valid email address');
            isValid = false;
        } else if (input.name === 'confirmPassword') {
            const password = form.querySelector('#password').value;
            if (input.value !== password) {
                showFieldError(container, 'Passwords do not match');
                isValid = false;
            } else {
                container.classList.add('success');
            }
        } else {
            container.classList.add('success');
        }
    });

    return isValid;
}

function showFieldError(container, message) {
    container.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    container.parentElement.appendChild(errorDiv);
}

function handleLogin(e) {
    e.preventDefault();
    
    if (!validateForm(this)) {
        return;
    }

    const submitBtn = this.querySelector('.login-btn');
    const email = this.querySelector('#email').value;
    const password = this.querySelector('#password').value;
    const remember = this.querySelector('#remember').checked;

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Here you would typically make an API call to your backend
        console.log('Login attempt:', { email, password, remember });
        
        // For demo purposes, show success message
        alert('Login successful! (This is a demo)');
        
        // Redirect to home page
        // window.location.href = 'index.html';
    }, 2000);
}

function handleRegister(e) {
    e.preventDefault();
    
    if (!validateForm(this)) {
        return;
    }

    const termsCheckbox = this.querySelector('#terms');
    if (!termsCheckbox.checked) {
        alert('Please accept the Terms & Conditions to continue');
        return;
    }

    const submitBtn = this.querySelector('.login-btn');
    const formData = new FormData(this);

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Here you would typically make an API call to your backend
        console.log('Registration attempt:', Object.fromEntries(formData));
        
        // For demo purposes, show success message
        alert('Registration successful! Please check your email for verification. (This is a demo)');
        
        // Redirect to login page
        // window.location.href = 'login.html';
    }, 2000);
}

function handleSocialLogin(provider) {
    console.log(`${provider} login clicked`);
    
    // Here you would integrate with actual social login APIs
    // For demo purposes:
    alert(`${provider} login would be integrated here`);
}

// Add smooth animations
function addInputAnimations() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

// Initialize animations
addInputAnimations();