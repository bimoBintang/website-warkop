const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <div className="cart-item-price">{formatPrice(item.price)}</div>
      </div>
      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <i className="fas fa-minus"></i>
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="quantity-btn"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <button 
          className="remove-btn"
          onClick={() => onRemove(item.id)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
      <div className="cart-item-total">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default CartItem;