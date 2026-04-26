import React from 'react'
import { useState } from 'react'
import { useProduct } from '../hooks/useProduct'
import toast from 'react-hot-toast'
import "../style/CreateProduct.scss"

const CreateProduct = () => {
    const {addProduct, isLoading}=useProduct()
    const [title, setTitle]=useState('')
    const [description, setDescription]=useState('')
    const [amount, setAmount]=useState('')
    const [currency, setCurrency]=useState('INR')
    const [images, setImages]=useState([])
    const handleImageChange=(e)=>{
        const newFiles=Array.from(e.target.files)
        const files=[...images, ...newFiles]
        if(files.length>7){
            toast.error("You can upload a maximum of 7 images")
            return
        }
        setImages(files)
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const formData=new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("amount", amount)
        formData.append("currency", currency)
        images.forEach((image) => {
            formData.append("images", image)
        })
        try{
            const response=await addProduct(formData)
            toast.success(response.message)
            setTitle('')
            setDescription('')
            setAmount('')
            setImages([])
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }
  return (
    <div className="create-product-container">
        <h2>Create New Product</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" 
            placeholder="Product Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
            />
            <textarea placeholder="Product Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
            />
            <div className="price-group">
                <input type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                required
                />
                <select value={currency} 
                onChange={(e)=>setCurrency(e.target.value)}
                required>
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
            <div className="image-upload-group">
                <input type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required
                />
            {
                images.length>0 && (
                    <small>{images.length} image(s) selected</small>
                )
            }
            </div>
            <button type="submit"
            disabled={isLoading}
            className="submit-btn"
            >
                {isLoading ? "Creating Product..." : "Create Product"}
            </button>
        </form>
    </div>
  )
}

export default CreateProduct
