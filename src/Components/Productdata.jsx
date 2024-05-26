import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AddNewProduct = () => {
  const [formValue, setFormValue] = useState({
    ProductName: '',
    SupplierID: '',
    CategoryID: '',
    QuantityPerUnit: '',
    UnitPrice: '',
    UnitsInStock: '',
    UnitsOnOrder: '',
    ReorderLevel: '',
    Discontinued: false,
    Image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValue({
      ...formValue,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setFormValue({ ...formValue, Image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }

    try {
      console.log('Submitting form data:', formData);

      const response = await fetch('http://localhost:8080/api/products/add', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to add product: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Response:', responseData);

      alert(`Product added successfully! Product ID: ${responseData.productId}`);
      setFormValue({
        ProductName: '',
        SupplierID: '',
        CategoryID: '',
        QuantityPerUnit: '',
        UnitPrice: '',
        UnitsInStock: '',
        UnitsOnOrder: '',
        ReorderLevel: '',
        Discontinued: false,
        Image: null,
      });
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred while adding the product: ${error.message}`);
    }
  };

    return (
        <div>
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
    );
};

export default AddNewProduct;
