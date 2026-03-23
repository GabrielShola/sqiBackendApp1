// const express = require("express")
const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["admin", "user"], default: "user"}

}, {timestamps: true, strict: "throw"})

const userModel = mongoose.model("user", userSchema)



module.exports = userModel
