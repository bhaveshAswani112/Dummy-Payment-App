const mongoose = require("mongoose")
const {DATABASE_URL} = require("./config.js")

const ConnectionInstance = async function(){
    try {
        // console.log(DATABASE_URL)
        await mongoose.connect(`${DATABASE_URL}/paytm2`,{useNewUrlParser : true})
        console.log("Successfull connection with the database")
    } catch (error) {
        console.log("There is some error in connecting to database ")
    }
}

module.exports = {ConnectionInstance}