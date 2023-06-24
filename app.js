const express=require('express')
const userRoutes=require('./routes/userRoutes')
const expenseRoutes=require('./routes/expenseRoutes')
const sequelize=require('./util/database')
const bodyparser=require('body-parser')
const cors=require('cors')

const app=express()

app.use(bodyparser.json())

app.use(cors())

app.use(userRoutes)

app.use(expenseRoutes)

sequelize.sync()
    .then((res) => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })
