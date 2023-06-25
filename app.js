const express=require('express')
const userRoutes=require('./routes/userRoutes')
const expenseRoutes=require('./routes/expenseRoutes')
const purchaseRoutes=require('./routes/purschaseRoutes')
const sequelize=require('./util/database')
const bodyparser=require('body-parser')
const cors=require('cors')
const Users = require('./models/users')
const Expenses = require('./models/expenses')
const Order = require('./models/orders')

const app=express()

app.use(bodyparser.json())

app.use(cors())

app.use(userRoutes)

app.use(expenseRoutes)

app.use(purchaseRoutes)

Users.hasMany(Expenses)
Expenses.belongsTo(Users)

Users.hasMany(Order)
Order.belongsTo(Users)

sequelize.sync()
    .then((res) => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })
