import mongoose from "mongoose";

const orderSchema = mongoose.Schema({

    orderID : {
        type : String,
        required : true,
        unique : true
    },

    email : {
        type : String,
        required : true
    },

    orderdItems : [
        {
            name : {
                type : String,
                required : true
            },
            price : {
                type : String,
                required : true
            },
            quantity : {
                type : String,
                required : true
            },
            image : {
                type : String,
                required : true
            }
        }
    ],

    date : {
        type : Date,
        default : Date.now
    },

    paymentID : {
        type : String
    },

    status : {
        type : String,
        default : "preparing"
    },

    notes : {
        type : String
    },

    name : {
        type : String,
        required : true
    },

    address : {
        type : String,
        required : true
    },

    phone : {
        type : String,
        required : true
    }
})

const Orders = mongoose.model("orders",orderSchema);

export default Orders;