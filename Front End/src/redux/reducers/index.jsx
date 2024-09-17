// // index.jsx
// import { combineReducers } from 'redux';
// import cartReducer from './cartReducer';

// const rootReducer = combineReducers({
//   cart: cartReducer,
// });

// export default rootReducer;
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";

// دمج جميع الـ reducers في rootReducer
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  products: productReducer,
});

export default rootReducer;
