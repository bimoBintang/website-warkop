const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="category-tabs">
      <button
        className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
        onClick={() => onCategoryChange('all')}
      >
        <i className="fas fa-th-large"></i>
        Semua
      </button>
      {categories.map(category => (
        <button
          key={category.id}
          className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          <i className={category.id === 1 ? 'fas fa-coffee' : category.id === 2 ? 'fas fa-utensils' : 'fas fa-glass-whiskey'}></i>
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;