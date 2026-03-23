const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    image: {type: String, required: true},
    brand: {type: String, required: true},
    year: {type: Number, required: true},
    currency: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    createdBy: {type:mongoose.Schema.Types.ObjectId, ref:"user"}

}, {timestamps: true, strict: "throw"})

const userProductModel = mongoose.model("product", productSchema)

module.exports = userProductModel