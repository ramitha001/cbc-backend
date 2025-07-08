import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required: true,
        unique : true
    },

    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true,
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    type : {
        type : String,
        default : "customer"
    },
    profilePicture : {
        type : String,
        default : "https://www.freepik.com/free-psd/3d-illustration-person-with-sunglasses_27470334.htm#fromView=keyword&page=1&position=7&uuid=6738dc3c-6e7d-4dcb-9f24-27aa1ec72345&query=Default+User"
    }
})

const User = mongoose.model("User", userSchema);

export default User;