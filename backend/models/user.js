const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        lowercase : true
    },
    lastName : {
        type : String,
        required : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    email:{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        minLength : 4,
        maxLength : 30
    }
    
},{timestamps : true})

userSchema.pre("save" , async function(next){
    if(!this.isModified("password"))return next()
    try {
        this.password = await bcrypt.hash(this.password,10)
        next()
    } catch (error) {
        console.log("Error in password hashing")
    }
})

userSchema.methods.isPasswordCorrect = async function(password){
    const resp = await bcrypt.compare(password,this.password)
    return resp
}

const User = mongoose.model("User",userSchema)


module.exports = User