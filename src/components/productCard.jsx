import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getProductIcon = (categoryId) => {
    switch(categoryId) {
      case 1: return 'fas fa-coffee';
      case 2: return 'fas fa-utensils';
      case 3: return 'fas fa-glass-whiskey';
      default: return 'fas fa-star';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image">
        <i className={getProductIcon(product.categoryId)}></i>
        <div className="product-overlay">
          <button 
            className="quick-add-btn"
            onClick={() => onAddToCart(product)}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">{formatPrice(product.price)}</div>
        <button 
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
        >
          <i className="fas fa-cart-plus"></i>
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
};

export default ProductCard;