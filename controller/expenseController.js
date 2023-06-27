const Expenses = require('../models/expenses');
const Users = require('../models/users');
const sequelize = require('../util/database');
const AWS = require('aws-sdk')
const dotenv = require('dotenv')

dotenv.config()

exports.addexpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        const data = await Expenses.create(
            {
                amount: amount,
                description: description,
                category: category,
                userID: req.user.id
            },
            { transaction: t }
        );

        const totalExpense = Number(req.user.totalExpense) + Number(amount);

        await Users.update(
            {
                totalExpense: totalExpense
            },
            { where: { id: req.user.id }, transaction: t }
        );

        await t.commit();
        res.json({ dataValues: data });
    } catch (err) {
        await t.rollback();
        console.log(err);
    }
};

exports.getexpense = async (req, res, next) => {
    try {
        const expenses = await Expenses.findAll({ where: { userID: req.user.id } });
        res.json({ allexpenses: expenses });
    } catch (err) {
        console.log(err);
    }
};

exports.delexpense = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        if (req.params.id == 'undefined') {
            console.log('id is missing');
        }
        const id = req.params.id;
        const deletedExpense = await Expenses.findOne({ where: { id: id, userID: req.user.id } });

        if (!deletedExpense) {
            throw new Error('Expense not found');
        }

        const totalExpense = Number(req.user.totalExpense) - Number(deletedExpense.amount);

        await Expenses.destroy({ where: { id: id, userID: req.user.id }, transaction: t });

        await Users.update(
            {
                totalExpense: totalExpense
            },
            { where: { id: req.user.id }, transaction: t }
        );

        await t.commit();
        res.sendStatus(200);
    } catch (err) {
        await t.rollback();
        console.log(err);
    }
};

function uploadToS3(data, filename) {
    const BUCKET_NAME = process.env.BUCKET_NAME
    const IAM_USER_KEY = process.env.IAM_USER_KEY
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET

    let s3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    })


    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL:'public-read'
    }
    return new Promise((resolve,reject)=>{
        s3Bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log('something went wrong', err)
                reject(err)
            }
            else {
                console.log('success', s3response)
                resolve(s3response.Location)
            }
        })
    })
    

}

exports.downloadexpense = async (req, res, next) => {
   try{
    const expenses = await req.user.getExpenses()
    console.log(expenses)
    const stringifiedexpense = JSON.stringify(expenses)
    console.log(stringifiedexpense)
    const uid = req.user.id
    const filename = `Expense${uid}/${new Date()}.txt`
    const fileURL = await uploadToS3(stringifiedexpense, filename)

    res.status(200).json({ fileURL, success: true })
   }
   catch(err){
    console.log(err)
    res.status(500).json({fileURL:'',success:false,error:err})
   }
}
