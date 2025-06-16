import React, { useState, useEffect } from 'react';
import './App.css';
import prisma from './lib/prisma';

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('coffee');
  const [showCart, setShowCart] = useState(false);

  // Mock data untuk demo (nantinya dari API)
  const mockMenuItems = prisma.menuItem.findMany();

  useEffect(() => {
    setMenuItems(mockMenuItems);
  }, []);

  const categories = prisma.category.findMany();

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>☕ Warkop Kita</h1>
              <p>Kopi Asli Indonesia</p>
            </div>
            <button 
              className="cart-btn"
              onClick={() => setShowCart(!showCart)}
            >
              🛒 Keranjang ({cart.length})
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Selamat Datang di Warkop Kita</h2>
          <p>Nikmati kopi terbaik dengan suasana yang hangat dan bersahabat</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Categories */}
          <div className="categories">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="menu-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="menu-card">
                <img src={item.image} alt={item.name} className="menu-image" />
                <div className="menu-content">
                  <h3 className="menu-name">{item.name}</h3>
                  <p className="menu-description">{item.description}</p>
                  <div className="menu-footer">
                    <span className="menu-price">{formatPrice(item.price)}</span>
                    <button 
                      className="add-btn"
                      onClick={() => addToCart(item)}
                    >
                      Tambah
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay">
          <div className="cart-sidebar">
            <div className="cart-header">
              <h3>Keranjang Belanja</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCart(false)}
              >
                ✕
              </button>
            </div>
            <div className="cart-content">
              {cart.length === 0 ? (
                <p className="empty-cart">Keranjang masih kosong</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>{formatPrice(item.price)}</p>
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  <div className="cart-total">
                    <strong>Total: {formatPrice(getTotalPrice())}</strong>
                  </div>
                  <button className="checkout-btn">Pesan Sekarang</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Warkop Kita</h4>
              <p>Jl. Raya No. 123, Jakarta</p>
              <p>Telepon: (021) 123-4567</p>
            </div>
            <div className="footer-section">
              <h4>Jam Buka</h4>
              <p>Senin - Jumat: 07:00 - 22:00</p>
              <p>Sabtu - Minggu: 08:00 - 23:00</p>
            </div>
            <div className="footer-section">
              <h4>Ikuti Kami</h4>
              <p>📘 Facebook | 📷 Instagram</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;