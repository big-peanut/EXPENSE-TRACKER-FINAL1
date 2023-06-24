const Expenses=require('../models/expenses')

exports.addexpense=async(req,res,next)=>{
    try{
        const amount = req.body.amount
        const description = req.body.description
        const category = req.body.category

        const data=await Expenses.create({
            amount:amount,
            description:description,
            category:category
        })
        res.json({dataValues:data})
    }
    catch(err){
        console.log(err)
    }
}

exports.getexpense=async(req,res,next)=>{
    try{
        const expenses=await Expenses.findAll()
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
        await Expenses.destroy({where:{id:id}})
        res.sendStatus(200)
        
    }
    catch(err){
        console.log(err)
    }
}