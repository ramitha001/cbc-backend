import express from 'express'
import Product from '../models/products.js'
import mongoose from 'mongoose'
import { isAdmin } from './userController.js'
import dotenv from 'dotenv'
dotenv.config()

export function createProduct (req,res){

    if (!isAdmin(req)){
        res.json({
            message : "Please login as Administrator to add product"
        })
        return
    }

    const newProdcutData = req.body;

    const product = new Product(newProdcutData)

    product.save().then(()=>{
        res.json({
            message : "product Successfully Added.."
        })
    }).catch((error)=>{
        res.status(403).json({
            message : error
        })
    })
}

export function getProduct(req,res){
    Product.find({}).then((Product)=>{
        res.json(Product)
    })
}

export function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Please login as administrator to delete product"
        })
        return
    }

    const productID = req.params.productId

    Product.deleteOne({productID : productID}).then(()=>{
        res.json({
            message : "product Deleted.."
        })
    }).catch((error)=>{
        res.status(403).json({
            message : error
        })
    })
}

export function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Please login as administrator to update product"
        })
    }

    const productID = req.params.productId
    const productData = req.body

    Product.updateOne({productID : productID},productData).then(()=>{
        res.json({
            message : "product Updated.."
        })
    }).catch((error)=>{
        res.status(403).json({
            message : error
        })
    })
}


