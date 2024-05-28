import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        console.log(productData)
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
    <>
    <Button
        component={RouterLink}
        to="/"
        sx={{
            position: 'absolute', left: 30, top: 60, transform: 'translate(-10px, 10px)' 
        }}
      >
        <ArrowBackIosIcon sx={{ mr: 1 }} />
        <Typography component="h5" variant="h6">
          Back
        </Typography>
      </Button>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow w-50">
        <div className="card-body ">
          <h2 className="text-center" >Product Detail</h2>
          {product ? (
            <>
            <div className="d-flex justify-content-center mb-4">
                    <img
                      src={URL.createObjectURL(
                        new Blob([new Uint8Array(product.Image.data)], {
                          type: "image/jpeg",
                        })
                      )}
                      alt={product.ProductName}
                      className="card-img-bottom"
                      style={{ width: "30%", height: "50%", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
              </div>
              <p><strong>Product Name:</strong> {product.ProductName}</p>
              <p><strong>Category Name:</strong> {product.CategoryName}</p>
              <p><strong>Description:</strong> {product.Description}</p>
              
              <p><strong>Units In Stock:</strong> {product.UnitsInStock}</p>
              <p><strong>Price:</strong> {product.UnitPrice}</p>
            </>
          ) : (
            <div>Product not found</div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetail;