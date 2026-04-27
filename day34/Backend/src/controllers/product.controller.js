import { uploadImage } from "../services/upload.js"
import productModel from "../models/product.model.js"

export async function createProductController(req, res) {
    const { title, description, amount, currency } = req.body
    const seller = req.user.userId
    const images = await Promise.all(req.files.map(async (file) => {
        return await uploadImage({
            buffer: file.buffer,
            fileName: file.originalname
        })
    }))
    const imagesUrls = images.map(img => {
        return {
            url: img
        }
    })
    const newProduct = await productModel.create({
        title,
        description,
        seller,
        images: imagesUrls,
        price: {
            amount,
            currency
        }
    })
    res.status(201).json({
        message: "Product added successfully",
        success: true,
        product: newProduct
    })
}

export async function getSellerProductsController(req, res) {
    const sellerId = req.user.userId
    const products = await productModel.find({ seller: sellerId })
    res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })
}


export async function getAllProductsController(req, res) {
    const products = await productModel.find()
    res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })
}

export async function getSpecificProductDetailsController(req, res) {
    const productId = req.params.productId
    const product = await productModel.findById(productId)
    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }
    res.status(200).json({
        message: "Product details fetched successfully",
        success: true,
        product
    })
}

export async function addProductVariantController(req, res) {
    const productId = req.params.productId
    const product = await productModel.findOne({ _id: productId, seller: req.user.userId })
    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }
    const files = req.files
    const images = []
    if (files && files.length > 0) {
        (await Promise.all(
            files.map(async (file) => {
                const image = await uploadImage({
                    buffer: file.buffer,
                    fileName: file.originalname
                });
                return image;
            }))).map((img) => {
                return images.push({ url: img })
            })
    }
    const price = req.body.priceAmount
    const stock = req.body.stock
    const attributes = JSON.parse(req.body.attributes || '{}')

    product.variants.push({
        images,
        stock,
        attributes,
        price: {
            amount: Number(price) || product.price.amount,
            currency: product.price.currency
        }
    })
    await product.save()
    res.status(200).json({
        message: "Product variant added successfully",
        success: true,
        product
    })
}