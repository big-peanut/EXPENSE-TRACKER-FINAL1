const Users = require('../models/users')

exports.signup = async (req, res, next) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        const existingUser = await Users.findOne({ where: { email: email } })

        if (existingUser) {
            res.status(400).json({ error: "Email already registered. Please login" })
        }
        else {
            const data = await Users.create({
                name: name,
                email: email,
                password: password
            })
            res.json({ dataValues: data })
        }
    }
    catch (err) {
        res.json({ err: "Email already registered. Please login" })
    }
}

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const existingUser = await Users.findOne({ where: { email: email } })

        if (!existingUser) {
            res.status(404).json({ error: "Email not registered, Signup please" })
        }
        else {
            if (password === existingUser.password) {
                res.json({ message: "User login successful" })
            } else {
                res.status(401).json({ error: "Incorrect password" })
            }
        }
    }
    catch {

    }

}