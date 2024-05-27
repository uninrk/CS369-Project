import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details based on the productId
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        const productData = await response.json();
        setProduct(productData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {product ? (
        <div className='container'>
          <h2>Product Detail</h2><br></br>
          <p><strong>Product Name:</strong> {product.ProductName}</p>
          <p><strong>Price:</strong> {product.UnitPrice}</p>
          <p><strong>Units In Stock:</strong> {product.UnitsInStock}</p>
          <p><strong>Category ID:</strong> {product.CategoryID}</p>
          <p><strong>Category Name:</strong> {product.CategoryName}</p>
          <p><strong>Description:</strong> {product.Description}</p>
        </div>
      ) : (
        <div>Product not found</div>
      )}
    </div>
  );
};

export default ProductDetail;