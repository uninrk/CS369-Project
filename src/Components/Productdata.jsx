import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Navbar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                console.log(`Fetching product details for product ID: ${productId}`);
                const response = await fetch(`http://localhost:8080/api/products/${productId}`);
                console.log(`Response status: ${response.status}`);

                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new TypeError("Received content is not JSON");
                }

                const productData = await response.json();
                setProduct(productData);
                setError(null);
            } catch (err) {
                console.error('Fetch error:', err.message);
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
        <Header/>
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
        <div className="text-center">
            <h2>Product Detail</h2>
            {product ? (
                <div>
                    <p><strong>Product Name:</strong> {product.ProductName}</p>
                    <p><strong>Price:</strong> {product.UnitPrice}</p>
                    <p><strong>Units In Stock:</strong> {product.UnitsInStock}</p>
                    <p><strong>Category Name:</strong> {product.CategoryName}</p>
                    <p><strong>Description:</strong> {product.Description}</p>
                </div>
            ) : (
                <div>Product not found</div>
            )}
        </div>
        </>
    );
};

export default ProductDetail;
