import mongoose from "mongoose"

const studentSchema = mongoose.Schema({
    Name   : String,
    Age    : Number,
    Gender : String
})

const Student = mongoose.model("students",studentSchema)

export default Student