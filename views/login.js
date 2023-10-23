// Get a reference to the login form element in the HTML
const loginform = document.getElementById('loginform');

// Function for user login
async function login(email, password) {
    try {
        const user = {
            email,
            password
        };

        // Send a POST request to the server for user login
        const response = await axios.post("http://localhost:3000/login", user);

        // Check the response from the server
        if (response.data.message) {
            // If the response contains a 'message', show a success alert
            alert("User login successful");
        } else {
            // If the response does not contain a 'message', show an alert for login failure
            alert("Login failed. Incorrect password or email not registered.");
        }
    } catch (err) {
        if (err.response && err.response.data) {
            // If there is a response from the server with an error message, show that error
            alert(err.response.data.error);
        } else {
            // If there is a general error without a specific response, show a generic error message
            alert("An error occurred during login: " + err.message);
        }
    }
}

// Event listener for form submission
loginform.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the user input values from the form
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Call the 'login' function with the provided email and password
    login(email, password);

    // Clear the input fields
    email = "";
    password = "";
});
