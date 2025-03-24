function validateForm(event) {
    event.preventDefault(); // Prevent form submission

    let name = document.getElementById("name");
    let state = document.getElementById("state");
    let district = document.getElementById("district");
    let village = document.getElementById("village");
    let age = document.getElementById("age");
    let experience = document.getElementById("experience");
    let crops = document.getElementById("crops");
    let gender = document.querySelector('input[name="gender"]:checked');

    let valid = true;
    document.querySelectorAll(".error").forEach(el => el.remove());

    if (name.value.trim() === "") {
        showError(name, "Name is required!");
        valid = false;
    }
    if (state.value === "") {
        showError(state, "Please select a state!");
        valid = false;
    }
    if (district.value === "") {
        showError(district, "Please select a district!");
        valid = false;
    }
    if (village.value === "") {
        showError(village, "Please select a village!");
        valid = false;
    }
    if (age.value.trim() === "" || age.value < 18) {
        showError(age, "Enter a valid age (18+)");
        valid = false;
    }
    if (!gender) {
        showError(document.querySelector(".gender-options"), "Select a gender!");
        valid = false;
    }
    if (experience.value.trim() === "" || experience.value < 0) {
        showError(experience, "Enter valid farming experience!");
        valid = false;
    }
    if (crops.value.trim() === "") {
        showError(crops, "Enter favorite crops!");
        valid = false;
    }

    if (valid) {
        alert("Registration Successful!");
    }

    return valid;
}

function showError(inputField, message) {
    let error = document.createElement("small");
    error.className = "error";
    error.style.color = "red";
    error.innerText = message;
    inputField.parentNode.insertBefore(error, inputField.nextSibling);
}