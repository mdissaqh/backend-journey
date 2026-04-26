import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {createProduct} from '../service/product.api'

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

    }
})

export default productSlice.reducer