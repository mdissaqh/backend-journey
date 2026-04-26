import { Router } from "express";
import { createProductController, getSellerProductsController } from "../controllers/product.controller.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import multer from "multer"

const upload=multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize: 5*1024*1024
    }
})


const router=Router()

/**
 * @route /api/product/createProduct
 * @method POST
 * @description Route to create a new product. Only accessible to authenticated sellers.
 * @access Private
 */
router.post("/createProduct",authenticateSeller,upload.array("images",7), createProductController)


/**
 * @route /api/product/getSellerProducts
 * @method GET
 * @description Route to get all products of the authenticated seller. Only accessible to authenticated sellers.
 * @access Private
 */
router.get("/getSellerProducts",authenticateSeller,getSellerProductsController)


export default router