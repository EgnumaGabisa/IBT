
const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const error = document.getElementById("error");
const count = document.getElementById("count");

// Ethiopian phone number regex
const phoneRegex = /^(?:\+251|0)?9\d{8}$/;

// Display signup count
function showCount() {
    const users = JSON.parse(localStorage.getItem("signups")) || [];
    count.textContent = `Total Signups: ${users.length}`;
}

showCount();

form.addEventListener("submit", function (e) {

    e.preventDefault();

    error.textContent = "";

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    // Validate name
    if (name.length < 2) {
        error.textContent = "Name must be at least 2 characters.";
        return;
    }

    // Validate phone
    if (!phoneRegex.test(phone)) {
        error.textContent =
            "Enter a valid Ethiopian phone number.";
        return;
    }

    // Read existing data
    let users = JSON.parse(localStorage.getItem("signups")) || [];

    // Add new user
    users.push({
        name: name,
        phone: phone
    });

    // Save as JSON
    localStorage.setItem("signups", JSON.stringify(users));

    alert("Signup Successful!");

    form.reset();

    showCount();
});