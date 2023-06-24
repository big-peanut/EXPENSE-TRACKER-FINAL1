const loginform = document.getElementById('loginform')

async function login(email, password) {
    try {
        const user = {
            email,
            password
        };

        const response = await axios.post("http://localhost:3000/user/login", user);

        if (response.data.message) {
            alert("User login successful");
            window.location.href="expense.html"
        } else {
            const p=document.createElement('p')
            p.textContent="Login failed. Incorrect password or email not registered."
            loginform.appendChild(p)
        }
    } catch (err) {
        if (err.response && err.response.data) {
            const p=document.createElement('p')
            p.textContent=err.response.data.error
            loginform.appendChild(p)
        } else {
            const p=document.createElement('p')
            p.textContent=err.message
            loginform.appendChild(p)
            //alert("An error occurred during login:", err.message);
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
