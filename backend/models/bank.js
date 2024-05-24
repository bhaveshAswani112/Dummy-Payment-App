const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const accountSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    balance : {
        type : Number,
        required : true

    }
},{timestamps : true})

const Account = mongoose.model("Account",accountSchema)
module.exports = Account