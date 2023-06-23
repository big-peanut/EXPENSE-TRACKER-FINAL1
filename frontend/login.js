const loginform = document.getElementById('loginform')

async function login(email, password) {
    try {
        const user = {
            email,
            password
        };

        const response = await axios.post("http://localhost:3000/login", user);

        if (response.data.message) {
            alert("User login successful");
        } else {
            alert("Login failed. Incorrect password or email not registered.");
        }
    } catch (err) {
        if (err.response && err.response.data) {
            alert(err.response.data.error);
        } else {
            alert("An error occurred during login:", err.message);
        }
    }
}

loginform.addEventListener('submit', (e) => {
    e.preventDefault()

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    login(email, password)

    email = ""
    password = ""
})