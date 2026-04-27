import React from 'react'
import { useEffect } from 'react'
import { useProduct } from '../hooks/useProduct'
import { Link } from 'react-router-dom'
import BuyerProductCard from '../components/BuyerProductCard'
import "../style/BuyerProducts.scss"

const BuyerProducts = () => {
  const { products, getAllProducts, isLoading } = useProduct()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await getAllProducts()
            } catch (error) {
                console.error('Error fetching buyer products:', error)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className='buyer-dashboard-container'>
            <div className="dashboard-header">
                <h2>All Products</h2>
            </div>
            {isLoading ?
                (
                    <div className="loading-state">Loading products...</div>
                ):
                (
                    <>
                    {products.length === 0?(
                        <div className="empty-state">
                            <p>No products available.</p>
                        </div>
                    ):(
                        <div className="products-grid">
                            {products.map((product) => (
                                <BuyerProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                    </>
                )
            }
        </div>
    )
}

export default BuyerProducts
