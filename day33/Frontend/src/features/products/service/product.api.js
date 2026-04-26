import axios from 'axios'

const productApi=axios.create({
    baseURL:"http://localhost:3000/api/product",
    withCredentials:true
})

export async function createProduct(productData) {
    const response=await productApi.post("/createProduct",productData)
    return response.data
}

export async function getSellerProducts() {
    const response=await productApi.get("/getSellerProducts")
    return response.data
}

export async function getAllProducts() {
    const response=await productApi.get("/getAllProducts")
    return response.data
}

export async function getSpecificProductDetails(productId) {
    const response=await productApi.get(`/getSpecificProductDetails/${productId}`)
    return response.data
}