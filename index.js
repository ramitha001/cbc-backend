import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routers/studentRouter.js';
import productsRouter from './routers/productsRouter.js';
import userRouter from './routers/usersRouter.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const app = express();

const mongoUrl = process.env.MONGO_DB_URI

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database Connected...")
})

app.use (bodyParser.json())

app.use ((req,res,next)=>{

        const token = req.header("Authorization")?.replace("Bearer ","")
        console.log(token)

        if(token != null){
            jwt.verify(token,process.env.SECRET, (error,decoded)=>{
                if(!error){
                    
                    req.user = decoded
                }
            } )
        }

        next()

    }
)

app.use ("/students", studentRouter)
app.use ("/products", productsRouter)
app.use ("/users", userRouter)


app.listen(
    3000,
    ()=>{
        console.log('server is running on port 3000');
    }
)