const mongoose   = require("mongoose")

const transactionSchema = mongoose.Schema({
    from : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    to : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    amount : {
        type : Number,
        required : true
    }
},{timestamps : true})

const Transaction = mongoose.model("Transaction",transactionSchema)

module.exports = Transaction