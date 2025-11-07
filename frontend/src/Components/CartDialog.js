import React from 'react';
import { Link } from 'react-router-dom';
import myWishlist from '../Image/mywishlist.png';

const CartDialog = ({ cart, isCartOpen, toggleCart, handleRemoveItem, handleIncrement, handleDecrement, calculateTotal }) => {
  return (
    <>
      {isCartOpen && (
        <div className="cartmini__area cartmini-opened" style={{boxShadow:'0 2px 8px rgba(0,0,0,.12)'}}>
          <div className="cartmini__wrapper d-flex justify-content-between flex-column">
            <div className="cartmini__top-wrapper">
              <div className="cartmini__top p-relative">
                <div className="cartmini__top-title">
                  <h4>Shopping Cart</h4>
                </div>
                <div className="cartmini__close">
                  <button
                    type="button"
                    className="cartmini__close-btn cartmini-close-btn"
                    onClick={toggleCart}
                  >
                    <i className="las la-times"></i>
                  </button>
                </div>
              </div>
              <div className="cartmini__widget">
                {cart.length > 0 ? (
                  cart.map((item, index) => (
                    <div className="cartmini__widget-item" key={item.product._id}>
                      <div className="cartmini__thumb">
                        <Link to={`/product/${item.product._id}`}>
                          <img src={`https://cctvshoppee.onrender.com/uploads/${item.product.image}`} alt={item.product.name} />
                        </Link>
                      </div>
                      <div className="cartmini__content">
                        <h5 className="cartmini__title">
                          <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                        </h5>
                        <div className="cartmini__price-wrapper">
                          <span className="cartmini__price">₹{item.product.newPrice}</span>
                          <span className="cartmini__quantity">
                            <button onClick={() => handleDecrement(index)}>-</button>
                            {item.quantity}
                            <button onClick={() => handleIncrement(index)}>+</button>
                          </span>
                        </div>
                      </div>
                      <button className="cartmini__del" onClick={() => handleRemoveItem(item.product._id)}>
                        <i className="las la-trash"></i>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="cartmini__empty text-center">
                    <img src={myWishlist} alt="Empty Cart" />
                    <p>Your Cart is empty</p>
                    <Link to="/shop" className="tp-btn">Go to Shop</Link>
                  </div>
                )}
              </div>
            </div>
            <div className="cartmini__checkout">
              <div className="cartmini__checkout-title mb-30">
                <h4>Subtotal:</h4>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="cartmini__checkout-btn">
                <Link to="/cart" className="tp-btn mb-10 w-100"><i class="las la-shopping-cart" style={{fontSize:'20px'}}></i>
                   View Cart</Link>
                {/* <Link to="/checkout" className="tp-btn tp-btn-border w-100">Checkout</Link> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDialog;
