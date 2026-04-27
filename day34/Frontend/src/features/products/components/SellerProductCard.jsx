import React from 'react'
import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';

const SellerProductCard = ({ product }) => {
  const getCurrencyIcon = (currency) => {
    switch (currency) {
      case 'INR': return 'ri-money-rupee-circle-line'
      case 'USD': return 'ri-money-dollar-circle-line'
      case 'EUR': return 'ri-money-euro-circle-line'
      default: return 'ri-price-tag-3-line'
    }
  }
  return (
    <Link to={`/seller/products/${product._id}`}>
      <div className='product-card'>
        <div className='product-image-container'>
          <img src={product.images[0].url} alt={product.title} />
        </div>
        <div className='product-details'>
          <h3 className='product-title'>{product.title}</h3>
          <p className='product-description'>{product.description.length > 60 ? `${product.description.substring(0, 60)}...` : product.description}</p>
        </div>
        <div className='product-price'>
          <i className={getCurrencyIcon(product.price.currency)}></i>
          <span className='amount'>{product.price.amount}</span>
        </div>
      </div>
    </Link>
  )
}

export default SellerProductCard
