// Cart.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/actions/cartActions';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, e) => {
    dispatch(updateQuantity(id, parseInt(e.target.value, 10)));
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {Array.isArray(cart) && cart.length > 0 ? (
        cart.map(item => (
          <div key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, e)}
            />
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
