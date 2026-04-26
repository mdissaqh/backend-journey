import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSpecificProductDetails } from '../service/product.api';
import '../style/BuyerProductDetails.scss';

const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setIsLoading(true);
                const response = await getSpecificProductDetails(productId);
                if (response.success) {
                    setProduct(response.product);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProductDetails();
    }, [productId]);

    const nextImage = () => {
        if (product?.images?.length > 0) {
            setCurrentImageIndex((prev) => 
                prev === product.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (product?.images?.length > 0) {
            setCurrentImageIndex((prev) => 
                prev === 0 ? product.images.length - 1 : prev - 1
            );
        }
    };

    if (isLoading) return <div className="loading-state">Loading product details...</div>;
    if (!product) return <div className="error-state">Product not found.</div>;

    return (
        <div className="product-details-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                &larr; Back to Products
            </button>
            
            <div className="product-details-content">
                <div className="image-slider-section">
                    {product.images && product.images.length > 0 ? (
                        <div className="slider-container">
                            {product.images.length > 1 && (
                                <button className="slider-btn prev" onClick={prevImage}>&#10094;</button>
                            )}
                            
                            <img
                                src={product.images[currentImageIndex].url}
                                alt={`${product.title} view ${currentImageIndex + 1}`}
                                className="slider-image"
                            />
                            
                            {product.images.length > 1 && (
                                <button className="slider-btn next" onClick={nextImage}>&#10095;</button>
                            )}
                            
                            {product.images.length > 1 && (
                                <div className="slider-dots">
                                    {product.images.map((_, index) => (
                                        <span
                                            key={index}
                                            className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        ></span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="no-image">No Image Available</div>
                    )}
                </div>

                <div className="product-info-section">
                    <h1 className="product-title">{product.title}</h1>
                    <div className="product-price">
                        {product.price?.amount} {product.price?.currency}
                    </div>
                    
                    <div className="product-description">
                        <h3>Product Description</h3>
                        <p>{product.description}</p>
                    </div>
                    
                    <button className="buy-now-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;