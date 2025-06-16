const MenuSection = ({ categories, activeCategory, onCategoryChange, onAddToCart }) => {
  const getFilteredProducts = () => {
    if (activeCategory === 'all') {
      return categories.flatMap(cat => cat.products);
    }
    const category = categories.find(cat => cat.id === activeCategory);
    return category ? category.products : [];
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <h2 className="section-title">
          <i className="fas fa-utensils"></i>
          Menu Kami
        </h2>
        
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />

        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;