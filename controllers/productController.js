const userProductModel = require("../models/productModels")


const createProduct = async(req, res)=>{
    const {image, brand, year, currency,location, description} = req.body

   try {
     const newProduct = await userProductModel.create({image, brand, year, currency,location, description, createdBy:req.user.id})
     res.status(201).send({
        message: "Product Order created successfully",
        data: {
            image, brand, year,currency, location, description
        }
     })
    
   } catch (error) {
    console.log(error.message)
    res.status(400).send({
        message: "Product creation failed"
    })
    
   }
}

const fetchProducts = async(req, res)=>{

    try {

        const product = await userProductModel.find().populate("createdBy", "email userName" )

        res.status(200).send({
            message: "products fetched successfully",
            data: product
        })
        
    } catch (error) {
        console.log(error)
        res.status(404).send({
            message: "unable to fetchproducts"
        })
        
    }

}

module.exports ={
    createProduct,
    fetchProducts
}