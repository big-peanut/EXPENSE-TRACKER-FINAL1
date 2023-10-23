// Get references to HTML elements
const expenseform = document.getElementById('expenseform'); // Reference to the expense form
const expenselist = document.getElementById('expenselist'); // Reference to the expense list container

// Function to delete an expense by its ID
async function delexpense(id) {
    try {
        await axios.delete(`http://localhost:3000/expense/delexpense/${id}`);
        getExpense(); // Refresh the expense list after deletion
    } catch (err) {
        console.log(err);
    }
}

// Function to retrieve and display the list of expenses
async function getExpense() {
    try {
        const response = await axios.get("http://localhost:3000/expense/getexpense");
        let expenses = response.data;

        // Clear the expense list container
        expenselist.innerHTML = "";

        // Loop through each expense and display it in the list
        for (let i = 0; i < expenses.allexpenses.length; i++) {
            const li = document.createElement('li');
            li.textContent = `AMOUNT: Rs.${expenses.allexpenses[i].amount} ==> DESCRIPTION: ${expenses.allexpenses[i].description} ==> CATEGORY: ${expenses.allexpenses[i].category}`;
            expenselist.appendChild(li);

            // Create a "Remove" button for each expense
            const delbtn = document.createElement('button');
            delbtn.textContent = "Remove";
            li.appendChild(delbtn);

            // Add a click event listener to the "Remove" button to delete the expense
            delbtn.addEventListener('click', () => {
                delexpense(expenses.allexpenses[i].id);
            });
        }
    } catch (err) {
        console.log(err);
    }
}

// Function to add a new expense
async function addexpense(amount, description, category) {
    try {
        let expense = {
            amount,
            description,
            category
        };
        await axios.post("http://localhost:3000/expense/addexpense", expense);
        getExpense(); // Refresh the expense list after adding
    } catch (err) {
        console.log(err);
    }
}

// Event listener for the form submission
expenseform.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the input values from the form
    let amount = document.getElementById('amount').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;

    // Call the addexpense function to add the new expense
    addexpense(amount, description, category);

    // Clear the input fields
    document.getElementById('amount').value = "";
    document.getElementById('description').value = "";
    document.getElementById('category').value = "";
});

// Event listener for when the DOM is fully loaded, call getExpense to retrieve and display expenses
document.addEventListener('DOMContentLoaded', getExpense);
