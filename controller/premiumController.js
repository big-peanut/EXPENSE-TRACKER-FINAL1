const Expenses=require('../models/expenses')
const Users=require('../models/users')
const sequelize=require('../util/database')


exports.getleaderboard=async(req,res,next)=>{
    try{
        const users=await Users.findAll()
        const expenses=await Expenses.findAll()

        const userandexpense={}
        expenses.forEach((expense)=>{
            if(userandexpense[expense.userID]){
                userandexpense[expense.userID]+=expense.amount
            }
            else{
                userandexpense[expense.userID]=expense.amount
            }
            
        })
        var userleaderboarddetails=[]
        users.forEach((user)=>{
            userleaderboarddetails.push({name:user.name,total_cost:userandexpense[user.id]||0})
        })
    
        userleaderboarddetails.sort((a,b)=>b.total_cost-a.total_cost)
        res.status(200).json(userleaderboarddetails)
    }
    catch(err){
        res.status(500).json(err)
    }
}