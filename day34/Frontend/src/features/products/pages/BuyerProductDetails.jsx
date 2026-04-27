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

    const [selectedVariantIndex, setSelectedVariantIndex] = useState(-1);

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

    const currentViewData =
        selectedVariantIndex === -1
            ? product
            : product?.variants?.[selectedVariantIndex];

    const displayPrice = currentViewData?.price?.amount
        ? currentViewData.price
        : product?.price;

    const displayImages =
        currentViewData?.images?.length > 0
            ? currentViewData.images
            : product?.images;

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [selectedVariantIndex]);

    const nextImage = () => {
        if (displayImages?.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === displayImages.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (displayImages?.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? displayImages.length - 1 : prev - 1
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
                    {displayImages && displayImages.length > 0 ? (
                        <div className="slider-container">

                            {displayImages.length > 1 && (
                                <button className="slider-btn prev" onClick={prevImage}>
                                    &#10094;
                                </button>
                            )}

                            <img
                                src={displayImages[currentImageIndex].url}
                                alt={product.title}
                                className="slider-image"
                            />

                            {displayImages.length > 1 && (
                                <button className="slider-btn next" onClick={nextImage}>
                                    &#10095;
                                </button>
                            )}

                            {displayImages.length > 1 && (
                                <div className="slider-dots">
                                    {displayImages.map((_, index) => (
                                        <span
                                            key={index}
                                            className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        />
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
                        {displayPrice?.amount} {displayPrice?.currency}
                    </div>

                    {product.variants && product.variants.length > 0 && (
                        <div className="product-variants-selector">
                            <h3>Available Options:</h3>

                            <div className="variant-buttons">
                                <button
                                    className={`variant-btn ${selectedVariantIndex === -1 ? 'active' : ''}`}
                                    onClick={() => setSelectedVariantIndex(-1)}
                                >
                                    Standard
                                </button>

                                {product.variants.map((variant, index) => {
                                    const label = variant.attributes
                                        ? Object.values(variant.attributes).join(' ')
                                        : `Option ${index + 1}`;

                                    return (
                                        <button
                                            key={index}
                                            className={`variant-btn ${selectedVariantIndex === index ? 'active' : ''}`}
                                            onClick={() => setSelectedVariantIndex(index)}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>

                            {selectedVariantIndex !== -1 && (
                                <p className="stock-info">
                                    {product.variants[selectedVariantIndex].stock > 0
                                        ? `${product.variants[selectedVariantIndex].stock} in stock`
                                        : 'Out of stock'}
                                </p>
                            )}
                        </div>
                    )}

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