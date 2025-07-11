import express from 'express'
import { createOrder, getOrder } from '../controller/orderConroller.js'

const orderRouter = express.Router();

orderRouter.post ("/", createOrder)
orderRouter.get ("/",getOrder)

export default orderRouter;