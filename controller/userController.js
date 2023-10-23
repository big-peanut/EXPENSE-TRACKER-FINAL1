// Import required modules and packages
const Users = require('../models/users'); // Import the 'Users' model
const bcrypt = require('bcrypt'); // Import the bcrypt library for password hashing

// Controller function for user registration (signup)
exports.signup = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const saltrounds = 10;
        
        // Hash the password asynchronously with bcrypt
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            // Check if a user with the same email already exists
            const existingUser = await Users.findOne({ where: { email: email } });

            if (existingUser) {
                res.status(400).json({ error: "Email already registered. Please login" });
            }
            else {
                // Create a new user with the provided information
                const data = await Users.create({
                    name: name,
                    email: email,
                    password: hash
                });
                res.json({ dataValues: data });
            }
        });
    }
    catch (err) {
        res.json({ err: "Email already registered. Please login" });
    }
}

// Controller function for user login
exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Find the user with the provided email
        const existingUser = await Users.findOne({ where: { email: email } });

        if (!existingUser) {
            res.status(404).json({ error: "Email not registered, Signup please" });
        }
        else {
            // Compare the provided password with the stored hashed password
            bcrypt.compare(password, existingUser.password, (err, result) => {
                if (err) {
                    throw new Error('Something went wrong');
                }
                if (result === true) {
                    res.status(200).json({ message: "USER LOGIN SUCCESSFUL" });
                }
                else {
                    res.status(400).json({ error: "Incorrect password" });
                }
            });
        }
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}
