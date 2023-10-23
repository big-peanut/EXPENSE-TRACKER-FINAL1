// Import the 'Expenses' model
const Expenses = require('../models/expenses');

// Controller function for adding an expense
exports.addexpense = async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        // Create a new expense record in the database
        const data = await Expenses.create({
            amount: amount,
            description: description,
            category: category
        });
        res.json({ dataValues: data });
    }
    catch (err) {
        console.log(err);
    }
}

// Controller function for retrieving all expenses
exports.getexpense = async (req, res, next) => {
    try {
        // Retrieve all expenses from the database
        const expenses = await Expenses.findAll();
        res.json({ allexpenses: expenses });
    }
    catch (err) {
        console.log(err);
    }
}

// Controller function for deleting an expense by ID
exports.delexpense = async (req, res, next) => {
    try {
        // Check if the ID parameter is missing
        if (req.params.id == 'undefined') {
            console.log("ID is missing");
        }
        
        const id = req.params.id;

        // Delete the expense with the provided ID from the database
        await Expenses.destroy({ where: { id: id } });
        
        // Send a 200 OK response to indicate successful deletion
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
    }
}
