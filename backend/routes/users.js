const router = require('express').Router()
const jwt = require('jsonwebtoken')
const UserModel = require("../models/users")
const bcrypt = require('bcrypt')
const validator = require("email-validator");
 


router.post("/register",async (req,res)=>{
    try {

        if(!req.body.fullName){
            res.status(400).json({
                success:false,
                message:"Full Name is Required!"
            })
            return
        }

        if(!req.body.username){
            res.status(400).json({
                success:false,
                message:"Username is Required!"
            })
            return
        }

        if(!req.body.email){
            res.status(400).json({
                success:false,
                message:"Email is Required!"
            })
            return
        }

        if(!validator.validate(req.body.email)){
            res.status(400).json({
                success:false,
                message:"Invalid Email Format!"
            })
            return
        }

        if(!req.body.password){
            res.status(400).json({
                success:false,
                message:"Password is Required!"
            })
            return
        }

        




        var hashedPassword = await bcrypt.hash(req.body.password,10)

        var user = await UserModel.create({...req.body,password:hashedPassword})

        res.json({
            success:true,
            message:user
        })
        

    } catch (error) {

        if(error.code === 11000){

            if(error.keyPattern.email){
                res.status(409).json({
                    success:false,
                    message:"Email already exits!"
                })
            }

            if(error.keyPattern.username){
                res.status(409).json({
                    success:false,
                    message:"Username already exits!"
                })
            }

           
            return
        }

        res.status(500).json({
            success:false,
            message:"Something went wrong, Please try again later!"
        })
    }
})

router.post("/login", async (req, res) => {
    try {
        
        // Find User By Username
        var foundUser = await UserModel.findOne({username:req.body.username})
        if(!foundUser){
            res.status(404).json({
                success:false,
                message:"Invalid Username or Password"
            })
            return
        }

        // Compare Password by bcrypt npm
        var isValidated = await bcrypt.compare(req.body.password,foundUser.password)
        if(!isValidated){
            res.status(404).json({
                success:false,
                message:"Invalid Username or Password"
            })
            return
        }

        // Gererate Access Token and save it in response cookies
        var token = jwt.sign({id:foundUser._id},"asdkjf*&%*%*4848",{expiresIn:"15s"})
        res.cookie("accessToken",token,{secure:true,httpOnly:true})

        // Send Success Message
        res.json({
            success:true,
            message:"Login Successfully!"
        })

    } catch (error) {

        console.log(error.message)

        res.status(500).json({
            success:false,
            message:"Please try again later!"
        })
    }
})





module.exports = router