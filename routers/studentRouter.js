import express from "express";
import Student from "../models/student.js";
import { getStudent,createStudent,deleteStudent } from "../controller/studentController.js";



//create StudentRouter

const studentRouter = express.Router();

studentRouter.get("/", getStudent)

studentRouter.post("/", createStudent)

studentRouter.delete("/",deleteStudent)
 
export default studentRouter;