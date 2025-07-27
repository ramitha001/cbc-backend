import express from 'express'
import Orders from '../models/orders.js'
import mongoose from 'mongoose'
import { isCustomer } from './userController.js'
import Product from '../models/products.js';

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

        const newProductData = req.body;

        const newProductArray = []

        for(let i = 0; i<newProductData.orderdItems.length; i++ ){
            const product = await Product.findOne({
                productId : newProductData.orderdItems[i].productId
            })
            if(product == null){
                res.json({
                    message : "Product with id " + newProductData.orderdItems[i].productId + " not found"
                })
                return
            }

            if (!Array.isArray(product.image) || product.image.length === 0) {
                return res.status(400).json({ message: `Product with id ${newProductData.orderdItems[i].productId} has no image` });
            }

            newProductArray[i] = {
                namr : product.name,
                price : product.price,
                quantity : newProductData.orderdItems[i].quantity,
                image : product.image[0]
            }
            
        }
        console.log(newProductArray)

        newProductData.orderdItems = newProductArray
        
        newProductData.orderID = orderID;

        // ✅ Make sure req.user or req.customer is available (depending on auth middleware)
        newProductData.email = req.user?.email || req.customer?.email;
        if (!newProductData.email) {
            return res.status(400).json({ message: "User email not found in request" });
        }

        const order = new Orders(newProductData);

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
            const email = req.user?.email;
            if (!email) {
                return res.status(400).json({ message: "User not authenticated" });
            }
            const order = await Orders.find({ email });

            res.json (order)
    }catch(error){
            res.status(500).json({
                message : error.message
            })

    }
}