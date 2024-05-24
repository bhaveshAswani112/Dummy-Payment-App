const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config.js")


const verifyJWT = async function(req,res,next){
    try {
        const token = req?.headers["authorization"]?.replace("Bearer ","") 
        // console.log(req?.headers)
        if(!token){
            res.status(403).json({
                message : "Unauthorized user"
            })
            return
        }
        try {
            const verify = jwt.verify(token,JWT_SECRET)
            if(verify && verify.id){
                req.userId = verify.id
                next()
            }
            else{
                res.status(403).json({
                    message : "Unauthorized user"
                })
                return 
            }
            
        } catch (error) {
            res.status(403).json({
                message : "Unauthorized user"
            })
            return 
        }
    } catch (error) {
        console.log("Error while verifying the token")
        console.error(error)
        res.status(403).json({
            message : "Unauthorized user"
        })
        return
    }
}

module.exports = {verifyJWT}