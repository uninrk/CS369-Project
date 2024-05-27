import React, { Component } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Navbar';
import LoggedInbar from '../Components/LoggedInbar';
import LogOut from '../Components/Navbar';
import { useAuth } from '../auth/AuthContext';

class Home extends Component {
  
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/products')
      .then((Response) => Response.json())
      .then((findresponse) => {
        this.setState({
          data: findresponse,
        });
      });
  }

  render() {
    const { data } = this.state;

    return (
      <AuthConsumer>
        {({ isAuthenticated }) => (
          <>
            {isAuthenticated ? <LoggedInbar /> : <Header />}
            <div>
              <div className='row'>
                <div className='col-md-12'>
                  <h1 className='mt-2'>Product Data</h1>
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
                            <Link to={`/products/${productData.ProductID}`} className="no-style-link">
                              {productData.ProductName}
                            </Link>
                          </td>
                          <td>{productData.UnitPrice}</td>
                          <td>
                            {productData.Image ? (
                              <img
                                src={URL.createObjectURL(new Blob([new Uint8Array(productData.Image.data)], { type: 'image/jpeg' }))}
                                alt={productData.ProductName}
                                style={{ width: '100px', height: 'auto' }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://via.placeholder.com/100";
                                }}
                              />
                            ) : (
                              <span>Image not available</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </AuthConsumer>
    );
  }
}

const AuthConsumer = (props) => {
  const auth = useAuth();
  return props.children(auth);
};

export default Home;
