import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    Name : String,
    Price : Number,
    Description : String
})

const Product = mongoose.model("Products",productSchema)

export default Product