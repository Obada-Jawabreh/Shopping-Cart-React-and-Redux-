import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, LOAD_CART } from '../types';

// Add item to cart
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

// Remove item from cart
export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

// Update item quantity
export const updateQuantity = (id, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { id, quantity },
});

// Load cart from localStorage
export const loadCart = () => ({
  type: LOAD_CART,
});
