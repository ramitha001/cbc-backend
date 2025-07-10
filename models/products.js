import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productID : {
        type : String,
        unique : true

    },

    productName : {
        type : String,
        required : true
    },

    altNames : [
        {
            type : string
        }
    ],

    images : [
        {
            type : string
        }
    ],

    price : {
        type : Number,
        required : true
    },

    lastPrice : {
        type : string,
        required : true
    },

    description : {
        type : string,
        required : true
    }

})

const Product = mongoose.model("Product",productSchema);

export default Product;
