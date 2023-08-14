const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {usermodel} = require("../models/usermodel");
const userRouter = express.Router();


userRouter.post("/signup",async(req,res)=>{

    const {name,email,password} = req.body;
    try{
        let isPresent = await usermodel.findOne({email});
        if(!isPresent){
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(400).send({msg:"Try Again",error:err.message})
            }else{
                const content=[];
                const User = new usermodel({name,email,password:hash,content})
                await User.save();
                res.status(200).send({msg:"Signup Successfully"})
            }
        })
    }else{
        res.send({msg:"user already registered"})
    }
    }
    catch(error){
        res.status(500).send({msg:"Something Wrong try again",error:error.message})
    }
});



userRouter.post("/login",async (req,res)=>{

    try{
        const {email,password} = req.body;

        const isUser = await usermodel.findOne({email});

        
        if(!isUser){
            return res.status(400).send({msg:"SignUp Please then login"})
        }
    
        
        const isPassword = await bcrypt.compareSync(password,isUser.password)

        if(!isPassword){
            return res.status(400).send({msg:"Worng Password"})
        }

        const token = await jwt.sign({email,userID:isUser._id},process.env.token_key,{expiresIn:"1d"});

            
        const {name} = isUser
        const user = {name,email}
        res.status(200).send({msg:"Login Successfull",token,user})
    }
    catch(err){
        res.status(500).send(err.message)
    }
}
);


module.exports={
    userRouter
}