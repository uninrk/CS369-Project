import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Navbar';
import LoggedInbar from '../Components/LoggedInbar';
import { useAuth } from '../auth/AuthContext';

const Home = () => {
  const [data, setData] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetch('http://54.242.137.165:8080/api/products')
      .then((response) => response.json())
      .then((findresponse) => {
        setData(findresponse);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures this runs once after the initial render

  return (
    <>
      {isAuthenticated ? <LoggedInbar /> : <Header />}
      <div className="row">
        <div className="col-md-12">
          <h3 className="d-flex justify-content-center pt-3">Product Data</h3>
          <div className="d-flex flex-wrap justify-content-around">
            {data.map((productData, index) => (
              <Link key={index} to={`/products/${productData.ProductID}`} className="card m-2" style={{ width: "20rem", textDecoration: 'none' }}>
                <div className="card-body">
                  <h5 className="card-title">{productData.ProductName}</h5>
                  <p className="card-text">Price: {productData.UnitPrice}</p>
                  {productData.Image ? (
                    <img
                      src={URL.createObjectURL(
                        new Blob([new Uint8Array(productData.Image.data)], {
                          type: "image/jpeg",
                        })
                      )}
                      alt={productData.ProductName}
                      className="card-img-bottom"
                      style={{ width: "100%", height: "150px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  ) : (
                    <p className="card-text">Image not available</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
