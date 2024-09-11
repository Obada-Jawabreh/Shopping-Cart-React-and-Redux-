import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, LOAD_CART } from '../types';
const initialState = {
    cart: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        // Check if the product already exists in the cart
        const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
        if (existingItemIndex >= 0) {
          // Update quantity if the product already exists
          const updatedCart = state.cart.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          return {
            ...state,
            cart: updatedCart,
          };
        } else {
          // Add new item if it does not exist in the cart
          return {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
          };
        }
        
      case REMOVE_FROM_CART:
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload),
        };
  
      case UPDATE_QUANTITY:
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
  
      case LOAD_CART:
        return {
          ...state,
          cart: Array.isArray(JSON.parse(localStorage.getItem('cart')))
            ? JSON.parse(localStorage.getItem('cart'))
            : [],
        };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;