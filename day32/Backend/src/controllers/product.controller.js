import { uploadImage } from "../services/upload.js"
import productModel from "../models/product.model.js"

export async function createProductController(req,res){
    const {title,description,amount,currency}=req.body
    const seller=req.user.userId
    const images=await Promise.all(req.files.map(async(file)=>{
        return await uploadImage({
            buffer:file.buffer,
            fileName:file.originalname
        })
    }))
    const imagesUrls=images.map(img=>{
        return {
            url:img
        }
    })
    const newProduct=await productModel.create({
        title,
        description,
        seller,
        images: imagesUrls,
        price:{
            amount,
            currency
        }
    })
    res.status(201).json({
        message:"Product added successfully",
        success:true,
        product:newProduct
    })
}

export async function getSellerProductsController(req,res){
    const sellerId=req.user.userId
    const products=await productModel.find({seller:sellerId})
    res.status(200).json({
        message:"Products fetched successfully",
        success:true,
        products
    })
}