import express from 'express'
import { createOrder } from '../controller/orderConroller.js'

const orderRouter = express.Router();

orderRouter.post ("/", createOrder)

export default orderRouter;