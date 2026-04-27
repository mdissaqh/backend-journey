import cartModel from "../models/cart.model";
import productModel from "../models/product.model";
import { stockOfVariant } from "../dao/product.dao";


export const addToCartController = async (req, res) => {
    const { productId, variantId } = req.params
    const { quantity = 1 } = req.body
    const product = await productModel.findOne({
        _id: productId,
        "variants._id": variantId
    })
    if (!product) {
        return res.status(404).json({
            message: "Product or variant not found",
            success: false
        })
    }

    const stock = await stockOfVariant(productId, variantId);

    const cart = (await cartModel.findOne({ user: req.user.userId })) || (cartModel({ user: req.user.userId }))

    const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId && item.variant.toString() === variantId)
    if (isProductAlreadyInCart) {
        const quantityInCart = cart.items.find(item => item.product.toString() === productId && item.variant.toString() === variantId).quantity
        if (stock < quantityInCart + quantity) {
            return res.status(400).json({
                message: "Insufficient stock",
                success: false
            })
        }
        await cartModel.findOneAndUpdate(
            { user: req.user.userId, "items.product": productId, "items.variant": variantId },
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )
        return res.status(200).json({
            message: "Product added to cart successfully",
            success: true,
            cart
        })
    }
    if (quantity > stock) {
        return res.status(400).json({
            message: "Insufficient stock",
            success: false
        })
    }
    cart.items.push({
        product: productId,
        variant: variantId,
        quantity,
        price: product.price
    })
    await cart.save()
    res.status(200).json({
        message: "Product added to cart successfully",
        success: true,
        cart
    })
}

export const getCartController = async (req, res) => {
    const user = req.user
    const cart = await cartModel.findOne({ user: user.userId }).populate("items.product")
    if (!cart) {
        cart = await cartModel.create({ user: user.userId })
    }
    return res.status(200).json({
        message: "Cart fetched successfully",
        success: true,
        cart
    })
}