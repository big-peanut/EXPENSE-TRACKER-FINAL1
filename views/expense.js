const expenseform = document.getElementById('expenseform');
const expenselist = document.getElementById('expenselist');

async function showleaderboard() {
    const token = localStorage.getItem('token');
    const isPremium = await checkUserPremiumStatus(token);

    const leaderboardList = document.querySelector('.leaderboard-list');

    if (isPremium && !leaderboardList) {
        const leaderboard = await axios.get("http://localhost:3000/premium/leaderboard", { headers: { 'Authorization': token } });
        const leaderboardData = leaderboard.data;

        const leaderboardList = document.createElement('ul');
        leaderboardList.classList.add('leaderboard-list');

        leaderboardData.forEach((entry) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Name: ${entry.name} | Total Cost: ${entry.total_cost}`;
            leaderboardList.appendChild(listItem);
        });

        // Append the new leaderboard list to the DOM
        document.body.appendChild(leaderboardList);
    } else if (!isPremium && leaderboardList) {
        // Remove the leaderboard list from the DOM
        leaderboardList.remove();
    }
}

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
            window.location.reload();
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function (response) {
        console.log(response);
        alert('Something went wrong');
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

    const leaderboardBtn = document.createElement('button');
    leaderboardBtn.textContent = 'Leaderboard';

    if (isPremium) {
        const premiumMsg = document.createElement('p');
        premiumMsg.textContent = "YOU ARE A PREMIUM MEMBER";
        premiumContainer.appendChild(premiumMsg);
        document.getElementById('buypremium').style.display = "none";
        premiumContainer.appendChild(leaderboardBtn);
        leaderboardBtn.addEventListener('click', async() => {
            await showleaderboard();
        });
    }

    document.body.appendChild(premiumContainer);
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

    // Reset the form fields
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
