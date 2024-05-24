const {Router} = require("express")
const {signUp , signIn, signOut , updateDetails , findUsers , userInfo , getAllTransactions, getUsers} = require("../controllers/user")
const {verifyJWT} = require("../middlewares/verifyjwt")

const router = Router()


router.get("/",async (req,res)=>{
    res.send("Hello Bhavesh")
})
router.post("/signup",signUp)
router.post("/signin",signIn)
router.get("/find",findUsers)
// Secured routes
router.post("/signout",verifyJWT,signOut)
router.put("/update",verifyJWT,updateDetails)
router.get("/me",verifyJWT,userInfo)
router.get("/transactions",verifyJWT,getAllTransactions)
router.post("/getusers",verifyJWT,getUsers)



module.exports = router