import express from "express"
import { authenticateUser } from "../middlewares/auth.middleware"
import { addToCartController, getCartController, removeFromCartController } from "../controllers/cart.controller"

const router=express.Router()


router.post("/add/:productId/:variantId", authenticateUser, addToCartController)

router.get("/", authenticateUser, getCartController)