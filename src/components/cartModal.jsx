import React, { useState } from "react";

const CartModal = ({ isOpen, cart, onClose, onUpdateQuantity, onRemove, onCheckout }) => {
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    tableNumber: '',
    notes: ''
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    if (!customerData.name || !customerData.phone || !customerData.tableNumber) {
      alert('Mohon lengkapi data pelanggan!');
      return;
    }
    onCheckout(customerData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <i className="fas fa-shopping-cart"></i>
            Keranjang Belanja
          </h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <i className="fas fa-shopping-cart"></i>
              <p>Keranjang masih kosong</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </div>

              <div className="cart-total">
                <strong>Total: {formatPrice(getTotalPrice())}</strong>
              </div>

              <div className="checkout-form">
                <h4>Data Pelanggan</h4>
                <div className="form-group">
                  <label htmlFor="name">Nama</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerData.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama Anda"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">No. HP</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerData.phone}
                    onChange={handleInputChange}
                    placeholder="08xxxxxxxxxx"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tableNumber">No. Meja</label>
                  <input
                    type="number"
                    id="tableNumber"
                    name="tableNumber"
                    value={customerData.tableNumber}
                    onChange={handleInputChange}
                    placeholder="1-20"
                    min="1"
                    max="20"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Catatan (Opsional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={customerData.notes}
                    onChange={handleInputChange}
                    placeholder="Permintaan khusus..."
                    rows="3"
                  />
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>
                  <i className="fas fa-credit-card"></i>
                  Pesan Sekarang ({formatPrice(getTotalPrice())})
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;