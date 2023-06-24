const express=require('express')
const userRoutes=require('./routes/userRoutes')
const sequelize=require('./util/database')
const bodyparser=require('body-parser')

const app=express()

app.use(bodyparser.json())

app.use(userRoutes)

sequelize.sync()
    .then((res) => {
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    })
