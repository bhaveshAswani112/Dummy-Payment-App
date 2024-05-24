const {Router} = require("express")
const {getBalance,transfer} = require("../controllers/account")
const {verifyJWT} = require("../middlewares/verifyjwt")
const router = Router()


router.get("/getbalance",verifyJWT,getBalance)
router.post("/transfer",verifyJWT,transfer)

module.exports = router