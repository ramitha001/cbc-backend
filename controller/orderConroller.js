import express from 'express'
import Orders from '../models/orders.js'
import mongoose from 'mongoose'
import { isCustomer } from './userController.js'

export async function createOrder(req, res) {
    // ✅ Fix: Call the function
    if (!isCustomer(req)) {
        return res.json({
            message: "please login as customer to create order"
        });
    }

    try {
        const latestOrder = await Orders.find().sort({ date: -1 }).limit(1);

        let orderID;

        if (latestOrder.length === 0) {
            orderID = "CBC001";
        } else {
            const currentOrderID = latestOrder[0].orderID;
            const numberString = currentOrderID.replace("CBC", "");
            const number = parseInt(numberString);
            const newNumber = (number + 1).toString().padStart(3, "0");
            orderID = "CBC" + newNumber;
        }

        const newProdcutData = req.body;

        const newProductArray = []

        for(let i = 0; i<newProdcutData.orderdItems.length; i++ ){
            console.log(newProdcutData.orderdItems[i])
        }
        
        newProdcutData.orderID = orderID;

        // ✅ Make sure req.user or req.customer is available (depending on auth middleware)
        newProdcutData.email = req.user?.email || req.customer?.email;

        const order = new Orders(newProdcutData);

        await order.save();

        res.json({
            message: "Order created"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export async function getOrder(req,res){
    try{
            const order = await Orders.find({email : req.user.email})

            res.json (order)
    }catch(error){
            res.status(500).json({
                message : error.message
            })

    }
}