import React, { useState, useEffect } from 'react';

const Header = ({ cartCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <i className="fas fa-coffee"></i>
            <span>Warkop Nusantara</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home">Beranda</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#about">Tentang</a></li>
            <li><a href="#contact">Kontak</a></li>
          </ul>
          <div className="cart-icon" onClick={onCartClick}>
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;