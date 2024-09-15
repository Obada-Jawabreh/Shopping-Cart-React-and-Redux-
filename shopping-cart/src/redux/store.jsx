// import { configureStore } from '@reduxjs/toolkit';

// // أنواع الأكشنات
// const ADD_TO_CART = 'ADD_TO_CART';
// const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
// const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
// const LOAD_CART = 'LOAD_CART';

// // الأكشنات
// export const addToCart = (product) => ({
//   type: ADD_TO_CART,
//   payload: product,
// });

// export const removeFromCart = (id) => ({
//   type: REMOVE_FROM_CART,
//   payload: id,
// });

// export const updateQuantity = (id, quantity) => ({
//   type: UPDATE_QUANTITY,
//   payload: { id, quantity },
// });

// export const loadCart = () => ({
//   type: LOAD_CART,
// });

// // الـreducer
// const initialState = {
//   cart: [],
// };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
//       if (existingItemIndex >= 0) {
//         const updatedCart = state.cart.map((item, index) =>
//           index === existingItemIndex
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//         return {
//           ...state,
//           cart: updatedCart,
//         };
//       } else {
//         return {
//           ...state,
//           cart: [...state.cart, { ...action.payload, quantity: 1 }],
//         };
//       }

//     case REMOVE_FROM_CART:
//       return {
//         ...state,
//         cart: state.cart.filter(item => item.id !== action.payload),
//       };

//     case UPDATE_QUANTITY:
//       return {
//         ...state,
//         cart: state.cart.map(item =>
//           item.id === action.payload.id
//             ? { ...item, quantity: action.payload.quantity }
//             : item
//         ),
//       };

//     case LOAD_CART:
//       return {
//         ...state,
//         cart: Array.isArray(JSON.parse(localStorage.getItem('cart')))
//           ? JSON.parse(localStorage.getItem('cart'))
//           : [],
//       };

//     default:
//       return state;
//   }
// };
// // إنشاء الـstore
// const store = configureStore({
//   reducer: cartReducer,
// });

// store.subscribe(() => {
//   localStorage.setItem('cart', JSON.stringify(store.getState().cart));
// });

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
  reducer: cartReducer,
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

export default store;
