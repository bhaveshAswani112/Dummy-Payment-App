const User = require("../models/user")
const Account = require("../models/bank")
const mongoose = require("mongoose")
const Transaction = require("../models/transactions")
const {z} = require("zod")


const getBalance = async function(req,res){
    try {
        const account = await Account.findOne({
            userId :req.userId
        })
        return res.status(200).json({
            balance : account.balance
        })
    } catch (error) {
        console.log(error)
        return res.status(403).json({
            message : "There is some error in fetching user balance"
        })
    }
}
const valid_inp = z.object({
    to : z.string(),
    amount : z.number()
})
const transfer = async function(req,res){
    try {
        const session = await mongoose.startSession()

        session.startTransaction()
        const body = req.body
        const {success} = valid_inp.safeParse(body)
        if(!success){
            return res.status(400).json("Incorrect inputs")
        }
        let {to , amount} = body
        const sender = await Account.findOne({
            userId : req.userId
        })

        if(sender.balance<amount){
            return res.status(400).json({
                message : "Insufficient balance"
            })
        }
        // console.log(sender)
        
        
        const receiver = await Account.findOne({
            userId : to
        })
        
        sender.balance -= amount
        receiver.balance += amount
        await sender.save()
        await receiver.save()
        const transation = await Transaction.create({
            from : req.userId,
            to : to,
            amount : amount
        })
        await session.commitTransaction()
        return res.status(200).json({
            message : "Amount transfered sucessfully",
            transaction : transation
        })

    } catch (error) {
        // console.log(error)
        return res.status(200).json({
            message : "Transaction aborted"
        })
    }
}

module.exports = {getBalance , transfer}