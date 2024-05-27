import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Header from '../Components/Navbar';
import LoggedInbar from '../Components/LoggedInbar';

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
    <>
      <LoggedInbar />
      <div className="container mt-4">
        <h2 className="mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group mb-3">
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
          <div className="form-group mb-3">
            <label>Supplier ID</label>
            <input
              type="number"
              className="form-control"
              name="SupplierID"
              value={formValue.SupplierID}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Category ID</label>
            <input
              type="number"
              className="form-control"
              name="CategoryID"
              value={formValue.CategoryID}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Quantity Per Unit</label>
            <input
              type="text"
              className="form-control"
              name="QuantityPerUnit"
              value={formValue.QuantityPerUnit}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Unit Price</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="UnitPrice"
              value={formValue.UnitPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Units In Stock</label>
            <input
              type="number"
              className="form-control"
              name="UnitsInStock"
              value={formValue.UnitsInStock}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Units On Order</label>
            <input
              type="number"
              className="form-control"
              name="UnitsOnOrder"
              value={formValue.UnitsOnOrder}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Reorder Level</label>
            <input
              type="number"
              className="form-control"
              name="ReorderLevel"
              value={formValue.ReorderLevel}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>
              Discontinued
              <input
                type="checkbox"
                name="Discontinued"
                checked={formValue.Discontinued}
                onChange={handleChange}
                className="form-check-input ms-2"
              />
            </label>
          </div>
          <div className="form-group mb-3">
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
    </>
  );
};

export default AddNewProduct;