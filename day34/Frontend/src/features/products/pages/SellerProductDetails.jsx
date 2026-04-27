import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSpecificProductDetails } from '../service/product.api'
import toast from 'react-hot-toast'
import { useProduct } from '../hooks/useProduct'
import "../style/SellerProductDetails.scss"

const SellerProductDetails = () => {
    const { productId } = useParams()
    console.log("Product ID from URL:", productId)
    const navigate = useNavigate()
    const { addVariant, isLoading: isAddingVariant } = useProduct()

    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [showVariantForm, setShowVariantForm] = useState(false)
    const [variantData, setVariantData] = useState({
        priceAmount: '',
        stock: '',
        attributeKey: '',
        attributeValue: '',
        images: []
    })

    const fetchProductDetails = async () => {
        try {
            setIsLoading(true)
            const response = await getSpecificProductDetails(productId)
            if (response.success) {
                setProduct(response.product)
                toast.success('Product details fetched successfully')
            }
        } catch (error) {
            toast.error('Error fetching product details')
            console.error('Error fetching product details:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProductDetails()
    }, [productId])

    const nextImage = () => {
        if (product?.images?.length > 0) {
            setCurrentImageIndex(currentImageIndex === product.images.length - 1 ? 0 : currentImageIndex + 1)
        }
    }

    const prevImage = () => {
        if (product?.images?.length > 0) {
            setCurrentImageIndex(currentImageIndex === 0 ? product.images.length - 1 : currentImageIndex - 1)
        }
    }

    const handleFileChange = (e) => {
        setVariantData({ ...variantData, images: Array.from(e.target.files) })
    }

    const handleAddVariantSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("priceAmount", variantData.priceAmount)
        formData.append("stock", variantData.stock)

        if (variantData.attributeKey && variantData.attributeValue) {
            const attributeObj = { [variantData.attributeKey]: variantData.attributeValue }
            formData.append("attributes", JSON.stringify(attributeObj))
        }

        variantData.images.forEach((file) => {
            formData.append("images", file)
        })

        try {
            const response = await addVariant(productId, formData)
            if (response.success) {
                toast.success("Variant added successfully")
                setProduct(response.product)
                setVariantData({
                    priceAmount: '',
                    stock: '',
                    attributeKey: '',
                    attributeValue: '',
                    images: []
                })
                setShowVariantForm(false)
            }
        } catch (error) {
            toast.error("Failed to add variant")
            console.error("Error adding product variant:", error)
        }
    }

    if (isLoading && !product) {
        return <div className="loading-state">Loading product details...</div>
    }

    if (!product) {
        return <div className="error-state">Product not found.</div>
    }

    return (
        <div className="seller-product-details-container">
            <button className="seller-back-button" onClick={() => navigate(-1)}>&larr; Back</button>

            <div className="seller-product-details-content">

                <div className="seller-image-slider-section">
                    {product.images && product.images.length > 0 ? (
                        <div className="seller-slider-container">

                            {product.images.length > 1 && (
                                <button className="seller-slider-btn prev" onClick={prevImage}>&#10094;</button>
                            )}

                            <img
                                src={product.images[currentImageIndex].url}
                                alt={product.title}
                                className="seller-slider-image"
                            />

                            {product.images.length > 1 && (
                                <button className="seller-slider-btn next" onClick={nextImage}>&#10095;</button>
                            )}

                            {product.images.length > 1 && (
                                <div className="seller-slider-dots">
                                    {product.images.map((_, index) => (
                                        <span
                                            key={index}
                                            className={`seller-dot ${index === currentImageIndex ? "active" : ""}`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        ></span>
                                    ))}
                                </div>
                            )}

                        </div>
                    ) : (
                        <div className="seller-no-image">No images available</div>
                    )}
                </div>

                <div className="seller-product-info-section">
                    <h1 className="seller-product-title">{product.title}</h1>

                    <div className="seller-product-price">
                        {product.price.amount} {product.price.currency}
                    </div>

                    <div className="seller-product-description">
                        <h3>Product Description</h3>
                        <p>{product.description}</p>
                    </div>

                    <div className="seller-variants-section">
                        <h3>Product Variants</h3>

                        {product.variants && product.variants.length > 0 && (
                            <div className="variant-list">
                                {product.variants.map((variant, index) => {
                                    const attributesStr = variant.attributes
                                        ? Object.entries(variant.attributes).map(([k, v]) => `${k}: ${v}`).join(', ')
                                        : 'Default'
                                    return (
                                        <div key={index} className="variant-card">
                                            <p><strong>Attributes:</strong> {attributesStr}</p>
                                            <p><strong>Price:</strong> {variant.price?.amount || product.price.amount} {variant.price?.currency || product.price.currency}</p>
                                            <p><strong>Stock:</strong> {variant.stock}</p>
                                            <p><strong>Images:</strong> {variant.images?.length || 0} attached</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        {!showVariantForm ? (
                            <button className="add-variant-btn" onClick={() => setShowVariantForm(true)}>
                                + Add Another Variant
                            </button>
                        ) : (
                            <form className="add-variant-form" onSubmit={handleAddVariantSubmit}>
                                <h4>New Variant Details</h4>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Attribute Name (e.g. Size)"
                                        value={variantData.attributeKey}
                                        onChange={e => setVariantData({ ...variantData, attributeKey: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Attribute Value (e.g. XL)"
                                        value={variantData.attributeValue}
                                        onChange={e => setVariantData({ ...variantData, attributeValue: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="number"
                                        placeholder={`Price Override (${product.price.currency})`}
                                        value={variantData.priceAmount}
                                        onChange={e => setVariantData({ ...variantData, priceAmount: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Stock Quantity"
                                        value={variantData.stock}
                                        onChange={e => setVariantData({ ...variantData, stock: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="cancel-btn" onClick={() => setShowVariantForm(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="save-btn" disabled={isAddingVariant}>
                                        {isAddingVariant ? 'Saving...' : 'Save Variant'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerProductDetails