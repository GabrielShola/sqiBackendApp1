const express = require("express")
const { createUser, getUser, deleteUser, login, verifyUser } = require("../controllers/userController")


const router = express.Router()

 router.post("/register", createUser)
 router.get("/getuser", verifyUser, getUser)
 router.delete("/deleteuser/:id", deleteUser)
 router.post("/login", verifyUser, login)

module.exports = router
