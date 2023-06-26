const Expenses=require('../models/expenses')
const Users=require('../models/users')
const sequelize=require('../util/database')

exports.addexpense=async(req,res,next)=>{
    const t=await sequelize.transaction()
    try{
        const amount = req.body.amount
        const description = req.body.description
        const category = req.body.category

        

        const data=await Expenses.create({
            amount:amount,
            description:description,
            category:category,
            userID:req.user.id
        },{transaction:t})
        const totalExpense=Number(req.user.totalExpense)+Number(amount)
        
        await Users.update({
            totalExpense:totalExpense
        },{where:{id:req.user.id},transaction:t})

        await t.commit()
        res.json({dataValues:data})
    }
    catch(err){
        await t.rollback()
        console.log(err)
    }
}

exports.getexpense=async(req,res,next)=>{
    try{
        const expenses=await Expenses.findAll({where:{userID:req.user.id}})
        res.json({allexpenses:expenses})
    }
    catch(err){
        console.log(err)
    }
}

exports.delexpense=async(req,res,next)=>{
    try{
        if(req.params.id=='undefined'){
            console.log("id is missing")
        }
        const id=req.params.id
        await Expenses.destroy({where:{id:id , userID:req.user.id}})
        res.sendStatus(200)
        
    }
    catch(err){
        console.log(err)
    }
}