import { Router } from "express";
import { createProductController, getSellerProductsController, getAllProductsController, getSpecificProductDetailsController, addProductVariantController } from "../controllers/product.controller.js";
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


/**
 * @route /api/product/getAllProducts
 * @method GET
 * @description Route to get all products.
 * @access Public
 */
router.get("/getAllProducts",getAllProductsController)

/**
 * @route /api/product/getSpecificProductDetails/:productId
 * @method GET
 * @description Route to get details of a specific product by its ID.
 * @access Public
 */
router.get("/getSpecificProductDetails/:productId",getSpecificProductDetailsController)

/**
 * @route /api/product/:productId/variants
 * @method POST
 * @description Route to add a new variant to an existing product. Only accessible to the seller who owns the product.
 * @access Private
 */
router.post("/:productId/variants", authenticateSeller, upload.array("images", 7), addProductVariantController)

export default router