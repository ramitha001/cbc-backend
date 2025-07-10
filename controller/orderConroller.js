import express from 'express'
import Orders from '../models/orders.js'
import mongoose from 'mongoose'

export async function createOrder(req,res){

    //take the latest product ID
    try{
        const latestOrder = await Orders.find().sort({Date : -1}).limit(1)

        
    }catch(error){
        res.status(500).json({
            message : error.message
        })

    }
}