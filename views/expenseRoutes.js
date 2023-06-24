const express=require('express')
const controller=require('../controller/expenseController')

const router=express.Router()

router.post('/expense/addexpense',controller.addexpense)
router.get('/expense/getexpense',controller.getexpense)
router.delete('/expense/delexpense/:id',controller.delexpense)

module.exports=router