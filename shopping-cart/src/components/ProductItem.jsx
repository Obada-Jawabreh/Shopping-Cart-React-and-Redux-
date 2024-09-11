import React from 'react';

const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
