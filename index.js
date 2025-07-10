import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routers/usersRouter.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
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



app.use ("/users", userRouter)
app.use ("/product",productRouter)
app.use ("/orders", orderRouter)


app.listen(
    3000,
    ()=>{
        console.log('server is running on port 3000');
    }
)