// cartReducer.js

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [], // تحميل السلة من localStorage
};

 const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCart = [...state.cartItems, action.payload];
      console.log("Updated cart:", updatedCart); // تحقق من محتوى السلة قبل التخزين
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // تحديث السلة في localStorage
      return {
        ...state,
        cartItems: updatedCart,
      };

    case "REMOVE_FROM_CART":
      const filteredCart = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      console.log("Filtered cart:", filteredCart); // تحقق من محتوى السلة بعد الإزالة
      localStorage.setItem("cart", JSON.stringify(filteredCart)); // تحديث السلة في localStorage
      return {
        ...state,
        cartItems: filteredCart,
      };

    case "UPDATE_QUANTITY":
      const modifiedCart = state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      console.log("Modified cart:", modifiedCart); // تحقق من محتوى السلة بعد التعديل
      localStorage.setItem("cart", JSON.stringify(modifiedCart)); // تحديث السلة في localStorage
      return {
        ...state,
        cartItems: modifiedCart,
      };

    default:
      return state;
  }
};


export default cartReducer;
