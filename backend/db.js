const mongoose = require("mongoose")

const ConnectionInstance = async function(){
    try {
        await mongoose.connect("mongodb+srv://aswanib133:bhavesh123@cluster0.fchyxuo.mongodb.net/paytm2",{useNewUrlParser : true})
        console.log("Successfull connection with the database")
    } catch (error) {
        console.log("There is some error in connecting to database ")
    }
}

module.exports = {ConnectionInstance}