import React from 'react'
import { useEffect } from 'react'
import { useProduct } from '../hooks/useProduct'
import { Link } from 'react-router-dom'
import SellerProductCard from '../components/SellerProductCard'
import "../style/SellerProducts.scss"

const SellerProducts = () => {
    const { products, getSellerProducts, isLoading } = useProduct()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await getSellerProducts()
            } catch (error) {
                console.error('Error fetching seller products:', error)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className='seller-dashboard-container'>
            <div className="dashboard-header">
                <h2>My Products</h2>
                <Link to="/seller/products/create" className="add-btn">+ Add New Product</Link>
            </div>
            {isLoading ?
                (
                    <div className="loading-state">Loading your products...</div>
                ):
                (
                    <>
                    {products.length === 0?(
                        <div className="empty-state">
                            <p>You haven't listed any products yet.</p>
                        </div>
                    ):(
                        <div className="products-grid">
                            {products.map((product) => (
                                <SellerProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                    </>
                )
            }
        </div>
    )
}

export default SellerProducts
