import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


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

    // Basic validation
    if (!formValue.ProductName || !formValue.SupplierID || !formValue.CategoryID || !formValue.UnitPrice) {
      alert('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (response.ok) {
        alert(`Product added successfully! Product ID: ${responseData.ProductID}`);
      } else {
        alert(`Failed to add product: ${responseData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div className="container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            name="ProductName"
            value={formValue.ProductName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Supplier ID</label>
          <input
            type="text"
            className="form-control"
            name="SupplierID"
            value={formValue.SupplierID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category ID</label>
          <input
            type="text"
            className="form-control"
            name="CategoryID"
            value={formValue.CategoryID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity Per Unit</label>
          <input
            type="text"
            className="form-control"
            name="QuantityPerUnit"
            value={formValue.QuantityPerUnit}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Unit Price</label>
          <input
            type="text"
            className="form-control"
            name="UnitPrice"
            value={formValue.UnitPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Units In Stock</label>
          <input
            type="text"
            className="form-control"
            name="UnitsInStock"
            value={formValue.UnitsInStock}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Units On Order</label>
          <input
            type="text"
            className="form-control"
            name="UnitsOnOrder"
            value={formValue.UnitsOnOrder}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Reorder Level</label>
          <input
            type="text"
            className="form-control"
            name="ReorderLevel"
            value={formValue.ReorderLevel}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Discontinued</label>
          <input
            type="text"
            className="form-control"
            name="Discontinued"
            checked={formValue.Discontinued}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            className="form-control"
            name="Image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
