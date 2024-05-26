import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetail from './Components/Productdata'; // Ensure this path is correct

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/products')
      .then((response) => response.json())
      .then((findresponse) => {
        this.setState({
          data: findresponse,
        });
      });
  }

  render() {
    const { data } = this.state;

    return (
      <Router>
        <div className="container">
          <Routes>
            <Route 
              path="/" 
              element={
                <div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <h1 className='mt-2'>Product Data</h1>
                      <h3 className='mt-2'>log in</h3>
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((productData, index) => (
                            <tr key={index}>
                              <td>
                                <Link to={`/product/${productData.ProductID}`} className="no-style-link">
                                  {productData.ProductName}
                                </Link>
                              </td>
                              <td>{productData.Price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              } 
            />
            <Route path="/product/:productId" element={<ProductDetail />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
