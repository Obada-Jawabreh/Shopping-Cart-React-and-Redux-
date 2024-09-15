import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  loadCart,
  removeFromCart,
  updateQuantity,
} from "./../redux/actions/cartActions";
// ------------------------------ProductItem-------------------------------

const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div className="product-item bg-white shadow-lg rounded-lg p-4 m-4">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover mb-4 rounded"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-700 mb-4">${product.price}</p>
      <button
        onClick={onAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};
// ------------------------------ProductList-------------------------------

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCart());

    axios
      .get("/products.json")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [dispatch]);

  const handleAddToCart = (product) => {
    console.log("Adding product to cart:", product);
    dispatch(addToCart(product));
  };

  return (
    <div className="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={() => handleAddToCart(product)}
        />
      ))}
    </div>
  );
};
// ------------------------------cart-------------------------------
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); // تأكد من استخدام المسار الصحيح للسلة

  const handleRemove = (id) => {
    console.log("Removing product from cart:", id);
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, e) => {
    const quantity = parseInt(e.target.value, 10);
    if (quantity > 0) {
      console.log("Updating quantity:", id, quantity);
      dispatch(updateQuantity(id, quantity));
    }
  };

  const getTotalPrice = (price, quantity) => {
    return price * quantity;
  };

  return (
    <div className="cart bg-gray-100 p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cart && cart.length > 0 ? (
        cart.map((item) => (
          <div
            key={item.id}
            className="cart-item flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow"
          >
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700">Price: ${item.price}</p>
              <p className="text-gray-700 font-semibold">
                Total: ${getTotalPrice(item.price, item.quantity)}
              </p>
            </div>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, e)}
              className="w-16 p-2 border rounded text-center"
            />
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-700">Your cart is empty</p>
      )}
    </div>
  );
};

// --------------------------------------------------------------

const ShoppingCartPage = () => {
  return (
    <div className="shopping-cart-page container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to Our Store
      </h1>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4">
          <ProductList />
        </div>
        <div className="w-full lg:w-1/4">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
