import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Footer } from './components/common/footer';

const App = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data with better error handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [menuResponse, categoryResponse] = await Promise.all([
          fetch('api/category'),
          fetch('api/menu-item')
        ]);

        if (!menuResponse.ok || !categoryResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [menuData, categoryData] = await Promise.all([
          menuResponse.json(),
          categoryResponse.json()
        ]);

        if (Array.isArray(menuData)) {
          setMenuItems(menuData);
          console.log('Menu items loaded:', menuData.length);
        } else {
          console.error('Menu item API returned non-array:', menuData);
          setError('Invalid menu data format');
        }

        if (Array.isArray(categoryData)) {
          setCategories(categoryData);
          console.log('Categories loaded:', categoryData.length);
        } else {
          console.error('Category API returned non-array:', categoryData);
          setError('Invalid category data format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load menu data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Optimized filter function
  const filteredItems = React.useMemo(() => {
    if (activeCategory === null) {
      return menuItems;
    }
    return menuItems.filter(item => item.categoryId === activeCategory);
  }, [menuItems, activeCategory]);

  // Enhanced cart functions
  const addToCart = useCallback((item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    
    // Optional: Show feedback animation or toast
    console.log(`Added ${item.name} to cart`);
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const getTotalPrice = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const getTotalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Handle category change
  const handleCategoryChange = useCallback((categoryId) => {
    console.log('Category changed to:', categoryId);
    setActiveCategory(categoryId);
  }, []);

  // Handle cart toggle
  const toggleCart = useCallback(() => {
    setShowCart(prev => !prev);
  }, []);

  // Close cart when clicking overlay
  const handleOverlayClick = useCallback((e) => {
    if (e.target.classList.contains('cart-overlay')) {
      setShowCart(false);
    }
  }, []);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showCart]);

  // Loading state
  if (loading) {
    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <div className="header-content">
              <div className="logo">
                <h1>Warkop bang boy</h1>
                <p>Asli Indonesia</p>
              </div>
            </div>
          </div>
        </header>
        <div className="loading-container" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '1.2rem',
          color: '#8B4513'
        }}>
          <div>Loading menu...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="app">
        <header className="header">
          <div className="container">
            <div className="header-content">
              <div className="logo">
                <h1>Warkop bang boy</h1>
                <p>Asli Indonesia</p>
              </div>
            </div>
          </div>
        </header>
        <div className="error-container" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          fontSize: '1.1rem',
          color: '#dc3545',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>⚠️ {error}</div>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              background: '#8B4513',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>Warkop bang boy</h1>
              <p>Asli Indonesia</p>
            </div>
            <button 
              className="cart-btn"
              onClick={toggleCart}
              aria-label={`Open cart with ${getTotalItems()} items`}
            >
              🛒 Keranjang ({getTotalItems()})
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Selamat Datang di Warkop bang boy</h2>
          <p>Nikmati warkop terbaik dengan suasana yang hangat dan bersahabat</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Categories */}
          <div className="categories">
            {/* All items button */}
            <button
              className={`category-btn ${activeCategory === null ? 'active' : ''}`}
              onClick={() => handleCategoryChange(null)}
              aria-pressed={activeCategory === null}
            >
              <span className="category-icon">🍽️</span>
              Semua
            </button>
            
            {/* Category buttons from API */}
            {Array.isArray(categories) && categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
                aria-pressed={activeCategory === category.id}
              >
                <span className="category-icon">{category.icon || '📋'}</span>
                {category.name || 'Kategori'}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="menu-grid">
            {Array.isArray(filteredItems) && filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <article key={item.id} className="menu-card">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="menu-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x220/8B4513/FFFFFF?text=No+Image';
                    }}
                  />
                  <div className="menu-content">
                    <h3 className="menu-name">{item.name}</h3>
                    <p className="menu-description">{item.description}</p>
                    <div className="menu-footer">
                      <span className="menu-price">{formatPrice(item.price)}</span>
                      <button 
                        className="add-btn"
                        onClick={() => addToCart(item)}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        Tambah
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="no-items">
                <p>🍽️</p>
                <p>Tidak ada item untuk kategori ini</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7 }}>
                  Coba pilih kategori lain atau lihat semua menu
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div 
          className="cart-overlay" 
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-title"
        >
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3 id="cart-title">Keranjang Belanja</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCart(false)}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>
            <div className="cart-content">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>🛒</p>
                  <p>Keranjang masih kosong</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7 }}>
                    Tambahkan beberapa item dari menu
                  </p>
                </div>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="cart-item-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80/8B4513/FFFFFF?text=No+Image';
                        }}
                      />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>{formatPrice(item.price)}</p>
                        <div className="quantity-controls">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span aria-label={`Quantity: ${item.quantity}`}>
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  <div className="cart-total">
                    <strong>Total: {formatPrice(getTotalPrice())}</strong>
                  </div>
                  <button 
                    className="checkout-btn"
                    onClick={() => {
                      // Handle checkout logic here
                      alert('Fitur checkout akan segera hadir!');
                    }}
                  >
                    Pesan Sekarang ({getTotalItems()} item)
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;