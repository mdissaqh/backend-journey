import { useDispatch, useSelector } from "react-redux"
import { createNewProduct } from "../state/product.slice"

export function useProduct() {
    const dispatch = useDispatch()
    const {loading, error}=useSelector((state)=>state.product)
    const addProduct=async (productData)=>{
        return await dispatch(createNewProduct(productData)).unwrap()
    }
    return {  isLoading:loading, error, addProduct }

}