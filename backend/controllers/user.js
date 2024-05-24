const mongoose = require("mongoose")
const User = require("../models/user.js")
const {z} = require("zod")
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config.js")
const Account = require("../models/bank.js")
const Transaction = require("../models/transactions.js")


const user_valid = z.object({
    email : z.string().email().min(4).max(30),
    firstName : z.string(),
    lastName : z.string(),
    password : z.string().min(6)
})

const user_valid_signin = z.object({
    email : z.string().email().min(4).max(30),
    password : z.string()
})
const user_valid_update = z.object({
    firstName : z.string(),
    lastName : z.string(),
    password : z.string().min(6)
})

const signUp = async function(req,res){
    try {
        const data = req.body
        if(!user_valid.safeParse(data).success){
            res.status(411).json({
                message : "Incorrect inputs"
            })
            return
        }
    
        const {email , firstName , lastName , password} = data
        const existing = await User.findOne({email})
        if(existing){
            res.status(400).json({
                message : "Account already exist with this email id"
            })
            return
        }
        const new_user = await User.create({
            email : email,
            firstName : firstName,
            lastName : lastName,
            password : password
        })
        if(new_user){
            await Account.create({
                userId : new_user,
                balance : Math.floor(Math.random() * 10000) + 1
            })
        }
        // console.log(new_user)
       const decode = jwt.sign({id : new_user._id},JWT_SECRET)
       res.status(200).json({
        message : "User created successfully",
        token : decode
       })
    } catch (error) {
        res.status(411).json({
            message : "There is some error during user creation"
        })
        console.log(error)
    }

}

const signIn = async function(req,res){
    try {
        const {email , password} = req.body
        const {success} = user_valid_signin.safeParse(req.body)
        if(!success){
            res.status(403).json({
                message : "Incorrect inputs"
            })
            return
        }
        console.log(email,password)
        const user = await User.findOne({
            email
        })
        if(!user){
            res.status(411).json({
                message : "User does not exist/Incorrect password"
            })
            return
        }
        // console.log("Working till here")
        const resp = await user.isPasswordCorrect(password)
        // console.log(resp)
        if(!resp){
            res.status(411).json({
                message : "Incorrect password"
            })
            return
        }
        // console.log(user._id)
        // console.log("Working till here")
        const decode = jwt.sign({id : user._id},JWT_SECRET)
        res.status(200).json({
            message : "User logged in successfully",
            token : decode
        })
    } catch (error) {
        res.status(500).json({
            message : "Error from backend side"
        })
    }
}

const signOut = async function(req,res){
    res.removeHeader("Authorization")
    res.status(200).json({
        message : "User logged out successfully"
    })
}

const updateDetails = async function(req,res){
    const user = await User.findById(req.userId)
    const body = req.body
    if(!body.firstName){
        firstName = user.firstName
    }
    if(!body.lastName){
        lastName = user.lastName
    }
    const {success} = user_valid_update.safeParse(body)
    if(!success){
        res.status(403).json({
            message : "Incorrect inputs passed"
        })
    }
   user = await User.findByIdAndUpdate(req.userId,{
    firstName,lastName,password
   }).select("-password")
   res.status(200).json({
    message : "User details updated successfully"
   })
}

const findUsers = async function(req,res){
    const filter = req.query.filter?.toLowerCase() || ""
    const users = await User.find({
        "$or" : [{
            firstName : {
                "$regex" : filter
            }
        },{
            lastName : {
                "$regex" : filter
            }
        },{
            email : {
                "$regex" : filter
            }
        }]
    })
    res.status(200).json({
        users : users.map((user) =>{
            return {
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
                id : user._id
            }
        })
    })
}

const userInfo = async function(req,res){
    try {
        const user = await User.findById(req.userId)?.select("-password")
        res.status(200).json({
            message : "User details fetched successfully",
            user : user
        })
    } catch (error) {
        res.status(500).json({
            message : "Error from backend side"
        })
    }
}

const getAllTransactions = async function(req,res){
    try {
        const transactions = await Transaction.find({
            $or : [{from : req.userId} , {to : req.userId}]
        })
        return res.status(200).json({
            message : "All transactions fetched successfully.",
            transactions : transactions
        })
    } catch (error) {
        return res.status(500).json({
            message : "Error from backend side while fetching all the transactions."
        })
    }
}

const getUsers = async function(req,res){
    try {
        const { id1 , id2 } = req.body
        if(!id1 && !id2){
            return res.status(400).json({
                message : "Send all the inputs"
            })
        }
        let user1
        let user2
        try {
            user1 = await User.findById(id1).select("-password")
            user2 = await User.findById(id2).select("-password")
        } catch (error) {
            console.log(error)
        }
        if(!user1 && !user2){
            return res.status(400).json({
                message : "Incorrect ids given"
            })
        }
        return res.status(200).json({
            message : "User fetched successfully",
            user1 : user1,
            user2 : user2
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : "Error from backend side"
        })
    }
}


module.exports = {signUp,signIn,signOut,updateDetails,findUsers,userInfo , getAllTransactions , getUsers}