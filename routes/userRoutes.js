const express=require('express')
const controller=require('../controller/userController')
const middleware=require('../middleware/auth')

const router=express.Router()

router.post('/user/signup',controller.signup)

router.post('/user/login',controller.login)

router.get('/user/getuser',middleware.authenticate,controller.getuser)

module.exports=router
