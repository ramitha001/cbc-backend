import express from "express";
import { getProduct,createProduct,deleteProduct,getProductByName } from "../controller/productController.js";

const productsRouter = express.Router();

productsRouter.get("/",getProduct )      

productsRouter.post("/",createProduct )

productsRouter.delete("/",deleteProduct)

productsRouter.get("/byName", getProductByName)

export default productsRouter;