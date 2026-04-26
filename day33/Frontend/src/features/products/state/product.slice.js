import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {createProduct, getSellerProducts, getAllProducts} from '../service/product.api'

export const createNewProduct=createAsyncThunk(
    "product/createNewProduct", async (productData,{rejectWithValue})=>{
        try{
            const response=await createProduct(productData)
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to create product")
        }
    }
)

export const getTheSellerProducts=createAsyncThunk(
    "product/getTheSellerProducts", async (_, {rejectWithValue})=>{
        try{
            const response=await getSellerProducts()
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch seller products")
        }
    }
)

export const getAllBuyingProducts=createAsyncThunk(
    "product/getAllBuyingProducts", async (_, {rejectWithValue})=>{
        try{
            const response=await getAllProducts()
            return response
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch all products")
        }
    }
)


const productSlice=createSlice({
    name:"product",
    initialState:{
        products:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createNewProduct.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(createNewProduct.fulfilled,(state,action)=>{
            state.loading=false
            state.products.push(action.payload.product)
        })
        .addCase(createNewProduct.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(getTheSellerProducts.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getTheSellerProducts.fulfilled,(state,action)=>{
            state.loading=false
            state.products=action.payload.products
        })
        .addCase(getTheSellerProducts.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(getAllBuyingProducts.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(getAllBuyingProducts.fulfilled,(state,action)=>{
            state.loading=false
            state.products=action.payload.products
        })
        .addCase(getAllBuyingProducts.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
})

export default productSlice.reducer