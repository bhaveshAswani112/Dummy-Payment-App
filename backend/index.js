const express = require("express");
const {ConnectionInstance} = require("./db")
const mainRouter = require("./routes/index")
const bodyParser = require("body-parser");
const cors = require('cors')


const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use("/api/v1",mainRouter)


app.listen(4000,()=>{
    try {
        console.log("App is listening at port 4000")
        ConnectionInstance()
    } catch (error) {
        console.log(error)
        console.log("Error while running the app")
    }
})