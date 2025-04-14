import React from 'react'
import './cards.css'
import categoriesIcon from '../../assets/categories.svg'
import productsIcon from '../../assets/products.svg'
import salesIcon from '../../assets/sales.svg'

export default function Cards() {
  return (
    <div className="container">
    <div className="flexbox-container">
        <div className="card purple-card">
            <div className="card-text">
                <p className="card-title">Total Sales</p>
                <h2 className="card-value">$104K</h2>
            </div>
            <img src={salesIcon} alt="Sales Icon" className="card-icon" />
        </div>
        <div className="card dark-card">
            <div className="card-text">
                <p className="card-title">Total Products</p>
                <h2 className="card-value">500+</h2>
            </div>
            <img src={productsIcon} alt="Products Icon" className="card-icon" />
        </div>
        <div className="card purple-card">
            <div className="card-text">
                <p className="card-title">Total Categories</p>
                <h2 className="card-value">20+</h2>
            </div>
            <img src={categoriesIcon} alt="Categories Icon" className="card-icon" />
        </div>
    </div>
    </div>
  )
}
