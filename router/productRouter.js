
const express = require("express")

const { verifyUser } = require("../controllers/userController")
const { createProduct, fetchProducts } = require("../controllers/productController")
const router = express.Router()

router.post("/addproducts", verifyUser, createProduct)
router.get("/fetchproduct", verifyUser, fetchProducts)


module.exports = router