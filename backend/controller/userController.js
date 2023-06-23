const Users = require('../models/users')
const bcrypt = require('bcrypt')

exports.signup = async (req, res, next) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        const saltrounds = 10
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            const existingUser = await Users.findOne({ where: { email: email } })

            if (existingUser) {
                res.status(400).json({ error: "Email already registered. Please login" })
            }
            else {
                const data = await Users.create({
                    name: name,
                    email: email,
                    password: hash
                })
                res.json({ dataValues: data })
            }
        })
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
            bcrypt.compare(password,existingUser.password,(err,result)=>{
                if(err){
                    throw new Error('something went wrong')
                }
                if(result===true){
                    res.status(200).json({message: "USER LOGIN SUCCESSFULL"})
                }
                else{
                    res.status(400).json({error: "Incorect password"})
                }
            })
        }
    }
    catch(err) {
        res.status(500).json({message: err})
    }

}
