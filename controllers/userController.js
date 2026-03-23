const userModel = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.MAIL_PASS
  }
});


const createUser = async(req, res)=>{
  const {firstName, lastName, userName, email, password, role} = req.body
    try {

        let salt = 10
        const saltRound = await bcrypt.genSalt(salt)
        const hashPassword = await bcrypt.hash(password, saltRound)
        const user = await userModel.create({firstName,
            lastName,
            userName,
            email,
            password: hashPassword,
            role
        })
        const token= jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn: "10h"})
        res.status(201).send({
            message: "account created successfully",
            data: {
                firstName,lastName, userName, email, role
            },
            token
        })

let mailOptions = {
  from: process.env.USER,
  to: `${email}`,
  subject: `Welcome to Dee Favor Foods ${firstName}`,
  html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }

    .container {
      width: 100%;
      padding: 20px;
      background-color: #f4f4f4;
    }

    .email-box {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    .header {
      background-color: #ff6600;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 24px;
      font-weight: bold;
    }

    .content {
      padding: 30px;
      color: #333333;
      line-height: 1.6;
    }

    .content h2 {
      color: #ff6600;
    }

    .button {
      display: inline-block;
      padding: 12px 20px;
      margin-top: 20px;
      background-color: #ff6600;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }

    .footer {
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #888888;
      background-color: #f9f9f9;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="email-box">

      <div class="header">
        DEE FAVOR FOODS
      </div>

      <div class="content">
        <h2>Welcome ${firstName} 🎉</h2>

        <p>Hi there,</p>

        <p>
          Thank you for creating an account with <strong>DEE FAVOR FOODS</strong>.
          We are excited to have you join our family!
        </p>

        <p>
          At DEE FAVOR FOODS, we provide delicious, high-quality meals and
          excellent service just for you.
        </p>

        <p>
          You can now explore our menu, place orders, and enjoy amazing food
          delivered right to your doorstep.
        </p>

        <a href="#" class="button">Start Ordering</a>

        <p>
          If you have any questions, feel free to reach out to us anytime.
        </p>

        <p>Cheers,<br><strong>The DEE FAVOR FOODS Team</strong></p>
      </div>

      <div class="footer">
        &copy; 2026 DEE FAVOR FOODS. All rights reserved.
      </div>

    </div>
  </div>
</body>
</html>`
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

 } catch (error) {
        console.log(error.message)
        res.status(400).send({
            message: "Account failed to create"
        })
        
    }
}

const getUser = async(req, res)=>{

    const {role} =req.user

    try {
       
       
        const fetchUser = await userModel.find().select("-password")
       if(role !=="admin"){
        res.status(400).send({
            message: "Forbidden request"
        })
       }
        
        res.status(201).send({
            message: "Users fetch successfully",
            data: fetchUser
        })
        
    } catch (error) {
        console.log(error)
        res.status(401).send({
            message: "Error in fetching users"
        })
        
    }
}

const deleteUser = async (req, res)=>{
    const {id} = req.params
    try {
        
        const user = await userModel.findByIdAndDelete(id)
        res.status(204).send({
            message: "User deleted successfully"

        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            message: "Unable to delete user"
        })
        
    }
}
const login = async(req, res)=>{
    const {email, password}= req.body

    try {
        const isUser = await userModel.findOne({email})
        if(!isUser){
            res.status(401).send({
                message: "Invalid credentials"
            })
            return
        }
        const isMatch = await bcrypt.compare(password, isUser.password)
        if(!isMatch){
              res.status(401).send({
                message: "Invalid credentials"
            })
            return
            
        }
         const token= jwt.sign({id:isUser._id, role:isUser.role}, process.env.JWT_SECRET, {expiresIn: "10h"})
        res.status(201).send({
            message: "login successful",
            token
        })
        
    } catch (error) {

        console.log(error.message)
         res.status(401).send({
                message: "login fails"
            })
            return

        
    }
}

const verifyUser = async(req, res, next)=>{
   try {
     const token = req.headers.authorization.split(" ")[1]?req.headers.authorization.split(" ")[1]:req.headers.authorization.split(" ")[0]
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, function(err,decoded){
        if(err){
            res.status(401).send({
                message: "user unauthorized"
            })
            return
        }
        console.log(decoded)
        req.user = decoded
        next()


    })
    
   } catch (error) {
    console.log(error)
    res.status(400).send({
        message: "User unauthorize"
    })
    
   }

}

module.exports = {
    createUser,
    getUser,
    deleteUser,
    login,
    verifyUser
}




// const userModel = require("../models/userModels")

// const createUser = async(req, res)=>{
//     const {firstName, lastName, userName, email, password, role} = req.body
//  try {

//     const newUser = await userModel.create(req.body)
//     res.status(201).send({
//         message: "Your account creation is successful",
//         data: {
//             firstName, lastName, userName, email, role

//         }
//     })

// } catch (error) {
//     console.log(error.message)
//     res.status(401).send({
//         message: "Account creation failed"
//     })
    
    
//  }

// }

// const getUser = async(req, res)=>{

//     try {
       
//         const fetchUser = await userModel.find().select("-password")
//         res.status(201).send({
//             message: "user collected successfully"
            
//         })
        
//     } catch (error) {
//         console.log(error.message)
//         res.status(401).send({
//             message: "unable to fetch data"
//         })
        
//     }

// }


// module.exports= {
    
    
    
// }