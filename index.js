import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routers/studentRouter.js';
import productsRouter from './routers/productsRouter.js';
import userRouter from './routers/usersRouter.js';
import jwt from 'jsonwebtoken';


const app = express();

const mongoUrl = "mongodb+srv://ramitha:121230@cluster0.zvqu42v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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
            jwt.verify(token,"cbc-secret-key-2000", (error,decoded)=>{
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