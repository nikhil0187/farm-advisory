let generatedOTP = "";

// Function to validate form
function validateForm(event) {
    event.preventDefault(); // Prevent form submission

    let username = document.getElementById("username");
    let phone = document.getElementById("phone");
    let otp = document.getElementById("otp");
    let password = document.getElementById("password");

    let usernameValue = username.value.trim();
    let phoneValue = phone.value.trim();
    let otpValue = otp ? otp.value.trim() : "";
    let passwordValue = password.value.trim();

    let valid = true;

    // Reset previous errors
    document.querySelectorAll(".error").forEach(el => el.remove());

    // Username validation
    if (usernameValue === "") {
        showError(username, "Username is required!");
        valid = false;
    }

    // Phone number validation (10 digits)
    if (!/^\d{10}$/.test(phoneValue)) {
        showError(phone, "Enter a valid 10-digit phone number!");
        valid = false;
    }

    // OTP validation
    if (generatedOTP && otpValue !== generatedOTP) {
        showError(otp, "Incorrect OTP!");
        valid = false;
    }

    // Password validation
    if (passwordValue.length < 6 || !/[A-Za-z]/.test(passwordValue) || !/\d/.test(passwordValue)) {
        showError(password, "Password must be at least 6 characters and include letters & numbers!");
        valid = false;
    }

    if (valid) {
        alert("Login successful!");
    }

    return valid;
}

// Function to send OTP (Simulated)
function sendOTP() {
    let phone = document.getElementById("phone");
    let phoneValue = phone.value.trim();

    // Validate phone number before sending OTP
    if (!/^\d{10}$/.test(phoneValue)) {
        showError(phone, "Enter a valid 10-digit phone number before requesting OTP!");
        return;
    }

    generatedOTP = Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4-digit OTP
    alert("Your OTP is: " + generatedOTP); // Simulating SMS OTP (Replace with actual SMS API)
    
    document.getElementById("otpSection").style.display = "block"; // Show OTP input field
}

// Function to display inline error messages
function showError(inputField, message) {
    let error = document.createElement("small");
    error.className = "error";
    error.innerText = message;
    inputField.parentNode.insertBefore(error, inputField.nextSibling);
}