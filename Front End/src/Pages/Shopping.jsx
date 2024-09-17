import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../redux/actions/cartActions";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../redux/reducers/productReducer";
import { fetchUser } from "../redux/reducers/authReducer";

// ------------------------------ProductItem-------------------------------
const ProductItem = ({ product, onAddToCart, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="product-item bg-white shadow-lg rounded-lg p-4 m-4">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-700 mb-4">${product.price}</p>
      <p className="text-gray-700 mb-4">{product.description}</p>

      <button
        onClick={onAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Add to Cart
      </button>
      {isAdmin && (
        <>
          <button
            onClick={onEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200 ml-2"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 ml-2"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

// ------------------------------ProductList-------------------------------
const ProductList = ({ onEditProduct }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = user && user.role === 'admin'; // Check if the user is an admin

  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        await dispatch(fetchProducts());
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchAllProducts();
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleEdit = (product) => {
    onEditProduct(product); // Notify parent component to show edit form
  };

  const handleDelete = async (productId) => {
    try {
      await dispatch(deleteProduct(productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {Array.isArray(products) ? (
        products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
            onEdit={() => isAdmin && handleEdit(product)} // Edit button only for admin
            onDelete={() => isAdmin && handleDelete(product.id)} // Delete button only for admin
            isAdmin={isAdmin} // Pass the isAdmin prop to ProductItem
          />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

// ------------------------------AddProductForm-------------------------------
const AddProductForm = ({ productToEdit, onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.role === 'admin'; // Check if the user is an admin

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price);
      setDescription(productToEdit.description);
    }
  }, [productToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price, description };

    if (!isAdmin) {
      console.error("Only admin users can add products.");
      return;
    }

    try {
      if (productToEdit) {
        if (productToEdit.id) {
          await dispatch(updateProduct({ id: productToEdit.id, productData }));
        } else {
          console.error("Product ID is missing");
        }
      } else {
        await dispatch(createProduct(productData));
        setName("");
        setPrice("");
        setDescription("");
      }
      onClose(); // Close the form after success
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="add-product-form bg-white shadow-lg rounded-lg p-4 m-4"
    >
      <h3 className="text-lg font-semibold mb-2">
        {productToEdit ? "Edit Product" : "Add New Product"}
      </h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 mb-2 w-full"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
      >
        {productToEdit ? "Update Product" : "Add Product"}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200 ml-2"
      >
        Cancel
      </button>
    </form>
  );
};

// ------------------------------Cart-------------------------------
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, e) => {
    const quantity = parseInt(e.target.value, 10);
    if (quantity > 0) {
      dispatch(updateQuantity(id, quantity));
    }
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
                Total: ${item.price * item.quantity}
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

// ------------------------------ShoppingCartPage-------------------------------
const ShoppingCartPage = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.role === 'admin'; // Check if the user is an admin

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleCloseEditForm = () => {
    setEditingProduct(null);
  };

  return (
    <div className="shopping-cart-page container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to the Shopping Cart
      </h1>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-3/4">
          {isAdmin && (
            <AddProductForm
              productToEdit={editingProduct}
              onClose={handleCloseEditForm}
            />
          )}
          <ProductList onEditProduct={handleEditProduct} />
        </div>
        <div className="w-full lg:w-1/4">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
