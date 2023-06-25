const expenseform = document.getElementById('expenseform');
const expenselist = document.getElementById('expenselist');

async function checkUserPremiumStatus(token) {
    try {
        const response = await axios.get("http://localhost:3000/user/getuser", { headers: { 'Authorization': token } });
        const isPremium = response.data.user.ispremium;
        return isPremium;
    } catch (err) {
        console.log(err);
        return false; // Default to non-premium if an error occurs
    }
}

document.getElementById('buypremium').onclick = async function (e) {
    const token = localStorage.getItem('token');
    const response = await axios.get("http://localhost:3000/purchase/premium", { headers: { 'Authorization': token } });

    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response) {
            await axios.post("http://localhost:3000/purchase/updatepremium", {
                orderid: options.order_id,
                payment_id: response.razorpay_payment_id
            },
                { headers: { 'Authorization': token } });

            alert("YOU ARE A PREMIUM USER");
            document.getElementById('buypremium').style.display = "none";
            window.location.reload()
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function (response) {
        console.log(response);
        alert('something went wrong');
    });
};

function displayexpense(expenses, isPremium) {
    expenselist.innerHTML = "";

    const premiumContainer = document.createElement('div');
    premiumContainer.style.position = 'absolute';
    premiumContainer.style.top = '10px';
    premiumContainer.style.right = '10px';

    for (let i = 0; i < expenses.allexpenses.length; i++) {
        const li = document.createElement('li');
        li.textContent = `AMOUNT : Rs.${expenses.allexpenses[i].amount} ==> DESCRIPTION : ${expenses.allexpenses[i].description} ==> CATEGORY : ${expenses.allexpenses[i].category}`;
        expenselist.appendChild(li);

        const delbtn = document.createElement('button');
        delbtn.textContent = "Remove";
        li.appendChild(delbtn);

        delbtn.addEventListener('click', () => {
            delexpense(expenses.allexpenses[i].id);
        });
    }
    if (isPremium) {
        const premiumMsg = document.createElement('p');
        premiumMsg.textContent = "YOU ARE A PREMIUM MEMBER";
        premiumContainer.appendChild(premiumMsg);
        document.getElementById('buypremium').style.display = "none";
    }
    document.body.appendChild(premiumContainer)
}

async function delexpense(id) {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/expense/delexpense/${id}`, { headers: { 'Authorization': token } });
        getExpense();
    } catch (err) {
        console.log(err);
    }
}

async function getExpense() {
    try {
        const token = localStorage.getItem('token');
        const isPremium = await checkUserPremiumStatus(token); // Wait for premium status
        const response = await axios.get("http://localhost:3000/expense/getexpense", { headers: { 'Authorization': token } });
        let expenses = response.data;
        displayexpense(expenses, isPremium); // Display expenses with premium status
    } catch (err) {
        console.log(err);
    }
}

async function addexpense(amount, description, category) {
    try {
        let expense = {
            amount,
            description,
            category
        };
        const token = localStorage.getItem('token');
        await axios.post("http://localhost:3000/expense/addexpense", expense, { headers: { 'Authorization': token } });
        getExpense(); // Retrieve and display updated expenses
    } catch (err) {
        console.log(err);
    }
}

expenseform.addEventListener('submit', (e) => {
    e.preventDefault();

    let amount = document.getElementById('amount').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;

    addexpense(amount, description, category);

    // Move the code to reset the form fields here
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token');
        const isPremium = await checkUserPremiumStatus(token); // Wait for premium status
        const expense = await axios.get("http://localhost:3000/expense/getexpense", { headers: { 'Authorization': token } });
        displayexpense(expense.data, isPremium); // Display expenses with premium status
    } catch (err) {
        console.log(err);
    }
});
