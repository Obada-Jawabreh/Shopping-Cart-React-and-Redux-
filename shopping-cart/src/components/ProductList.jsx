import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, loadCart } from '../redux/actions/cartActions';
import ProductItem from './ProductItem';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCart());

    axios.get('/products.json')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductItem key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
      ))}
    </div>
  );
};

export default ProductList;
