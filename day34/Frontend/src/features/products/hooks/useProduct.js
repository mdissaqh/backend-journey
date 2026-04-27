import { useDispatch, useSelector } from "react-redux"
import { createNewProduct, getTheSellerProducts, getAllBuyingProducts, addVariantToProduct } from "../state/product.slice"

export function useProduct() {
    const dispatch = useDispatch()
    const {loading, error, products}=useSelector((state)=>state.product)
    const addProduct=async (productData)=>{
        return await dispatch(createNewProduct(productData)).unwrap()
    }
    const getSellerProducts=async ()=>{
        return await dispatch(getTheSellerProducts()).unwrap()
    }
    const getAllProducts=async ()=>{
        return await dispatch(getAllBuyingProducts()).unwrap()
    }
    const addVariant=async (productId, variantData)=>{
        return await dispatch(addVariantToProduct({productId, variantData})).unwrap()
    }
    return {  isLoading:loading, error, products, addProduct, getSellerProducts, getAllProducts, addVariant }

}