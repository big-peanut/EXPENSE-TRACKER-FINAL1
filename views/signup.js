// Get a reference to the signup form element in the HTML
const signupform = document.getElementById('signupform');

// Function for user signup
async function signup(name, email, password) {
    try {
        let user = {
            name,
            email,
            password
        };

        // Send a POST request to the server for user signup
        await axios.post("http://localhost:3000/signup", user);
    } catch (err) {
        // Handle errors related to signup, e.g., email already registered
        const p = document.createElement('p');
        p.textContent = "Email already registered, Please Login";
        signupform.appendChild(p);
    }
}

// Event listener for form submission
signupform.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the user input values from the form
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Call the 'signup' function with the provided name, email, and password
    signup(name, email, password);

    // Clear the input fields
    name = "";
    email = "";
    password = "";
});
