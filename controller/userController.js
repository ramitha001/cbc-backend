import express from "express";
import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){
    
    const newUserData = req.body;
    newUserData.password = bcrypt.hashSync(newUserData.password,10);

    const user = new User(newUserData);

    user.save().then(()=>{
        res.json({
            message : "User created successfully",
        })
    }).catch (()=>{
        res.json({
            message : "User not created",
        })
    })
}

export function loginUser(req,res){
    User.find({email : req.body.email}).then((Users)=>{
        if(Users.length == 0){
            res.json({
                message : "User Not Found"
            })
        }else{
            const user = Users[0]

            const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)

            if(isPasswordCorrect){

              const token = jwt.sign({
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    isBlocked : user.isBlocked,
                    type : user.type,
                    profilePicture : user.profilePicture
              }, "cbc-secret-key-2000" )
              
                res.json({
                    message : "User Logged in",
                    token : token
                })

            }else{
                res.json({
                    message : "Password Incorrect"
                })
            }
        }
    })
}

export function deleteUser(req,res){
    User.deleteOne ({email : req.body.email}).then(()=>{
        res.json({
            message : "Student successfully Deleted"
        })
    })
}